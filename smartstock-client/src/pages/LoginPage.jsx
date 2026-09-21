import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './pages.css'

/**
 * LoginPage Component
 *
 * Route: "/login"
 * Provides a controlled authentication form connecting to AuthContext via the useAuth hook.
 */
function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Where to send user after login (defaults to /products, or the protected route they were trying to access)
  const from = location.state?.from?.pathname || '/products'

  // If already authenticated, redirect away from login
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.')
      return
    }

    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon" aria-hidden="true">🔐</span>
          <h1 className="login-title">Sign In to SmartStock</h1>
          <p className="login-subtitle">Enter your credentials to access the inventory system</p>
        </div>

        {errorMessage && (
          <div className="form-error login-error" role="alert">
            ⚠️ {errorMessage}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="user@smartstock.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
