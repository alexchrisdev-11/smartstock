import axiosClient from './axiosClient'

/**
 * Suppliers API Service
 *
 * Provides CRUD operations for vendor and distributor records.
 */

/**
 * Fetch all suppliers (Protected)
 * @returns {Promise<Array>} Array of supplier records
 */
export const getSuppliers = async () => {
  const response = await axiosClient.get('/suppliers')
  return response.data.data
}

/**
 * Fetch a single supplier by ID (Protected)
 * @param {string} id - MongoDB ObjectId of supplier
 * @returns {Promise<object>} Supplier record
 */
export const getSupplierById = async (id) => {
  const response = await axiosClient.get(`/suppliers/${encodeURIComponent(id)}`)
  return response.data.data
}

/**
 * Create a new supplier (Protected)
 * @param {object} supplierData - { name, contactEmail, phone, address }
 * @returns {Promise<object>} Newly created supplier
 */
export const createSupplier = async (supplierData) => {
  const response = await axiosClient.post('/suppliers', supplierData)
  return response.data.data
}

/**
 * Update a supplier by ID (Protected)
 * @param {string} id - Supplier ObjectId
 * @param {object} updateData - Fields to update
 * @returns {Promise<object>} Updated supplier document
 */
export const updateSupplier = async (id, updateData) => {
  const response = await axiosClient.put(`/suppliers/${encodeURIComponent(id)}`, updateData)
  return response.data.data
}

/**
 * Delete a supplier by ID (Admin Only)
 * @param {string} id - Supplier ObjectId
 * @returns {Promise<object>} Deleted supplier document
 */
export const deleteSupplier = async (id) => {
  const response = await axiosClient.delete(`/suppliers/${encodeURIComponent(id)}`)
  return response.data.data
}

export default {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
}
