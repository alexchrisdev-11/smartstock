import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Badge from './Badge'
import { useAuth } from '../hooks/useAuth'
import './components.css'

/**
 * ProductCard Component
 *
 * Displays individual product data, quantity adjustment buttons, a detail link,
 * and a conditional Delete button visible exclusively to Admin users.
 *
 * Role-Based UI (Week 6):
 * - Consumes `useAuth()` to inspect `user.role`.
 * - If `user.role === 'admin'`, the "Delete Product" button is visible.
 * - If `user.role === 'staff'`, the item details and stock adjustments remain interactive,
 *   but the destructive delete button is hidden from view.
 */
function ProductCard({
  _id,
  name,
  sku,
  category,
  price,
  quantity,
  lowStockThreshold = 10,
  onAdjustStock,
  onDelete,
  isMutating = false,
}) {
  const { user } = useAuth()

  // Derive stock status reactively from props
  const status = quantity <= lowStockThreshold ? 'low-stock' : 'in-stock'

  return (
    <article className={`product-card ${isMutating ? 'card-mutating' : ''}`}>
      <div className="product-card-header">
        <span className="product-category">{category}</span>
        <Badge status={status} />
      </div>

      <h3 className="product-name">{name}</h3>
      <p className="product-sku">
        SKU: <span className="sku-code">{sku}</span>
      </p>

      <div className="product-card-body">
        <div className="product-detail">
          <span className="detail-label">Price</span>
          <span className="detail-value price-value">${price.toFixed(2)}</span>
        </div>

        <div className="product-detail">
          <span className="detail-label">Quantity</span>
          <div className="quantity-controls">
            <button
              type="button"
              className="qty-btn"
              onClick={() => onAdjustStock({ _id, sku, quantity }, 'out', 1)}
              disabled={quantity === 0 || isMutating}
              title={quantity === 0 ? 'Cannot decrease below 0' : 'Decrease stock by 1'}
              aria-label={`Decrease quantity of ${name}`}
            >
              −
            </button>
            <span className="stock-value">{isMutating ? '...' : quantity}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => onAdjustStock({ _id, sku, quantity }, 'in', 1)}
              disabled={isMutating}
              title="Increase stock by 1"
              aria-label={`Increase quantity of ${name}`}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="product-card-footer">
        <Link
          to={`/products/${sku}`}
          state={{
            product: { _id, name, sku, category, price, quantity, lowStockThreshold },
          }}
          className="view-details-link"
        >
          View Details →
        </Link>

        {/* Requirement 6: Role-based UI - Only admin users can delete products */}
        {user?.role === 'admin' && (
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(sku)}
            disabled={isMutating}
            title={`Delete ${name} from inventory (Admin access)`}
            aria-label={`Delete ${name}`}
          >
            {isMutating ? 'Deleting...' : '🗑️ Delete'}
          </button>
        )}
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  lowStockThreshold: PropTypes.number,
  onAdjustStock: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isMutating: PropTypes.bool,
}

export default ProductCard
