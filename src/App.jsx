import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

/**
 * App Component (Layout Shell & Central Routing Configuration)
 *
 * Why declare all routes in one central place (App.jsx)?
 * 1. Single Source of Truth: Consolidating URL routes in App.jsx gives developers
 *    an immediate, high-level map of every view and URL hierarchy across the application.
 * 2. Maintainability: Centralized route declarations avoid scattered routing logic,
 *    prevent route conflicts, and make adding new paths straightforward.
 * 3. Persistent Global Layout: Components like <Navbar> are declared outside of <Routes>,
 *    ensuring the navigation header remains rendered across all route transitions without unmounting.
 *
 * Route Table:
 * - "/"              → HomePage (Welcome dashboard & overview)
 * - "/products"      → ProductsPage (Full inventory catalog, state management, search, and stock adjustment)
 * - "/products/:sku" → ProductDetailPage (Dynamic product inspector reading :sku via useParams)
 * - "*"              → NotFoundPage (404 catch-all fallback)
 */
function App() {
  return (
    <div className="app-shell">
      {/* Persistent Navbar across all routes */}
      <Navbar />

      {/* Main view container where matched route components are mounted */}
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:sku" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
