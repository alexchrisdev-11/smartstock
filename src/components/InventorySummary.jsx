import PropTypes from 'prop-types'
import './components.css'

/**
 * InventorySummary Component
 * Props received:
 * - totalProducts: number (required) - total count of distinct product lines
 * - totalUnits: number (required) - sum of all inventory unit quantities
 * - lowStockCount: number (required) - number of items at or below low stock threshold
 * Renders:
 * - A 3-card summary grid showing real-time calculated inventory metrics
 */
function InventorySummary({ totalProducts, totalUnits, lowStockCount }) {
  return (
    <section className="inventory-summary" aria-label="Inventory Statistics">
      <div className="stat-card">
        <span className="stat-label">Total Products</span>
        <span className="stat-value">{totalProducts}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Total Units</span>
        <span className="stat-value">{totalUnits.toLocaleString()}</span>
      </div>

      <div className={`stat-card ${lowStockCount > 0 ? 'stat-card-warning' : ''}`}>
        <span className="stat-label">Low Stock Products</span>
        <span className="stat-value">{lowStockCount}</span>
      </div>
    </section>
  )
}

InventorySummary.propTypes = {
  totalProducts: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
  lowStockCount: PropTypes.number.isRequired,
}

export default InventorySummary
