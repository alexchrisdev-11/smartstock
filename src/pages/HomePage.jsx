import { Link } from 'react-router-dom'
import Header from '../components/Header'
import StockClock from '../components/StockClock'
import './pages.css'

/**
 * HomePage Component
 *
 * Route: "/"
 * Serves as the landing dashboard welcoming the user to the SmartStock management suite.
 * Reuses Header and StockClock components and provides a client-side <Link> to the Products catalog.
 */
function HomePage() {
  return (
    <div className="page-container home-page">
      <Header
        title="SmartStock"
        subtitle="Manage your products, stock, and suppliers in one place"
      />

      <div className="home-top-meta">
        <StockClock />
      </div>

      <section className="home-hero-card">
        <h2 className="hero-heading">Welcome to your Inventory Control Center</h2>
        <p className="hero-text">
          SmartStock empowers warehouse managers and inventory leads to monitor product quantities,
          receive automatic low-stock alerts, adjust inventory levels on the fly, and maintain catalog accuracy.
        </p>

        <div className="home-actions">
          <Link to="/products" className="primary-nav-btn">
            📦 Open Products Catalog →
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
    </div>
  )
}

export default HomePage
