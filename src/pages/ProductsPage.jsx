import { useState, useEffect } from 'react'
import Header from '../components/Header'
import StockClock from '../components/StockClock'
import InventorySummary from '../components/InventorySummary'
import AddProductForm from '../components/AddProductForm'
import SearchBar from '../components/SearchBar'
import ProductList from '../components/ProductList'
import { fetchProducts } from '../data/mockProducts'
import './pages.css'

/**
 * ProductsPage Component
 *
 * Route: "/products"
 * Contains the complete products catalog view, encapsulating Week 3 & 4 features:
 * - Async data fetching on mount with simulated loading & error handling
 * - Stock adjustment (+ / -), product creation, and deletion state updates
 * - Real-time statistics summary and name-based search filtering
 * - Document title synchronization side-effect
 */
function ProductsPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [shouldSimulateError, setShouldSimulateError] = useState(false)

  // Reusable fetch function called by mount effect and Retry button
  const loadProducts = async (forceFail = shouldSimulateError) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchProducts(forceFail)
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch inventory from server.')
    } finally {
      setIsLoading(false)
    }
  }

  // Mount-only lifecycle effect (equivalent to componentDidMount)
  useEffect(() => {
    loadProducts(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Side-effect synchronizing browser tab title with live product count
  useEffect(() => {
    const count = products.length
    document.title = `SmartStock Products (${count})`
  }, [products])

  // Handlers for state updates (immutable updates)
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct])
  }

  const handleDeleteProduct = (sku) => {
    setProducts((prev) => prev.filter((p) => p.sku !== sku))
  }

  const handleAdjustStock = (sku, amount) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.sku === sku) {
          const newQty = Math.max(0, product.quantity + amount)
          return { ...product, quantity: newQty }
        }
        return product
      }),
    )
  }

  // Derived statistics (calculated on render, no duplicate state)
  const totalProducts = products.length
  const totalUnits = products.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockCount = products.filter(
    (item) => item.quantity <= (item.lowStockThreshold ?? 10),
  ).length

  // Derived filtered products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  )

  return (
    <div className="page-container products-page">
      <Header
        title="Products Catalog"
        subtitle="Live inventory tracking, stock adjustments, and product management"
      />

      <div className="top-bar-controls">
        <StockClock />

        <button
          type="button"
          className="test-error-toggle-btn"
          onClick={() => {
            const nextVal = !shouldSimulateError
            setShouldSimulateError(nextVal)
            loadProducts(nextVal)
          }}
          title="Toggle to test API error and Retry button"
        >
          {shouldSimulateError ? '✓ Error Simulation Active' : '🧪 Test Error State'}
        </button>
      </div>

      <InventorySummary
        totalProducts={totalProducts}
        totalUnits={totalUnits}
        lowStockCount={lowStockCount}
      />

      <AddProductForm onAddProduct={handleAddProduct} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {isLoading ? (
        <div className="status-banner loading-banner" role="status">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p className="loading-text">Loading products from server...</p>
        </div>
      ) : error ? (
        <div className="status-banner error-banner" role="alert">
          <p className="error-message">⚠️ {error}</p>
          <button
            type="button"
            className="retry-btn"
            onClick={() => {
              setShouldSimulateError(false)
              loadProducts(false)
            }}
          >
            ↻ Retry Connection
          </button>
        </div>
      ) : (
        <ProductList
          products={filteredProducts}
          onAdjustStock={handleAdjustStock}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  )
}

export default ProductsPage
