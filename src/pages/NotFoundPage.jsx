import { Link } from 'react-router-dom'
import './pages.css'

/**
 * NotFoundPage Component
 *
 * Route: "*" (Catch-all fallback route)
 * Rendered when the browser URL does not match any explicitly defined application routes.
 */
function NotFoundPage() {
  return (
    <div className="page-container not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-text">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="primary-nav-btn">
          ← Return to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
