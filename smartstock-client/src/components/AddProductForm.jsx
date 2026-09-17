import { useState } from 'react'
import PropTypes from 'prop-types'
import './components.css'

/**
 * AddProductForm Component
 *
 * Demonstrates local form state management using useState for controlled inputs.
 *
 * Props received:
 * - onAddProduct: func (required) - callback passed from App.jsx to append the new product to the global products state.
 *
 * State variables (held locally because this is ephemeral user input that other components don't need until submit):
 * - name: string - holds current product name input
 * - sku: string - holds current SKU input
 * - category: string - holds current category selection/input
 * - price: string - holds current price input
 * - quantity: string - holds current quantity input
 * - lowStockThreshold: string - holds threshold for low-stock warnings
 * - error: string - holds temporary validation error messages
 */
function AddProductForm({ onAddProduct }) {
  // Local state for each form field (controlled inputs)
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [lowStockThreshold, setLowStockThreshold] = useState('10')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation: ensure required fields are not empty
    if (!name.trim() || !sku.trim() || !category.trim() || price === '' || quantity === '') {
      setError('Please fill in all required fields.')
      return
    }

    const parsedPrice = parseFloat(price)
    const parsedQuantity = parseInt(quantity, 10)
    const parsedThreshold = lowStockThreshold !== '' ? parseInt(lowStockThreshold, 10) : 10

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError('Price must be a valid non-negative number.')
      return
    }

    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      setError('Quantity must be 0 or greater.')
      return
    }

    // Construct the new product object
    const newProduct = {
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      category: category.trim(),
      price: parsedPrice,
      quantity: parsedQuantity,
      lowStockThreshold: isNaN(parsedThreshold) ? 5 : parsedThreshold,
    }

    setIsSubmitting(true)
    try {
      // Call parent handler to create product via real API
      await onAddProduct(newProduct)

      // Clear form fields after successful submission
      setName('')
      setSku('')
      setCategory('')
      setPrice('')
      setQuantity('')
      setLowStockThreshold('10')
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to create product.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="add-product-section" aria-labelledby="add-product-heading">
      <h2 id="add-product-heading" className="form-heading">
        Add New Product
      </h2>

      {error && <div className="form-error" role="alert">{error}</div>}

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="prod-name">Product Name *</label>
            <input
              id="prod-name"
              type="text"
              placeholder="e.g. Barcode Scanner"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prod-sku">SKU Code *</label>
            <input
              id="prod-sku"
              type="text"
              placeholder="e.g. STK-SCN-101"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prod-category">Category *</label>
            <input
              id="prod-category"
              type="text"
              placeholder="e.g. Hardware, Supplies"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prod-price">Price ($) *</label>
            <input
              id="prod-price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prod-quantity">Initial Quantity *</label>
            <input
              id="prod-quantity"
              type="number"
              min="0"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prod-threshold">Low Stock Threshold</label>
            <input
              id="prod-threshold"
              type="number"
              min="0"
              placeholder="10"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="add-product-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Product...' : '+ Add to Inventory'}
        </button>
      </form>
    </section>
  )
}

AddProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
}

export default AddProductForm
