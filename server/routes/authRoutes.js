import express from 'express'
import {
  registerUser,
  loginUser,
  getMe,
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/**
 * Auth Routes Definition
 * Mounted at: /api/auth in server.js
 *
 * Endpoints:
 * - POST /api/auth/register → Register a new user (Public)
 * - POST /api/auth/login    → Authenticate user credentials and return JWT (Public)
 * - GET  /api/auth/me       → Get current authenticated user profile (Protected)
 */

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

export default router
