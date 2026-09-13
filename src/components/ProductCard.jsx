import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Badge from './Badge'
import './components.css'

/**
 * ProductCard Component
 *
 * A presentational card component displaying product information, quantity controls,
 * a delete button, and a client-side <Link> navigating to the dynamic product detail route.
 *
 * Props received:
 * - name: string (required) - display name of the inventory item
 * - sku: string (required) - unique SKU identifier
 * - category: string (required) - item classification
 * - price: number (required) - unit price in USD
 * - quantity: number (required) - current inventory quantity
 * - lowStockThreshold: number (optional) - minimum alert threshold
 * - onAdjustStock: func (required) - callback to increase/decrease quantity in state
 * - onDelete: func (required) - callback to remove product from state
 */
function ProductCard({
  name,
  sku,
  category,
  price,
  quantity,
  lowStockThreshold = 10,
  onAdjustStock,
  onDelete,
}) {
  // Derive stock status reactively from props
  const status = quantity <= lowStockThreshold ? 'low-stock' : 'in-stock'

  return (
    <article className="product-card">
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
              onClick={() => onAdjustStock(sku, -1)}
              disabled={quantity === 0}
              title={quantity === 0 ? 'Cannot decrease below 0' : 'Decrease stock by 1'}
              aria-label={`Decrease quantity of ${name}`}
            >
              −
            </button>
            <span className="stock-value">{quantity}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => onAdjustStock(sku, 1)}
              title="Increase stock by 1"
              aria-label={`Increase quantity of ${name}`}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="product-card-footer">
        {/* Requirement 5: Client-side navigation to dynamic product detail page */}
        <Link
          to={`/products/${sku}`}
          state={{
            product: { name, sku, category, price, quantity, lowStockThreshold },
          }}
          className="view-details-link"
        >
          View Details →
        </Link>

        {/* Delete Product Button */}
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(sku)}
          title={`Delete ${name} from inventory`}
          aria-label={`Delete ${name}`}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  lowStockThreshold: PropTypes.number,
  onAdjustStock: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ProductCard
