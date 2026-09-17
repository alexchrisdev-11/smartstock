import { useState, useEffect } from 'react'
import Header from '../components/Header'
import StockClock from '../components/StockClock'
import InventorySummary from '../components/InventorySummary'
import AddProductForm from '../components/AddProductForm'
import SearchBar from '../components/SearchBar'
import ProductList from '../components/ProductList'
import {
  getProducts,
  createProduct,
  deleteProduct,
  adjustStock,
} from '../api/productsApi'
import './pages.css'

/**
 * ProductsPage Component
 *
 * Route: "/products"
 * Encapsulates the complete inventory management experience:
 * - Real asynchronous data fetching via Axios from Express backend (/api/products)
 * - Atomic stock adjustments via real StockLogs API (/api/stocklogs)
 * - Real product creation and deletion with network error handling
 * - Real-time statistics summary, search filter, and tab title synchronization
 */
function ProductsPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [actionSuccess, setActionSuccess] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [shouldSimulateError, setShouldSimulateError] = useState(false)
  const [mutatingSku, setMutatingSku] = useState(null)

  // Reusable fetch function calling live backend API
  const loadProducts = async (forceFail = shouldSimulateError) => {
    setIsLoading(true)
    setError(null)
    try {
      if (forceFail) {
        throw new Error('Simulated network connection failure for error UX verification.')
      }
      const data = await getProducts()
      setProducts(data || [])
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch inventory from server.'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  // Mount-only lifecycle effect
  useEffect(() => {
    loadProducts(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Synchronize browser tab title with live product count
  useEffect(() => {
    const count = products.length
    document.title = `SmartStock Products (${count})`
  }, [products])

  // Clear temporary action alerts after 4 seconds
  useEffect(() => {
    if (actionSuccess || actionError) {
      const timer = setTimeout(() => {
        setActionSuccess(null)
        setActionError(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [actionSuccess, actionError])

  // Handler for adding a new product via real POST /api/products
  const handleAddProduct = async (newProductData) => {
    setActionError(null)
    setActionSuccess(null)
    try {
      const createdProduct = await createProduct(newProductData)
      setProducts((prev) => [createdProduct, ...prev])
      setActionSuccess(`Product "${createdProduct.name}" created successfully!`)
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create product.'
      setActionError(msg)
      throw new Error(msg)
    }
  }

  // Handler for deleting a product via real DELETE /api/products/:sku
  const handleDeleteProduct = async (sku) => {
    setActionError(null)
    setActionSuccess(null)
    setMutatingSku(sku)
    try {
      await deleteProduct(sku)
      setProducts((prev) => prev.filter((p) => p.sku !== sku))
      setActionSuccess(`Product with SKU "${sku}" deleted successfully.`)
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete product.'
      setActionError(msg)
    } finally {
      setMutatingSku(null)
    }
  }

  // Handler for stock in / stock out adjustments via real POST /api/stocklogs
  const handleAdjustStock = async (productInfo, type, amount = 1) => {
    setActionError(null)
    setActionSuccess(null)
    setMutatingSku(productInfo.sku)

    try {
      if (!productInfo._id) {
        throw new Error('Missing database product ID for stock log.')
      }

      const result = await adjustStock({
        product: productInfo._id,
        type,
        quantity: amount,
        note: `Manual stock adjustment from products catalog`,
      })

      // Update state with server-authoritative quantity
      setProducts((prev) =>
        prev.map((product) => {
          if (product.sku === productInfo.sku) {
            return { ...product, quantity: result.updatedProductQuantity }
          }
          return product
        }),
      )

      setActionSuccess(
        `Stock updated for ${productInfo.sku}: now ${result.updatedProductQuantity} units.`,
      )
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to adjust stock.'
      setActionError(msg)
    } finally {
      setMutatingSku(null)
    }
  }

  // Derived statistics (calculated dynamically)
  const totalProducts = products.length
  const totalUnits = products.reduce((sum, item) => sum + (item.quantity || 0), 0)
  const lowStockCount = products.filter(
    (item) => item.quantity <= (item.lowStockThreshold ?? 10),
  ).length

  // Derived filtered products based on search term
  const filteredProducts = products.filter((product) =>
    (product.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim()),
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

      {/* Global Action Alerts (Toast/Banner) */}
      {actionSuccess && (
        <div className="status-banner success-banner" role="status" style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0', color: '#065f46', marginBottom: '1.25rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid' }}>
          ✓ {actionSuccess}
        </div>
      )}

      {actionError && (
        <div className="status-banner action-error-banner" role="alert" style={{ backgroundColor: '#fff1f2', borderColor: '#fecdd3', color: '#9f1239', marginBottom: '1.25rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid' }}>
          ⚠️ {actionError}
        </div>
      )}

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
          mutatingSku={mutatingSku}
        />
      )}
    </div>
  )
}

export default ProductsPage
