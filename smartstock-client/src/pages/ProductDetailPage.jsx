import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import Badge from '../components/Badge'
import StockClock from '../components/StockClock'
import { getProductBySku, getStockLogsByProduct } from '../api/productsApi'
import './pages.css'

/**
 * ProductDetailPage Component
 *
 * Route: "/products/:sku"
 *
 * Real Backend Integration (Week 11):
 * - Reads `sku` from route params.
 * - Fetches product document from `GET /api/products/:sku`.
 * - Fetches audit log trail from `GET /api/stocklogs/product/:productId`.
 * - Handles loading spinners, network errors, and missing product 404 views.
 */
function ProductDetailPage() {
  const { sku } = useParams()
  const location = useLocation()

  const [product, setProduct] = useState(location.state?.product || null)
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(!location.state?.product)
  const [isLoadingLogs, setIsLoadingLogs] = useState(false)
  const [error, setError] = useState(null)
  const [logsError, setLogsError] = useState(null)

  // Fetch product by SKU
  useEffect(() => {
    let isMounted = true

    const fetchDetails = async () => {
      if (!location.state?.product) {
        setIsLoading(true)
      }
      setError(null)

      try {
        const fetchedProduct = await getProductBySku(sku)
        if (isMounted) {
          setProduct(fetchedProduct)
          setIsLoading(false)

          // Fetch stock history logs once product ID is confirmed
          if (fetchedProduct?._id) {
            setIsLoadingLogs(true)
            setLogsError(null)
            try {
              const auditLogs = await getStockLogsByProduct(fetchedProduct._id)
              if (isMounted) {
                setLogs(auditLogs || [])
              }
            } catch (logErr) {
              if (isMounted) {
                console.error('Failed to load stock audit trail:', logErr)
                setLogsError(
                  logErr.response?.data?.message || 'Unable to load stock movement history.'
                )
              }
            } finally {
              if (isMounted) {
                setIsLoadingLogs(false)
              }
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load product:', err)
          setError(
            err.response?.data?.message ||
              (err.response?.status === 404
                ? `No inventory item found matching SKU: ${sku}`
                : 'Failed to connect to the server. Please check your connection.')
          )
          setIsLoading(false)
        }
      }
    }

    if (sku) {
      fetchDetails()
    }

    return () => {
      isMounted = false
    }
  }, [sku, location.state?.product])

  // Loading state
  if (isLoading) {
    return (
      <div className="page-container product-detail-page">
        <div className="detail-top-nav">
          <Link to="/products" className="back-link">
            ← Back to Products Catalog
          </Link>
          <StockClock />
        </div>
        <div className="status-banner loading-banner" role="status" aria-live="polite">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p className="loading-text">Loading product details from server...</p>
        </div>
      </div>
    )
  }

  // Error / Not found state
  if (error || !product) {
    return (
      <div className="page-container product-detail-page">
        <div className="detail-top-nav">
          <Link to="/products" className="back-link">
            ← Back to Products Catalog
          </Link>
          <StockClock />
        </div>

        <div className="detail-not-found">
          <h2>Product Unavailable</h2>
          <p>{error || `No inventory item found matching SKU: ${sku}`}</p>
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

        {/* Product Metrics Grid */}
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

        {/* Supplier Meta if available */}
        {product.supplier && typeof product.supplier === 'object' && (
          <div className="detail-supplier-card">
            <span className="metric-label">Assigned Supplier</span>
            <div className="detail-supplier-info">
              <strong>{product.supplier.name}</strong>
              {product.supplier.contactEmail && (
                <span> • ✉️ {product.supplier.contactEmail}</span>
              )}
              {product.supplier.phone && (
                <span> • 📞 {product.supplier.phone}</span>
              )}
            </div>
          </div>
        )}

        {/* Low Stock Alert */}
        {isLowStock && (
          <div className="restock-alert-box" role="alert">
            <span className="alert-icon" aria-hidden="true">⚠️</span>
            <div>
              <strong>Reorder Alert:</strong> Inventory count ({product.quantity}) is at or below the
              threshold ({product.lowStockThreshold ?? 10}). Place a purchase order with suppliers promptly.
            </div>
          </div>
        )}

        {/* Stock Movement Audit Trail Section */}
        <section className="audit-history-section" aria-labelledby="audit-heading">
          <div className="audit-header">
            <h2 id="audit-heading" className="audit-title">
              📋 Stock Movement Audit History
            </h2>
            <span className="audit-count">
              {logs.length} record{logs.length === 1 ? '' : 's'}
            </span>
          </div>

          {isLoadingLogs ? (
            <div className="audit-loading">
              <div className="loading-spinner-small" aria-hidden="true"></div>
              <span>Loading audit trail...</span>
            </div>
          ) : logsError ? (
            <p className="audit-error">{logsError}</p>
          ) : logs.length === 0 ? (
            <p className="audit-empty">No stock movement logs recorded for this item yet.</p>
          ) : (
            <div className="audit-table-wrapper">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Movement</th>
                    <th>Quantity</th>
                    <th>Adjusted By</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => {
                    const isAddition = log.type === 'in'
                    const dateFormatted = new Date(log.createdAt || log.date).toLocaleString(
                      undefined,
                      {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )
                    const userDisplay =
                      typeof log.performedBy === 'object' && log.performedBy?.name
                        ? `${log.performedBy.name} (${log.performedBy.role})`
                        : 'System Staff'

                    return (
                      <tr key={log._id}>
                        <td className="audit-date">{dateFormatted}</td>
                        <td>
                          <span
                            className={`audit-type-pill ${
                              isAddition ? 'audit-in' : 'audit-out'
                            }`}
                          >
                            {isAddition ? '⬆ STOCK IN' : '⬇ STOCK OUT'}
                          </span>
                        </td>
                        <td className={`audit-quantity ${isAddition ? 'qty-plus' : 'qty-minus'}`}>
                          {isAddition ? `+${log.quantity}` : `-${log.quantity}`}
                        </td>
                        <td className="audit-user">{userDisplay}</td>
                        <td className="audit-note">{log.note || '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </article>
    </div>
  )
}

export default ProductDetailPage
