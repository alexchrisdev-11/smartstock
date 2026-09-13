import { User } from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'

/**
 * Authentication Controllers
 *
 * Handles user registration, login with JWT issuance, and authenticated profile retrieval.
 */

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // 1. Validation: Ensure required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and password.',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    // 2. Duplicate Check: Prevent multiple accounts with the same email
    const userExists = await User.findOne({ email: normalizedEmail })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user account with this email address already exists.',
      })
    }

    // 3. Create User: Password is automatically hashed by UserSchema pre('save') hook
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: role && ['admin', 'staff'].includes(role.toLowerCase()) ? role.toLowerCase() : 'staff',
    })

    // 4. Issue JWT and respond
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    })
  } catch (error) {
    console.error(`[Controller Error - registerUser]: ${error.message}`)

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: 'Server error: Unable to register user.',
      error: error.message,
    })
  }
}

/**
 * @desc    Authenticate user & issue JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Validation: Check if credentials are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    // 2. Query user: Explicitly include password hash with .select('+password')
    const user = await User.findOne({ email: normalizedEmail }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    // 3. Compare password hash using schema instance method
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    // 4. Return user info & signed JWT token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    })
  } catch (error) {
    console.error(`[Controller Error - loginUser]: ${error.message}`)
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to process login.',
      error: error.message,
    })
  }
}

/**
 * @desc    Get profile of currently logged-in user
 * @route   GET /api/auth/me
 * @access  Private (Protected by JWT)
 */
export const getMe = async (req, res) => {
  try {
    // req.user was attached upstream by the protect middleware
    res.status(200).json({
      success: true,
      data: req.user,
    })
  } catch (error) {
    console.error(`[Controller Error - getMe]: ${error.message}`)
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve user profile.',
      error: error.message,
    })
  }
}

export default {
  registerUser,
  loginUser,
  getMe,
}
