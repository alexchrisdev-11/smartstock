import axiosClient from './axiosClient'

/**
 * Dashboard API Service
 *
 * Fetches high-level inventory analytics and recent activity feeds.
 */

/**
 * Fetch aggregated dashboard overview data
 * @returns {Promise<object>} { totalProducts, totalInventoryValue, lowStockCount, recentActivity }
 */
export const getDashboardSummary = async () => {
  const response = await axiosClient.get('/dashboard/summary')
  return response.data.data
}

export default {
  getDashboardSummary,
}
