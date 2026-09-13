import { useState } from 'react'
import Header from './components/Header'
import InventorySummary from './components/InventorySummary'
import SearchFilterBar from './components/SearchFilterBar'
import ProductList from './components/ProductList'
import './App.css'

/**
 * Baseline initial inventory dataset.
 * Used to initialize state and to restore values when the user clicks "Reset Inventory".
 */
const initialProducts = [
  {
    name: 'Wireless Barcode Scanner',
    sku: 'STK-SCN-001',
    category: 'Hardware',
    price: 89.99,
    quantity: 24,
    lowStockThreshold: 10,
  },
  {
    name: 'Thermal Receipt Paper (50pk)',
    sku: 'STK-PPR-002',
    category: 'Supplies',
    price: 34.5,
    quantity: 8,
    lowStockThreshold: 15,
  },
  {
    name: 'Heavy-Duty Storage Bins',
    sku: 'STK-BIN-003',
    category: 'Storage',
    price: 45.0,
    quantity: 42,
    lowStockThreshold: 20,
  },
  {
    name: 'Direct Thermal Label Printer',
    sku: 'STK-PRN-004',
    category: 'Hardware',
    price: 199.95,
    quantity: 4,
    lowStockThreshold: 5,
  },
  {
    name: 'Hydraulic Pallet Jack 5500lbs',
    sku: 'STK-PLT-005',
    category: 'Equipment',
    price: 429.0,
    quantity: 3,
    lowStockThreshold: 5,
  },
  {
    name: 'Industrial Stretch Wrap (4pk)',
    sku: 'STK-WRP-006',
    category: 'Packaging',
    price: 58.75,
    quantity: 35,
    lowStockThreshold: 12,
  },
]

function App() {
  // STEP 1: Main inventory state managed with useState
  const [products, setProducts] = useState(initialProducts)

  // STEP 5: Search term state managed with useState
  const [searchTerm, setSearchTerm] = useState('')

  // STEP 6: Stock status filter state ('all' | 'in-stock' | 'low-stock')
  const [stockFilter, setStockFilter] = useState('all')

  // STEP 2: Pure functional state update for product quantity (increase/decrease)
  const handleUpdateQuantity = (sku, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.sku === sku) {
          // Prevent quantities from dropping below 0
          const updatedQuantity = Math.max(0, product.quantity + delta)
          return { ...product, quantity: updatedQuantity }
        }
        return product
      }),
    )
  }

  // STEP 7: Reset controls restoring initial inventory and clearing search/filters
  const handleReset = () => {
    setProducts(initialProducts)
    setSearchTerm('')
    setStockFilter('all')
  }

  // STEP 4: Inventory statistics calculated derived directly from current products state
  const totalProducts = products.length
  const totalUnits = products.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockCount = products.filter(
    (item) => item.quantity <= (item.lowStockThreshold ?? 10),
  ).length

  // STEPS 5 & 6: Multi-criteria filtered list derived from state (search + stock filter)
  const filteredProducts = products.filter((product) => {
    const query = searchTerm.toLowerCase().trim()
    const matchesSearch =
      query === '' ||
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)

    const isLowStock = product.quantity <= (product.lowStockThreshold ?? 10)
    let matchesFilter = true
    if (stockFilter === 'in-stock') {
      matchesFilter = !isLowStock
    } else if (stockFilter === 'low-stock') {
      matchesFilter = isLowStock
    }

    return matchesSearch && matchesFilter
  })

  return (
    <div className="app-layout">
      {/* Reusable Header component */}
      <Header
        title="SmartStock"
        subtitle="Manage your products, stock, and suppliers in one place"
      />

      <main className="app-main">
        {/* STEP 4: Calculated inventory statistics summary */}
        <InventorySummary
          totalProducts={totalProducts}
          totalUnits={totalUnits}
          lowStockCount={lowStockCount}
        />

        {/* STEPS 5, 6 & 7: Search, stock filter, and reset controls */}
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          stockFilter={stockFilter}
          onFilterChange={setStockFilter}
          onReset={handleReset}
        />

        {/* STEPS 1, 2 & 3: Product list displaying filtered inventory with quantity controls */}
        <ProductList
          products={filteredProducts}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </main>
    </div>
  )
}

export default App
