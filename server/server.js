import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import supplierRoutes from './routes/supplierRoutes.js'
import stockLogRoutes from './routes/stockLogRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

// Load environment variables from .env file
dotenv.config()

// Initialize Express application
const app = express()

// Global Middleware
app.use(cors()) // Enable Cross-Origin Resource Sharing for frontend access
app.use(express.json()) // Parse JSON request bodies

// Root & Health Check Routes (Confirm server is alive before hitting DB routes)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SmartStock API running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      suppliers: '/api/suppliers',
      stocklogs: '/api/stocklogs',
      dashboard: '/api/dashboard',
    },
  })
})

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SmartStock API running',
    timestamp: new Date().toISOString(),
  })
})

// Mount Resource Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/suppliers', supplierRoutes)
app.use('/api/stocklogs', stockLogRoutes)
app.use('/api/dashboard', dashboardRoutes)

// 404 Catch-All Middleware for undefined API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found on SmartStock API server`,
  })
})

const PORT = process.env.PORT || 5000

// Connect to Database and start Express HTTP server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`[SmartStock Server] Active and listening on http://localhost:${PORT}`)
      console.log(`[SmartStock Server] Health check: http://localhost:${PORT}/api/health`)
    })
  } catch (error) {
    console.error(`[Server Start Error]: ${error.message}`)
  }
}

startServer()

export default app
