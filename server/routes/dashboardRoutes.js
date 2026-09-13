import express from 'express'
import { getDashboardSummary } from '../controllers/dashboardController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/**
 * Dashboard Routes Definition
 * Mounted at: /api/dashboard in server.js
 *
 * Protection Policies:
 * - All routes require a valid JWT token (`protect`)
 */

router.get('/summary', protect, getDashboardSummary)

export default router
