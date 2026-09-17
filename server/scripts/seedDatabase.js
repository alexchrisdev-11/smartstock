import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { User } from '../models/User.js'
import { Product } from '../models/Product.js'
import { Supplier } from '../models/Supplier.js'
import { StockLog } from '../models/StockLog.js'

// Load environment variables
dotenv.config()

/**
 * Turnkey Database Seeder Script (Week 12 Final Polish)
 *
 * Seeds a complete, realistic demonstration environment:
 * - Admin and Staff accounts (admin@smartstock.com, staff@smartstock.com)
 * - Verified suppliers with contact details
 * - Catalog inventory items (including low-stock alert triggers)
 * - Historical StockLog audit trail entries
 *
 * Usage:
 *   node scripts/seedDatabase.js
 *   OR
 *   npm run seed
 */
const seedDatabase = async () => {
  try {
    console.log('====================================================')
    console.log('       SmartStock: Turnkey Database Seeder          ')
    console.log('====================================================')
    console.log('[Seeder] Connecting to MongoDB...')
    await connectDB()

    // 1. Clean existing records for a fresh turnkey state
    console.log('[Seeder] Cleaning existing test collections...')
    await User.deleteMany({})
    await Product.deleteMany({})
    await Supplier.deleteMany({})
    await StockLog.deleteMany({})
    console.log('[Seeder] Collections purged successfully.')

    // 2. Seed Users
    console.log('[Seeder] Creating authenticated demo users...')
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@smartstock.com',
      password: 'Password123',
      role: 'admin',
    })

    const staffUser = await User.create({
      name: 'Staff User',
      email: 'staff@smartstock.com',
      password: 'Password123',
      role: 'staff',
    })
    console.log(`✓ Admin User created: ${adminUser.email} (Role: admin)`)
    console.log(`✓ Staff User created: ${staffUser.email} (Role: staff)`)

    // 3. Seed Suppliers
    console.log('[Seeder] Creating vendor suppliers...')
    const supplierApex = await Supplier.create({
      name: 'Apex Barcode Solutions',
      contactEmail: 'orders@apexbarcode.com',
      phone: '+1-555-0199',
      address: '45 Tech Blvd, Austin, TX 78701',
    })

    const supplierGlobal = await Supplier.create({
      name: 'Global Logistics & Freight Corp',
      contactEmail: 'contact@globallogistics.com',
      phone: '+1-555-0822',
      address: '100 Freight Way, Chicago, IL 60607',
    })
    console.log(`✓ Supplier created: ${supplierApex.name}`)
    console.log(`✓ Supplier created: ${supplierGlobal.name}`)

    // 4. Seed Products
    console.log('[Seeder] Creating warehouse inventory products...')
    const productsData = [
      {
        name: 'Wireless Barcode Scanner',
        sku: 'STK-SCN-001',
        category: 'Hardware',
        price: 89.99,
        quantity: 24,
        lowStockThreshold: 10,
        supplier: supplierApex._id,
      },
      {
        name: 'Thermal Receipt Paper (50pk)',
        sku: 'STK-PPR-002',
        category: 'Supplies',
        price: 34.5,
        quantity: 8,
        lowStockThreshold: 15, // Low stock trigger!
        supplier: supplierGlobal._id,
      },
      {
        name: 'Direct Thermal Label Printer',
        sku: 'STK-PRN-004',
        category: 'Hardware',
        price: 199.95,
        quantity: 4,
        lowStockThreshold: 5, // Low stock trigger!
        supplier: supplierApex._id,
      },
      {
        name: 'Heavy Duty Industrial Shelving',
        sku: 'SHL-HD-990',
        category: 'Storage',
        price: 249.0,
        quantity: 15,
        lowStockThreshold: 5,
        supplier: supplierGlobal._id,
      },
      {
        name: 'Anti-Impact Safety Goggles (Pack)',
        sku: 'SAF-GGL-008',
        category: 'Safety',
        price: 15.99,
        quantity: 50,
        lowStockThreshold: 20,
        supplier: supplierGlobal._id,
      },
      {
        name: 'High-Density Polyethylene Pallet',
        sku: 'PLT-HD-900',
        category: 'Storage',
        price: 45.0,
        quantity: 3,
        lowStockThreshold: 10, // Low stock trigger!
        supplier: supplierGlobal._id,
      },
      {
        name: 'Heavy-Duty Strapping Tape (24pk)',
        sku: 'STP-TPE-012',
        category: 'Supplies',
        price: 28.5,
        quantity: 35,
        lowStockThreshold: 12,
        supplier: supplierGlobal._id,
      },
    ]

    const seededProducts = await Product.insertMany(productsData)
    console.log(`✓ Seeded ${seededProducts.length} catalog products.`)

    // 5. Seed Historical StockLogs (Audit Trail)
    console.log('[Seeder] Creating realistic stock movement audit logs...')
    const scanner = seededProducts.find((p) => p.sku === 'STK-SCN-001')
    const paper = seededProducts.find((p) => p.sku === 'STK-PPR-002')
    const printer = seededProducts.find((p) => p.sku === 'STK-PRN-004')
    const shelving = seededProducts.find((p) => p.sku === 'SHL-HD-990')

    const stockLogsData = [
      {
        product: scanner._id,
        type: 'in',
        quantity: 15,
        note: 'Restock shipment PO-782 from Apex',
        date: new Date(Date.now() - 3600 * 1000 * 4), // 4 hours ago
        performedBy: adminUser._id,
      },
      {
        product: paper._id,
        type: 'out',
        quantity: 4,
        note: 'Dispatched to retail fulfillment packing station',
        date: new Date(Date.now() - 3600 * 1000 * 3), // 3 hours ago
        performedBy: staffUser._id,
      },
      {
        product: printer._id,
        type: 'in',
        quantity: 2,
        note: 'New hardware unit delivery',
        date: new Date(Date.now() - 3600 * 1000 * 2), // 2 hours ago
        performedBy: adminUser._id,
      },
      {
        product: shelving._id,
        type: 'in',
        quantity: 5,
        note: 'Warehouse expansion bay 4 allocation',
        date: new Date(Date.now() - 3600 * 1000 * 1), // 1 hour ago
        performedBy: adminUser._id,
      },
      {
        product: scanner._id,
        type: 'out',
        quantity: 1,
        note: 'Barcode scanner damaged during transit, written off',
        date: new Date(Date.now() - 1800 * 1000), // 30 mins ago
        performedBy: staffUser._id,
      },
    ]

    await StockLog.insertMany(stockLogsData)
    console.log(`✓ Seeded ${stockLogsData.length} stock movement audit entries.`)

    console.log('====================================================')
    console.log('     TURNKEY SEEDING COMPLETE — READY FOR DEMO!     ')
    console.log('====================================================')
    console.log('Demo Credentials:')
    console.log('  Admin: admin@smartstock.com / Password123')
    console.log('  Staff: staff@smartstock.com / Password123')
    console.log('====================================================')

    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`)
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close()
    }
    process.exit(1)
  }
}

seedDatabase()
