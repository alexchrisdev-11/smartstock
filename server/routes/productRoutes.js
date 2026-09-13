import express from 'express'
import {
  getProducts,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

/**
 * Product Routes Definition
 * Mounted at: /api/products in server.js
 *
 * Route Protection Policies:
 * - GET    /api/products      → Public (browsing)
 * - POST   /api/products      → Protected (requires login)
 * - GET    /api/products/:sku → Public (browsing)
 * - PUT    /api/products/:sku → Protected (requires login)
 * - DELETE /api/products/:sku → Protected & Admin Only (requires role 'admin')
 */

router
  .route('/')
  .get(getProducts)
  .post(protect, createProduct)

router
  .route('/:sku')
  .get(getProductBySku)
  .put(protect, updateProduct)
  .delete(protect, authorize('admin'), deleteProduct)

export default router
