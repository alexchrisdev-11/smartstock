import jwt from 'jsonwebtoken'

/**
 * Generate JSON Web Token (JWT)
 *
 * Encodes the user's MongoDB ObjectID (`userId`) into a cryptographically signed token.
 *
 * @param {string|mongoose.Types.ObjectId} userId - Unique identifier of the authenticated user
 * @returns {string} Signed JWT token string
 */
export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'smartstock_default_jwt_dev_secret_key_change_me'
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'

  return jwt.sign({ id: userId }, secret, {
    expiresIn,
  })
}

export default generateToken
