import express from 'express'
import {
  getProducts,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'

const router = express.Router()

/**
 * Product Routes Definition
 *
 * Mounted at: /api/products in server.js
 *
 * Endpoints:
 * - GET    /api/products      → Retrieve all inventory items
 * - POST   /api/products      → Create a new product record
 * - GET    /api/products/:sku → Retrieve a single product by unique SKU
 * - PUT    /api/products/:sku → Update product details by SKU
 * - DELETE /api/products/:sku → Remove a product by SKU
 */

router
  .route('/')
  .get(getProducts)
  .post(createProduct)

router
  .route('/:sku')
  .get(getProductBySku)
  .put(updateProduct)
  .delete(deleteProduct)

export default router
