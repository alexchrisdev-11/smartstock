import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import StockClock from '../components/StockClock'
import { useAuth } from '../hooks/useAuth'
import { getDashboardSummary } from '../api/dashboardApi'
import './pages.css'

/**
 * HomePage Component
 *
 * Route: "/"
 *
 * Behavior:
 * - Public View (Unauthenticated):
 *   Welcomes users to SmartStock with an overview of platform features and a login gateway.
 * - Authenticated View (Private / Staff / Admin):
 *   Loads live real-time dashboard analytics from `GET /api/dashboard/summary`:
 *   - Total Products count
 *   - Total Inventory Valuation (sum of price * quantity)
 *   - Low-Stock Alert Count
 *   - Recent Stock Movement Activity Feed
 */
function HomePage() {
  const { isAuthenticated, user } = useAuth()
  const [summary, setSummary] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchSummary = async () => {
      if (!isAuthenticated) return

      setIsLoading(true)
      setError(null)
      try {
        const data = await getDashboardSummary()
        if (isMounted) {
          setSummary(data)
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load dashboard summary:', err)
          setError(
            err.response?.data?.message ||
              'Unable to load live dashboard statistics. Please ensure the backend is running.'
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchSummary()

    return () => {
      isMounted = false
    }
  }, [isAuthenticated])

  return (
    <div className="page-container home-page">
      <Header
        title="SmartStock"
        subtitle="Manage your products, stock, and suppliers in one place"
      />

      <div className="home-top-meta">
        <StockClock />
      </div>

      {/* Authenticated Dashboard View */}
      {isAuthenticated ? (
        <section className="dashboard-content">
          <div className="welcome-banner">
            <h2>
              Welcome back, <span className="highlight-name">{user?.name || 'Manager'}</span> 👋
            </h2>
            <p className="welcome-subtext">
              Here is your live inventory status and recent warehouse activity summary.
            </p>
          </div>

          {isLoading ? (
            <div className="status-banner loading-banner" role="status" aria-live="polite">
              <div className="loading-spinner" aria-hidden="true"></div>
              <p className="loading-text">Loading live dashboard metrics...</p>
            </div>
          ) : error ? (
            <div className="status-banner error-banner" role="alert">
              <p className="error-message">⚠️ {error}</p>
            </div>
          ) : summary ? (
            <>
              {/* Metric KPI Cards */}
              <div className="inventory-summary dashboard-metrics-summary">
                <div className="stat-card">
                  <span className="stat-label">Total Catalog Products</span>
                  <span className="stat-value">{summary.totalProducts ?? 0}</span>
                </div>

                <div className="stat-card">
                  <span className="stat-label">Total Inventory Valuation</span>
                  <span className="stat-value price-value">
                    ${(summary.totalInventoryValue || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div
                  className={`stat-card ${
                    (summary.lowStockCount || 0) > 0 ? 'stat-card-warning' : ''
                  }`}
                >
                  <span className="stat-label">Low-Stock Alerts</span>
                  <span className="stat-value">{summary.lowStockCount ?? 0}</span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="dashboard-quick-actions">
                <Link to="/products" className="primary-nav-btn">
                  📦 View Products Catalog →
                </Link>
                <Link to="/suppliers" className="secondary-nav-btn">
                  🏢 Manage Suppliers →
                </Link>
              </div>

              {/* Recent Activity Table */}
              <section className="activity-feed-card" aria-labelledby="activity-heading">
                <div className="activity-card-header">
                  <h3 id="activity-heading" className="activity-title">
                    ⚡ Recent Stock Adjustments
                  </h3>
                  <span className="activity-badge-count">
                    {summary.recentActivity?.length || 0} recent
                  </span>
                </div>

                {(!summary.recentActivity || summary.recentActivity.length === 0) ? (
                  <p className="activity-empty">No inventory movements recorded yet.</p>
                ) : (
                  <div className="activity-table-wrapper">
                    <table className="audit-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Product</th>
                          <th>Action</th>
                          <th>Qty</th>
                          <th>Performed By</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summary.recentActivity.map((act) => {
                          const isAddition = act.type === 'in'
                          const dateFormatted = new Date(act.createdAt || act.date).toLocaleString(
                            undefined,
                            {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )
                          const productName = act.product?.name || 'Unknown Item'
                          const productSku = act.product?.sku || ''
                          const userDisplay =
                            typeof act.performedBy === 'object' && act.performedBy?.name
                              ? act.performedBy.name
                              : 'System Staff'

                          return (
                            <tr key={act._id}>
                              <td className="audit-date">{dateFormatted}</td>
                              <td>
                                <strong>{productName}</strong>{' '}
                                {productSku && <code className="sku-code">{productSku}</code>}
                              </td>
                              <td>
                                <span
                                  className={`audit-type-pill ${
                                    isAddition ? 'audit-in' : 'audit-out'
                                  }`}
                                >
                                  {isAddition ? 'IN' : 'OUT'}
                                </span>
                              </td>
                              <td
                                className={`audit-quantity ${
                                  isAddition ? 'qty-plus' : 'qty-minus'
                                }`}
                              >
                                {isAddition ? `+${act.quantity}` : `-${act.quantity}`}
                              </td>
                              <td className="audit-user">{userDisplay}</td>
                              <td className="audit-note">{act.note || '—'}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          ) : null}
        </section>
      ) : (
        /* Public Landing Page View (Unauthenticated) */
        <>
          <section className="home-hero-card">
            <h2 className="hero-heading">Welcome to your Inventory Control Center</h2>
            <p className="hero-text">
              SmartStock empowers warehouse managers and inventory leads to monitor product quantities,
              receive automatic low-stock alerts, adjust inventory levels on the fly, and maintain catalog accuracy.
            </p>

            <div className="home-actions">
              <Link to="/login" className="primary-nav-btn">
                🔐 Sign In to Access Dashboard →
              </Link>
            </div>
          </section>

          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon" aria-hidden="true">⚡</span>
              <h3>Real-Time Adjustments</h3>
              <p>Instantly update stock quantities with single-click incremental adjustments.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon" aria-hidden="true">🚨</span>
              <h3>Automated Badges</h3>
              <p>Visual status indicators flag items reaching critical low-stock thresholds.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon" aria-hidden="true">🔍</span>
              <h3>Instant Search</h3>
              <p>Filter products by name with fast, reactive in-memory search.</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage
