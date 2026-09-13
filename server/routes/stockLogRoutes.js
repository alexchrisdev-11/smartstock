import express from 'express'
import {
  createStockLog,
  getStockLogsByProduct,
} from '../controllers/stockLogController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/**
 * StockLog Routes Definition
 * Mounted at: /api/stocklogs in server.js
 *
 * Protection Policies:
 * - All routes require a valid JWT token (`protect`)
 */

router.post('/', protect, createStockLog)
router.get('/product/:productId', protect, getStockLogsByProduct)

export default router
