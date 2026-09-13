import { StockLog } from '../models/StockLog.js'
import { Product } from '../models/Product.js'

/**
 * StockLog Controller
 *
 * Manages inventory movement audit logs and atomic stock updates.
 */

/**
 * @desc    Record an inventory adjustment (stock in/out) and update product quantity
 * @route   POST /api/stocklogs
 * @access  Private (Requires login)
 */
export const createStockLog = async (req, res) => {
  try {
    const { product: productId, type, quantity, note } = req.body

    // 1. Validate required inputs
    if (!productId || !type || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: product (ID), type ("in" | "out"), and quantity.',
      })
    }

    const numQuantity = Number(quantity)
    if (isNaN(numQuantity) || numQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive number greater than 0.',
      })
    }

    if (!['in', 'out'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Stock log type must be either "in" (addition) or "out" (reduction).',
      })
    }

    // 2. Fetch target product
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID "${productId}" not found.`,
      })
    }

    // 3. Business rule check: Ensure stock does not drop below zero
    if (type === 'out' && product.quantity - numQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock: Cannot decrease by ${numQuantity}. Current stock is ${product.quantity}.`,
        currentStock: product.quantity,
      })
    }

    // 4. Update product quantity server-side
    if (type === 'in') {
      product.quantity += numQuantity
    } else if (type === 'out') {
      product.quantity -= numQuantity
    }

    await product.save()

    // 5. Create immutable audit log with authenticated user ID
    const stockLog = await StockLog.create({
      product: product._id,
      type,
      quantity: numQuantity,
      note: note ? note.trim() : '',
      date: new Date(),
      performedBy: req.user._id, // Enforced from verified session
    })

    const populatedLog = await StockLog.findById(stockLog._id)
      .populate('product', 'name sku price')
      .populate('performedBy', 'name email role')

    res.status(201).json({
      success: true,
      message: `Stock ${type === 'in' ? 'received' : 'dispatched'} successfully. Product quantity updated to ${product.quantity}.`,
      data: {
        log: populatedLog,
        updatedProductQuantity: product.quantity,
      },
    })
  } catch (error) {
    console.error(`[Controller Error - createStockLog]: ${error.message}`)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid Product ID format.',
      })
    }
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to record stock log.',
      error: error.message,
    })
  }
}

/**
 * @desc    Fetch stock history logs for a specific product
 * @route   GET /api/stocklogs/product/:productId
 * @access  Private (Requires login)
 */
export const getStockLogsByProduct = async (req, res) => {
  try {
    const { productId } = req.params

    const logs = await StockLog.find({ product: productId })
      .sort({ createdAt: -1 })
      .populate('performedBy', 'name email role')
      .populate('product', 'name sku')

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    })
  } catch (error) {
    console.error(`[Controller Error - getStockLogsByProduct]: ${error.message}`)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid Product ID format.',
      })
    }
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve stock logs.',
      error: error.message,
    })
  }
}

export default {
  createStockLog,
  getStockLogsByProduct,
}
