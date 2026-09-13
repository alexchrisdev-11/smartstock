/**
 * Baseline initial inventory dataset (6 sample products).
 * Moved from App.jsx to simulate an external data source or database.
 */
export const mockProducts = [
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

/**
 * Simulates an asynchronous API network call to fetch products.
 *
 * @param {boolean} shouldFail - Optional flag to force failure for testing error states.
 * @returns {Promise<Array>} Resolves with products array after 800ms, or rejects with an error.
 */
export function fetchProducts(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Network error: Unable to connect to inventory server (simulated failure).'))
      } else {
        // Return a cloned copy so in-memory mutations don't alter base mock dataset
        resolve(mockProducts.map((p) => ({ ...p })))
      }
    }, 800)
  })
}
