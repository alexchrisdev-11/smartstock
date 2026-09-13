import PropTypes from 'prop-types'
import Badge from './Badge'
import './components.css'

/**
 * ProductCard Component
 * Props received:
 * - name: string (required) - display name of the inventory item
 * - sku: string (required) - unique stock keeping unit identifier
 * - category: string (required) - item categorization (e.g. Hardware, Supplies)
 * - price: number (required) - unit price in USD
 * - quantity: number (required) - current quantity in inventory (reactive from App state)
 * - lowStockThreshold: number (optional) - threshold below which item is marked low-stock
 * - onUpdateQuantity: func (required) - callback to increase or decrease quantity in parent state
 * Renders:
 * - A product card with details, derived stock Badge, and "+" / "−" quantity control buttons
 */
function ProductCard({
  name,
  sku,
  category,
  price,
  quantity,
  lowStockThreshold = 10,
  onUpdateQuantity,
}) {
  // Derive stock status reactively from props (quantity vs lowStockThreshold)
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

      <div className="product-card-footer">
        <div className="product-detail">
          <span className="detail-label">Price</span>
          <span className="detail-value price-value">${price.toFixed(2)}</span>
        </div>

        <div className="product-detail">
          <span className="detail-label">Quantity</span>
          {/* Quantity Controls (+ and − buttons) */}
          <div className="quantity-controls">
            <button
              type="button"
              className="qty-btn"
              onClick={() => onUpdateQuantity(sku, -1)}
              disabled={quantity === 0}
              title={quantity === 0 ? 'Cannot decrease below 0' : 'Decrease quantity'}
              aria-label={`Decrease quantity of ${name}`}
            >
              −
            </button>
            <span className="stock-value">{quantity}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => onUpdateQuantity(sku, 1)}
              title="Increase quantity"
              aria-label={`Increase quantity of ${name}`}
            >
              +
            </button>
          </div>
        </div>
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
  onUpdateQuantity: PropTypes.func.isRequired,
}

export default ProductCard
