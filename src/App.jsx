import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

/**
 * App Component (Layout Shell & Route Table with Protected Routes)
 *
 * Why declare all routes in App.jsx?
 * - Provides a single source of truth for the application's URL hierarchy.
 * - Security gates are clear and readable: developers can see at a glance which views
 *   are public and which are secured behind `<ProtectedRoute>`.
 *
 * Route Table:
 * - "/"              → HomePage (Public: Overview and marketing dashboard)
 * - "/login"         → LoginPage (Public: Authentication form)
 * - "/products"      → ProtectedRoute → ProductsPage (Private: requires authentication)
 * - "/products/:sku" → ProtectedRoute → ProductDetailPage (Private: requires authentication)
 * - "*"              → NotFoundPage (Public: 404 fallback)
 */
function App() {
  return (
    <div className="app-shell">
      {/* Global persistent navigation bar */}
      <Navbar />

      <div className="app-layout">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes (Week 6: require user authentication) */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:sku"
            element={
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
