import express from 'express'
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplierController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

/**
 * Supplier Routes Definition
 * Mounted at: /api/suppliers in server.js
 *
 * Protection Policies:
 * - All routes require a valid JWT token (`protect`)
 * - DELETE /:id requires role 'admin' (`authorize('admin')`)
 */

router
  .route('/')
  .get(protect, getSuppliers)
  .post(protect, createSupplier)

router
  .route('/:id')
  .get(protect, getSupplierById)
  .put(protect, updateSupplier)
  .delete(protect, authorize('admin'), deleteSupplier)

export default router
