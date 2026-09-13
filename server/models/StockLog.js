import mongoose from 'mongoose'

/**
 * StockLog Schema
 *
 * Represents an immutable audit trail entry tracking every inventory adjustment (incoming vs. outgoing).
 *
 * Educational Explanations:
 * 1. Why quantity updates happen server-side inside createStockLog rather than trusting the client:
 *    - Race Conditions & Integrity: If two warehouse workers or cashiers simultaneously update a product's
 *      quantity directly via PUT /api/products/:sku with a static calculated quantity, the second write would
 *      overwrite the first without accounting for both deductions (the "lost update" anomaly).
 *    - Business Rule Enforcement: Calculating increments and decrements server-side guarantees that inventory
 *      cannot drop below zero (`quantity >= 0`), even under rapid concurrent operations.
 *    - Non-Repudiation / Security: A client cannot arbitrarily set stock to an unverified number.
 *      Every inventory modification is cryptographically tied to a verified user session (`req.user._id`),
 *      creating an indisputable audit ledger for internal controls and accounting.
 */
const stockLogSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product reference is required'],
    },
    type: {
      type: String,
      enum: {
        values: ['in', 'out'],
        message: 'Stock log type must be either "in" or "out"',
      },
      required: [true, 'Stock log type is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Stock log quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User (performedBy) reference is required'],
    },
  },
  {
    timestamps: true,
  },
)

export const StockLog = mongoose.model('StockLog', stockLogSchema)
export default StockLog
