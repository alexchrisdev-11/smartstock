import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

/**
 * Authentication & Authorization Middleware
 *
 * Educational Explanations:
 *
 * 1. How the `protect` middleware turns a Bearer token into `req.user`:
 *    - Client Request: The client includes an HTTP header: `Authorization: Bearer <jwt_token_string>`.
 *    - Parsing: The middleware extracts the header, checks for the "Bearer " scheme prefix, and isolates the token string.
 *    - Cryptographic Verification: `jwt.verify(token, secret)` decodes the token and validates its signature
 *      against the secret key. If tampered with or expired, it throws an error immediately.
 *    - Hydration from Database: Using the verified `decoded.id`, Mongoose queries the current user record from MongoDB
 *      (excluding the password hash via `.select('-password')`).
 *    - Request Attachment: The user document is assigned to `req.user`. Express passes this mutated request object
 *      downstream to the next handler (`next()`), allowing controllers (e.g. `getMe`) or subsequent middleware to access
 *      `req.user._id`, `req.user.email`, `req.user.role` directly.
 *
 * 2. Difference between `protect` and `authorize`:
 *    - `protect` = Authentication (Identity Verification): "Who are you? Are you logged in with a valid, non-expired token?"
 *      If false -> HTTP 401 Unauthorized.
 *    - `authorize` = Authorization (Access Control / RBAC): "Now that we know who you are, do your permissions (role)
 *      allow you to perform this specific action?" (e.g., only "admin" can delete items; "staff" cannot).
 *      If false -> HTTP 403 Forbidden.
 */

/**
 * Protect Middleware
 * Ensures the incoming request is authenticated with a valid JSON Web Token.
 */
export const protect = async (req, res, next) => {
  let token

  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      // Extract token from "Bearer <token>"
      token = authHeader.split(' ')[1]

      // Verify token signature and expiration
      const secret = process.env.JWT_SECRET || 'smartstock_default_jwt_dev_secret_key_change_me'
      const decoded = jwt.verify(token, secret)

      // Fetch user from DB (excluding password)
      const user = await User.findById(decoded.id).select('-password')

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: User account associated with this token no longer exists.',
        })
      }

      // Attach user object to request
      req.user = user
      return next()
    } catch (error) {
      console.error(`[Auth Middleware Error - protect]: ${error.message}`)

      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: Token has expired. Please log in again.',
        })
      }

      return res.status(401).json({
        success: false,
        message: 'Not authorized: Invalid or malformed token.',
      })
    }
  }

  // If no Bearer token was provided in Authorization header
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No Bearer token provided in Authorization header.',
    })
  }
}

/**
 * Authorize Middleware Factory
 * Restricts route access to users possessing specific roles (Role-Based Access Control).
 *
 * @param  {...string} roles - Permitted roles (e.g., 'admin', 'staff')
 * @returns {Function} Express middleware function
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Authentication required prior to authorization check.',
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role "${req.user.role}" is not authorized to access this resource.`,
      })
    }

    next()
  }
}

export default { protect, authorize }
