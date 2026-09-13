import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * useAuth Custom Hook
 *
 * What does useAuth() provide over calling useContext(AuthContext) directly everywhere?
 * 1. Encapsulation: Consumers only need a single import (`useAuth`) instead of having to import
 *    both `useContext` from 'react' and `AuthContext` from '../context/AuthContext' in every component.
 * 2. Fail-Fast Guard & Safety: If a component attempts to consume authentication outside an <AuthProvider>,
 *    calling `useContext(AuthContext)` returns `null` silently. Subsequent attempts to read `user.role`
 *    would produce cryptic `TypeError: Cannot read properties of null` runtime crashes.
 *    `useAuth()` immediately throws an informative, actionable error message.
 * 3. Cleaner Abstraction: Exposes an intuitive domain hook (`useAuth()`) that encapsulates implementation details.
 *
 * @returns {{ user: object|null, isAuthenticated: boolean, login: Function, logout: Function }}
 */
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>. Check that AuthProvider wraps your tree.')
  }

  return context
}

export default useAuth
