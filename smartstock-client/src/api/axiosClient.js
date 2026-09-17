import axios from 'axios'

/**
 * Centralized Axios HTTP Client
 *
 * Educational Explanations:
 *
 * 1. Why the Authorization header is attached via an Axios Request Interceptor rather than manually on every request:
 *    - DRY (Don't Repeat Yourself): Manually fetching the JWT from localStorage and constructing `{ headers: { Authorization: `Bearer ${token}` } }`
 *      across 15+ different API calls (GET products, POST suppliers, POST stocklogs, etc.) causes code duplication and human error.
 *    - Separation of Concerns: Individual feature services (e.g. productsApi, suppliersApi) should focus strictly on endpoint paths
 *      and payloads, not on authentication plumbing.
 *    - Always Up-To-Date: If a token refreshes or user re-authenticates, the interceptor immediately injects the latest token
 *      into subsequent requests without needing to recreate or reconfigure the API client.
 *
 * 2. Why a global 401 Response Interceptor is useful:
 *    - Centralized Session Expiration Handling: When a JWT token expires or is invalidated on the server, any protected
 *      endpoint will respond with HTTP 401 Unauthorized.
 *    - Graceful UX: Without a global interceptor, every component would need redundant try/catch blocks checking `if (err.response?.status === 401)`.
 *      The global interceptor catches 401 errors anywhere in the application, automatically purges the invalid stored session,
 *      and redirects the user to the `/login` page with an explanation, preventing a broken or silently stuck UI state.
 */

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request Interceptor: Attach JWT Bearer Token to outgoing requests if user is logged in
axiosClient.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem('smartstock_user')
      if (storedUser) {
        const parsed = JSON.parse(storedUser)
        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`
        }
      }
    } catch (err) {
      console.error('[Axios Request Interceptor Error]:', err)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response Interceptor: Catch 401 Unauthorized globally and redirect to /login
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('[Axios Response Interceptor]: Session expired or unauthorized (401). Redirecting to login.')

      // Clear local session storage
      try {
        localStorage.removeItem('smartstock_user')
      } catch (e) {
        console.error('[Axios Interceptor Storage Error]:', e)
      }

      // Avoid redirect loops if already on login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login?expired=true'
      }
    }

    return Promise.reject(error)
  },
)

export default axiosClient
