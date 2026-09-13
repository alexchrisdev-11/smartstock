import PropTypes from 'prop-types'
import ProductCard from './ProductCard'
import './components.css'

/**
 * ProductList Component
 *
 * Facilitates list rendering by mapping over the filtered products array.
 *
 * Why no useState here?
 * - ProductList does not own the products collection or search criteria; it receives the already filtered
 *   array via props from App.jsx and simply renders each item.
 *
 * Props received:
 * - products: Array of product objects (required) - the current filtered products to display
 * - onAdjustStock: func (required) - forwarded to ProductCard to modify quantity
 * - onDelete: func (required) - forwarded to ProductCard to delete an item
 *
 * Renders:
 * - A responsive CSS grid displaying a ProductCard for each item, or an empty state message if no products exist
 */
function ProductList({ products, onAdjustStock, onDelete }) {
  return (
    <section className="product-list-section" aria-labelledby="inventory-list-heading">
      <div className="product-list-header">
        <h2 id="inventory-list-heading" className="section-title">
          Inventory Catalog
        </h2>
        <span className="product-count">
          {products.length} {products.length === 1 ? 'Product' : 'Products'} Listed
        </span>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <p className="no-products-title">No products found</p>
          <p className="no-products-subtitle">
            No products match your current search criteria. Try a different query or add a new product above.
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
              onAdjustStock={onAdjustStock}
              onDelete={onDelete}
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
  onAdjustStock: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ProductList
