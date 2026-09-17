import mongoose from 'mongoose'

/**
 * Connect to MongoDB Database with Automatic In-Memory Datastore Fallback
 */
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/smartstock'
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2500 })
    console.log('[Database] MongoDB Connected: ' + conn.connection.host + '/' + conn.connection.name)
  } catch (error) {
    console.warn('[Database Notice] MongoDB offline: ' + error.message)
    console.log('[Database Notice] Enabling SmartStock In-Memory Mock Store with Turnkey Demo Data...')
    const { initMockStore } = await import('./mockStore.js')
    await initMockStore()
    console.log('[Database Ready] In-Memory Datastore active')
  }
}

export default connectDB
