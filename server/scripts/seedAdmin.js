import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { User } from '../models/User.js'

// Load environment variables
dotenv.config()

/**
 * Seed Default Administrator Script
 *
 * Usage:
 *   node scripts/seedAdmin.js
 *   OR
 *   npm run seed:admin
 *
 * Reads credentials from environment variables (.env):
 *   SEED_ADMIN_NAME
 *   SEED_ADMIN_EMAIL
 *   SEED_ADMIN_PASSWORD
 */
const seedAdmin = async () => {
  try {
    console.log('[Seed Admin] Initializing database connection...')
    await connectDB()

    const name = process.env.SEED_ADMIN_NAME || 'Admin User'
    const email = (process.env.SEED_ADMIN_EMAIL || 'admin@smartstock.com').trim().toLowerCase()
    const password = process.env.SEED_ADMIN_PASSWORD || 'admin123'

    // Check if an admin or user with this email already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      console.log(`[Seed Admin] User with email "${email}" already exists (Role: ${existingUser.role}).`)
      console.log('[Seed Admin] No changes made to existing user.')
    } else {
      // User.create triggers the userSchema pre('save') hook, securely hashing the password
      const newAdmin = await User.create({
        name,
        email,
        password,
        role: 'admin',
      })

      console.log('----------------------------------------------------')
      console.log('[Seed Admin] SUCCESS: Default Admin User Created!')
      console.log(`  ID:       ${newAdmin._id}`)
      console.log(`  Name:     ${newAdmin.name}`)
      console.log(`  Email:    ${newAdmin.email}`)
      console.log(`  Role:     ${newAdmin.role}`)
      console.log('----------------------------------------------------')
    }

    // Close MongoDB connection gracefully
    await mongoose.connection.close()
    console.log('[Seed Admin] Database connection closed.')
    process.exit(0)
  } catch (error) {
    console.error(`[Seed Admin Error]: ${error.message}`)
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close()
    }
    process.exit(1)
  }
}

seedAdmin()
