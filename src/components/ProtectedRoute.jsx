import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../hooks/useAuth'

/**
 * ProtectedRoute Component
 *
 * Route Guard protecting private routes from unauthenticated access.
 *
 * Architectural Decision: Children Wrapper vs. Outlet Layout
 * - We chose the `children` wrapper pattern (`<ProtectedRoute><ProductsPage /></ProtectedRoute>`).
 * - Why? It makes security boundaries explicit and readable directly inside the central route
 *   declarations in App.jsx. Each protected view is clearly demarcated without requiring an
 *   extra nested layout route layer.
 *
 * How ProtectedRoute Stops Unauthenticated Direct URL Entry:
 * - When an unauthenticated visitor types `http://localhost:5173/products` into their browser
 *   address bar, React Router matches the path and executes `<ProtectedRoute>`.
 * - During component evaluation, `useAuth()` reports `isAuthenticated === false`.
 * - Instead of rendering the protected child view, `ProtectedRoute` immediately returns:
 *   `<Navigate to="/login" state={{ from: location }} replace />`
 * - The browser is instantaneously redirected to `/login`, and the protected component
 *   (`<ProductsPage>` or `<ProductDetailPage>`) is never mounted to the DOM, preventing any
 *   data exposure or unauthorized interaction.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect unauthenticated visitors to login, preserving intended destination in location.state
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProtectedRoute
