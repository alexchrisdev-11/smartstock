import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './components.css'

/**
 * Navbar Component
 *
 * Persistent navigation bar showing application links and dynamic authentication controls.
 *
 * Auth Integration (Week 6):
 * - Consumes `useAuth()` to check `isAuthenticated` and retrieve current `user`.
 * - When unauthenticated: displays a "Login" link.
 * - When authenticated: displays the user's name and role badge, plus an interactive "Logout" button.
 */
function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="smartstock-navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon" aria-hidden="true">📦</span>
          <span className="brand-text">SmartStock</span>
        </Link>

        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'nav-link active-link' : 'nav-link'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? 'nav-link active-link' : 'nav-link'
              }
            >
              Products
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink
                to="/suppliers"
                className={({ isActive }) =>
                  isActive ? 'nav-link active-link' : 'nav-link'
                }
              >
                Suppliers
              </NavLink>
            </li>
          )}

          {/* Authentication Navigation Controls */}
          {isAuthenticated ? (
            <li className="navbar-user-section">
              <span className="user-badge">
                <span className="user-icon" aria-hidden="true">👤</span>
                <span className="user-name">{user?.name}</span>
                <span className={`role-pill role-${user?.role}`}>{user?.role}</span>
              </span>
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
                title="Log out of SmartStock"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'nav-link active-link login-nav-link' : 'nav-link login-nav-link'
                }
              >
                🔐 Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
