import PropTypes from 'prop-types'
import ProductCard from './ProductCard'
import './components.css'

/**
 * ProductList Component
 * Props received:
 * - products: Array of product objects (required)
 * - onUpdateQuantity: func (required) - callback to increase/decrease quantity in parent App state
 * Renders:
 * - A responsive CSS grid displaying a ProductCard for each item, or an empty state message if no items match
 */
function ProductList({ products, onUpdateQuantity }) {
  return (
    <section className="product-list-section">
      <div className="product-list-header">
        <h2 className="section-title">Current Inventory</h2>
        <span className="product-count">
          {products.length} {products.length === 1 ? 'Product' : 'Products'} Showing
        </span>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <p className="no-products-title">No products found</p>
          <p className="no-products-subtitle">
            Try adjusting your search query or stock filter to find what you are looking for.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.sku}
              name={product.name}
              sku={product.sku}
              category={product.category}
              price={product.price}
              quantity={product.quantity}
              lowStockThreshold={product.lowStockThreshold}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      )}
    </section>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      lowStockThreshold: PropTypes.number,
    }),
  ).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
}

export default ProductList
