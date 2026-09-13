import mongoose from 'mongoose'

/**
 * Connect to MongoDB Database
 *
 * Why DB connection logic lives in config/db.js (instead of inline in server.js):
 * 1. Single Responsibility Principle (SRP): `server.js` should focus strictly on Express
 *    server configuration, middleware mounting, and route handling. Delegating database logic
 *    to `config/db.js` enforces modular architecture.
 * 2. Reusability: Database setup can be imported independently by database seeding scripts,
 *    cron jobs, or automated testing suites without having to boot up an Express HTTP server.
 * 3. Centralized Lifecycle Management: Any future connection pooling options, event hooks
 *    (e.g., `mongoose.connection.on('disconnected')`), or custom logging are configured in one place.
 */
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/smartstock'
    const conn = await mongoose.connect(mongoUri)
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`)
  } catch (error) {
    console.error(`[Database Error] MongoDB connection failed: ${error.message}`)
    // Exit process with failure code to prevent running server without database backing
    process.exit(1)
  }
}

export default connectDB
