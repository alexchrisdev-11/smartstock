import { NavLink, Link } from 'react-router-dom'
import './components.css'

/**
 * Navbar Component
 *
 * Provides primary client-side navigation across the application.
 * Rendered once in App.jsx so it persists across all routes.
 *
 * Link/NavLink vs. Traditional <a> Tag:
 * - A traditional `<a href="...">` triggers a full browser reload, discarding all JavaScript
 *   in-memory state, re-executing scripts, and causing a noticeable page flicker.
 * - `<Link>` and `<NavLink>` from react-router-dom use the HTML5 History API under the hood.
 *   They intercept navigation clicks, update the browser URL without requesting a new HTML page
 *   from the server, and instruct React to re-render only the matched route component.
 * - `<NavLink>` specifically detects if its destination matches the current URL, exposing an
 *   `isActive` flag to apply active CSS classes (e.g., highlighting the current page).
 */
function Navbar() {
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
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
