import axiosClient from './axiosClient'

/**
 * Products & Stock Logs API Service
 *
 * Educational Explanations:
 *
 * The Tradeoff: Refetching vs. Optimistic Local State Updates:
 *
 * 1. Optimistic Updates:
 *    - Pros: Instantaneous UI feedback with zero perceived latency. The user clicks "+", and the number
 *      changes immediately without waiting for server response.
 *    - Cons: High complexity. If the server rejects the request (e.g. insufficient stock on hand or network drop),
 *      the frontend must revert its local change and present an error. If concurrent users or warehouse barcode scanners
 *      modified the item in the meantime, the client view diverges from the true database state.
 *
 * 2. Refetching / Server-Authoritative Updates:
 *    - Pros: Absolute consistency. What the user sees is guaranteed to match the exact database record
 *      computed server-side (including updated timestamps, populated supplier data, and audit logs).
 *    - Cons: Slight network latency before the UI updates.
 *
 * SmartStock Hybrid Approach:
 * - Mutations (stock in/out adjustments, deletions, creations) hit the real server-side endpoint first.
 * - Upon a successful 200/201 response, the state is updated with the server's returned authoritative document
 *   (or refetched), guaranteeing complete data integrity across all screens.
 */

/**
 * Fetch all products from catalog
 * @returns {Promise<Array>} Array of product objects with populated suppliers
 */
export const getProducts = async () => {
  const response = await axiosClient.get('/products')
  return response.data.data
}

/**
 * Fetch single product by SKU
 * @param {string} sku - Product SKU
 * @returns {Promise<object>} Single product document
 */
export const getProductBySku = async (sku) => {
  const response = await axiosClient.get(`/products/${encodeURIComponent(sku)}`)
  return response.data.data
}

/**
 * Create a new product (Protected)
 * @param {object} productData - { name, sku, category, price, quantity, lowStockThreshold, supplier }
 * @returns {Promise<object>} Newly created product document
 */
export const createProduct = async (productData) => {
  const response = await axiosClient.post('/products', productData)
  return response.data.data
}

/**
 * Update an existing product by SKU (Protected)
 * @param {string} sku - Product SKU
 * @param {object} updateData - Partial product fields to update
 * @returns {Promise<object>} Updated product document
 */
export const updateProduct = async (sku, updateData) => {
  const response = await axiosClient.put(`/products/${encodeURIComponent(sku)}`, updateData)
  return response.data.data
}

/**
 * Delete product by SKU (Admin Only)
 * @param {string} sku - Product SKU
 * @returns {Promise<object>} Deleted product document
 */
export const deleteProduct = async (sku) => {
  const response = await axiosClient.delete(`/products/${encodeURIComponent(sku)}`)
  return response.data.data
}

/**
 * Record a stock adjustment (Stock In / Stock Out) via StockLogs API
 * @param {object} stockData - { product: productId, type: 'in'|'out', quantity: number, note?: string }
 * @returns {Promise<object>} { log, updatedProductQuantity }
 */
export const adjustStock = async (stockData) => {
  const response = await axiosClient.post('/stocklogs', stockData)
  return response.data.data
}

/**
 * Retrieve stock log history for a specific product
 * @param {string} productId - MongoDB ObjectId of product
 * @returns {Promise<Array>} Array of stock log audit entries
 */
export const getStockLogsByProduct = async (productId) => {
  const response = await axiosClient.get(`/stocklogs/product/${encodeURIComponent(productId)}`)
  return response.data.data
}

export default {
  getProducts,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
  getStockLogsByProduct,
}
