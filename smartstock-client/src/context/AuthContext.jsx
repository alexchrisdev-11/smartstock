/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axiosClient from '../api/axiosClient'

export const AuthContext = createContext(null)

/**
 * AuthProvider Component
 *
 * Why Auth State Lives in Context (Instead of Props):
 * 1. Eliminates "Prop Drilling": Authentication status is needed across distant parts of the component
 *    tree (Navbar at top, ProtectedRoute in routes, and ProductCard delete buttons at bottom).
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
  const isAuthenticated = Boolean(user && user.token)

  // Synchronize user state with localStorage
  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem('smartstock_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('smartstock_user')
    }
  }, [user])

  /**
   * Real asynchronous login API call hitting POST /api/auth/login via Axios
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} Resolves with authenticated user object (including role & JWT)
   */
  const login = async (email, password) => {
    try {
      const response = await axiosClient.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password,
      })

      const userData = response.data.data
      setUser(userData)
      return userData
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Login failed. Please check your credentials.'
      throw new Error(message)
    }
  }

  /**
   * Real asynchronous registration API call hitting POST /api/auth/register via Axios
   *
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} [role='staff']
   * @returns {Promise<object>} Resolves with newly registered user object
   */
  const register = async (name, email, password, role = 'staff') => {
    try {
      const response = await axiosClient.post('/auth/register', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      })

      const userData = response.data.data
      setUser(userData)
      return userData
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Registration failed.'
      throw new Error(message)
    }
  }

  /**
   * Clears user session and resets auth state
   */
  const logout = () => {
    setUser(null)
    localStorage.removeItem('smartstock_user')
  }

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthProvider
