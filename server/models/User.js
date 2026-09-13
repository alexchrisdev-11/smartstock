import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

/**
 * User Schema
 *
 * Defines the data structure, validation constraints, and authentication logic for users.
 *
 * Educational Explanations:
 * 1. Why passwords are hashed in a pre('save') hook instead of in the controller:
 *    - Separation of Concerns: Password encryption is an intrinsic property of the User entity lifecycle,
 *      not HTTP controller logic.
 *    - DRY (Don't Repeat Yourself): Any flow that creates or updates a User (registration, seeder script,
 *      password reset, profile update) automatically gets secure hashing without duplicating bcrypt calls.
 *    - Defense-in-depth: Prevents accidentally persisting raw plaintext passwords to the database if a developer
 *      forgets to call `bcrypt.hash` inside a new controller endpoint.
 *
 * 2. Why the password field uses `select: false` and requires `.select('+password')`:
 *    - Security by Default: In MongoDB, querying `User.find()` or `User.findById()` automatically excludes
 *      the password hash. This prevents accidental exposure of sensitive password hashes in API responses,
 *      JSON logs, or client-side stores (e.g., when returning user details in GET /api/users or GET /api/auth/me).
 *    - Explicit Opt-In: Only the authentication/login controller genuinely needs the hash to verify credentials.
 *      Using `.select('+password')` explicitly opts in to retrieving the hash only for that specific query.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Omitted from query results by default for security
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'staff'],
        message: 'Role must be either "admin" or "staff"',
      },
      default: 'staff',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  },
)

/**
 * Pre-Save Mongoose Hook
 * Automatically hashes the plaintext password before saving to the database.
 */
userSchema.pre('save', async function () {
  // Only hash password if it has been newly provided or modified
  if (!this.isModified('password')) {
    return
  }

  // Generate cryptographic salt and hash the password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

/**
 * Schema Instance Method: comparePassword
 * Compares incoming plaintext candidate password against stored bcrypt hash.
 *
 * @param {string} candidatePassword - Plaintext password provided by user at login
 * @returns {Promise<boolean>} True if password matches, false otherwise
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model('User', userSchema)
export default User
