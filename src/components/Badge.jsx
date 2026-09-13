import PropTypes from 'prop-types'
import './components.css'

/**
 * Badge Component
 * Props received:
 * - status: string ("in-stock" | "low-stock") indicating inventory availability
 * Renders:
 * - A compact pill-shaped label styled green for 'in-stock' or red for 'low-stock'
 */
function Badge({ status }) {
  const isLowStock = status === 'low-stock'
  const badgeClass = isLowStock ? 'badge badge-low-stock' : 'badge badge-in-stock'
  const labelText = isLowStock ? 'Low Stock' : 'In Stock'

  return <span className={badgeClass}>{labelText}</span>
}

Badge.propTypes = {
  status: PropTypes.oneOf(['in-stock', 'low-stock']).isRequired,
}

export default Badge
