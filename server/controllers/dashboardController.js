import { Product } from '../models/Product.js'
import { StockLog } from '../models/StockLog.js'

/**
 * Dashboard Controller
 *
 * Computes high-level business metrics and recent activity feeds for the inventory overview.
 */

/**
 * @desc    Fetch aggregated dashboard analytics and recent audit log activity
 * @route   GET /api/dashboard/summary
 * @access  Private (Requires login)
 */
export const getDashboardSummary = async (req, res) => {
  try {
    // 1. Total Products count
    const totalProducts = await Product.countDocuments()

    // 2. Total Inventory Value (sum of price * quantity across all catalog items)
    const valueAggregate = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: { $multiply: ['$price', '$quantity'] },
          },
        },
      },
    ])
    const totalInventoryValue =
      valueAggregate.length > 0 ? Math.round(valueAggregate[0].totalValue * 100) / 100 : 0

    // 3. Low Stock Count (products whose current quantity is at or below their lowStockThreshold)
    const lowStockCount = await Product.countDocuments({
      $expr: { $lte: ['$quantity', '$lowStockThreshold'] },
    })

    // 4. Recent Activity (last 10 StockLog entries, populated with product & user details)
    const recentActivity = await StockLog.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('product', 'name sku price')
      .populate('performedBy', 'name email role')

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalInventoryValue,
        lowStockCount,
        recentActivity,
      },
    })
  } catch (error) {
    console.error(`[Controller Error - getDashboardSummary]: ${error.message}`)
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve dashboard metrics.',
      error: error.message,
    })
  }
}

export default {
  getDashboardSummary,
}
