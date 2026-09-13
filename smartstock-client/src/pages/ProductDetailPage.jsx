import { useParams, useLocation, Link } from 'react-router-dom'
import Badge from '../components/Badge'
import StockClock from '../components/StockClock'
import { mockProducts } from '../data/mockProducts'
import './pages.css'

/**
 * ProductDetailPage Component
 *
 * Route: "/products/:sku"
 *
 * How useParams() Works:
 * - React Router allows route paths to contain dynamic segments prefixed with a colon (e.g., `:sku`).
 * - When a user navigates to `/products/STK-SCN-001`, React Router matches this route and parses
 *   the dynamic URL parameter into a key-value object accessible via the `useParams()` hook.
 * - Here, `const { sku } = useParams()` extracts the exact SKU string from the URL path.
 *
 * Data Lookup:
 * - Reads product from `location.state?.product` if navigated via <Link state={{ product }}>.
 * - Falls back to searching `mockProducts` if the user bookmarked or directly loaded the URL.
 */
function ProductDetailPage() {
  const { sku } = useParams()
  const location = useLocation()

  // Retrieve product from router navigation state, or fall back to mock dataset lookup
  const product =
    location.state?.product ||
    mockProducts.find((p) => p.sku.toLowerCase() === (sku || '').toLowerCase())

  if (!product) {
    return (
      <div className="page-container product-detail-page">
        <div className="detail-top-nav">
          <Link to="/products" className="back-link">
            ← Back to Products Catalog
          </Link>
          <StockClock />
        </div>

        <div className="detail-not-found">
          <h2>Product Not Found</h2>
          <p>No inventory item found matching SKU: <code>{sku}</code></p>
          <Link to="/products" className="primary-nav-btn">
            Return to Products Catalog
          </Link>
        </div>
      </div>
    )
  }

  const isLowStock = product.quantity <= (product.lowStockThreshold ?? 10)
  const status = isLowStock ? 'low-stock' : 'in-stock'
  const totalValue = (product.price * product.quantity).toFixed(2)

  return (
    <div className="page-container product-detail-page">
      <div className="detail-top-nav">
        <Link to="/products" className="back-link">
          ← Back to Products Catalog
        </Link>
        {/* Requirement 6: StockClock running independently on detail page */}
        <StockClock />
      </div>

      <article className="product-detail-card">
        <div className="detail-header">
          <div className="detail-title-group">
            <span className="product-category">{product.category}</span>
            <h1 className="detail-product-name">{product.name}</h1>
            <p className="detail-sku">
              SKU: <span className="sku-code">{product.sku}</span>
            </p>
          </div>
          <Badge status={status} />
        </div>

        <div className="detail-metrics-grid">
          <div className="detail-metric-card">
            <span className="metric-label">Unit Price</span>
            <span className="metric-value price-value">${product.price.toFixed(2)}</span>
          </div>

          <div className="detail-metric-card">
            <span className="metric-label">Current Stock</span>
            <span className="metric-value">{product.quantity} units</span>
          </div>

          <div className="detail-metric-card">
            <span className="metric-label">Low Stock Threshold</span>
            <span className="metric-value">{product.lowStockThreshold ?? 10} units</span>
          </div>

          <div className="detail-metric-card">
            <span className="metric-label">Total Inventory Value</span>
            <span className="metric-value">${totalValue}</span>
          </div>
        </div>

        {isLowStock && (
          <div className="restock-alert-box" role="alert">
            <span className="alert-icon" aria-hidden="true">⚠️</span>
            <div>
              <strong>Reorder Alert:</strong> Inventory count ({product.quantity}) is at or below the
              threshold ({product.lowStockThreshold ?? 10}). Place a purchase order with suppliers promptly.
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

export default ProductDetailPage
