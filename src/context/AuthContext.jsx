/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MOCK_USERS } from '../data/mockUsers'

export const AuthContext = createContext(null)

/**
 * AuthProvider Component
 *
 * Why Auth State Lives in Context (Instead of Props):
 * 1. Eliminates "Prop Drilling": Authentication status is needed across distant parts of the component
 *    tree (Navbar at top, ProtectedRoute in routes, and ProductCard delete buttons at bottom).
 *    Passing user and login/logout handlers as props through App → ProductsPage → ProductList → ProductCard
 *    clutters intermediate components that have no interest in auth logic.
 * 2. Centralized Global Source of Truth: Managing auth state in one Context Provider guarantees
 *    that session changes (login, logout, role checks) instantly re-render all consuming components
 *    cohesively without manual synchronization.
 */
export function AuthProvider({ children }) {
  // Read initial user from localStorage so page refreshes preserve active session
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('smartstock_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  // Derived authentication boolean (no redundant state)
  const isAuthenticated = Boolean(user)

  // Synchronize user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('smartstock_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('smartstock_user')
    }
  }, [user])

  /**
   * Simulates asynchronous login API call with hardcoded credentials
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} Resolves with safe user object or rejects with error message
   */
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) =>
            u.email.toLowerCase() === email.trim().toLowerCase() &&
            u.password === password,
        )

        if (foundUser) {
          // Omit password from session object for security
          const { password: _p, ...safeUser } = foundUser
          setUser(safeUser)
          resolve(safeUser)
        } else {
          reject(new Error('Invalid email or password. Check your credentials.'))
        }
      }, 400)
    })
  }

  /**
   * Clears user session and resets auth state
   */
  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthProvider
