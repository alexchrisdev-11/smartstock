import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'
import { Product } from '../models/Product.js'
import { Supplier } from '../models/Supplier.js'
import { StockLog } from '../models/StockLog.js'

class QueryBuilder {
  constructor(dataPromise) {
    this.promise = Promise.resolve(dataPromise)
  }
  populate() { return this }
  select() { return this }
  sort(sortObj) {
    this.promise = this.promise.then(items => {
      if (!Array.isArray(items)) return items
      const copy = [...items]
      const key = Object.keys(sortObj || {})[0]
      if (!key) return copy
      const dir = sortObj[key]
      return copy.sort((a, b) => (a[key] < b[key] ? (dir === 1 ? -1 : 1) : (a[key] > b[key] ? (dir === 1 ? 1 : -1) : 0)))
    })
    return this
  }
  limit(num) {
    this.promise = this.promise.then(items => (Array.isArray(items) ? items.slice(0, num) : items))
    return this
  }
  then(resolve, reject) { return this.promise.then(resolve, reject) }
  catch(reject) { return this.promise.catch(reject) }
}

export async function initMockStore() {
  const adminId = new mongoose.Types.ObjectId()
  const staffId = new mongoose.Types.ObjectId()
  const supApexId = new mongoose.Types.ObjectId()
  const supGlobalId = new mongoose.Types.ObjectId()

  const adminHash = await bcrypt.hash('admin123', 10)
  const staffHash = await bcrypt.hash('staff123', 10)

  const users = [
    {
      _id: adminId,
      name: 'Admin User',
      email: 'admin@smartstock.com',
      password: adminHash,
      role: 'admin',
      createdAt: new Date('2026-07-01T08:00:00Z'),
      async comparePassword(pwd) {
        if (pwd === 'admin123') return true
        return bcrypt.compare(pwd, this.password)
      },
      save() { return Promise.resolve(this) }
    },
    {
      _id: staffId,
      name: 'Staff User',
      email: 'staff@smartstock.com',
      password: staffHash,
      role: 'staff',
      createdAt: new Date('2026-07-01T08:00:00Z'),
      async comparePassword(pwd) {
        if (pwd === 'staff123') return true
        return bcrypt.compare(pwd, this.password)
      },
      save() { return Promise.resolve(this) }
    }
  ]

  const suppliers = [
    {
      _id: supApexId,
      name: 'Apex Barcode Solutions',
      contactEmail: 'orders@apexbarcode.com',
      phone: '+1-555-0199',
      address: '45 Tech Blvd, Austin, TX 78701',
      createdAt: new Date('2026-07-05T09:00:00Z')
    },
    {
      _id: supGlobalId,
      name: 'Global Logistics & Freight Corp',
      contactEmail: 'contact@globallogistics.com',
      phone: '+1-555-0822',
      address: '100 Freight Way, Chicago, IL 60607',
      createdAt: new Date('2026-07-05T09:00:00Z')
    }
  ]

  const p1Id = new mongoose.Types.ObjectId()
  const p2Id = new mongoose.Types.ObjectId()
  const p3Id = new mongoose.Types.ObjectId()
  const p4Id = new mongoose.Types.ObjectId()
  const p5Id = new mongoose.Types.ObjectId()
  const p6Id = new mongoose.Types.ObjectId()
  const p7Id = new mongoose.Types.ObjectId()

  const products = [
    {
      _id: p1Id,
      name: 'Wireless Barcode Scanner',
      sku: 'STK-SCN-001',
      category: 'Hardware',
      price: 89.99,
      quantity: 24,
      lowStockThreshold: 10,
      supplier: suppliers[0],
      createdAt: new Date('2026-07-10T10:00:00Z'),
      save() { return Promise.resolve(this) }
    },
    {
      _id: p2Id,
      name: 'Thermal Receipt Paper (50pk)',
      sku: 'STK-PPR-002',
      category: 'Supplies',
      price: 34.50,
      quantity: 8,
      lowStockThreshold: 15,
      supplier: suppliers[1],
      createdAt: new Date('2026-07-10T10:00:00Z'),
      save() { return Promise.resolve(this) }
    },
    {
      _id: p3Id,
      name: 'Direct Thermal Label Printer',
      sku: 'STK-PRN-003',
      category: 'Hardware',
      price: 199.99,
      quantity: 12,
      lowStockThreshold: 5,
      supplier: suppliers[0],
      createdAt: new Date('2026-07-10T10:00:00Z'),
      save() { return Promise.resolve(this) }
    },
    {
      _id: p4Id,
      name: 'Heavy Duty Packing Tape (6pk)',
      sku: 'STK-TPE-004',
      category: 'Packaging',
      price: 18.25,
      quantity: 60,
      lowStockThreshold: 20,
      supplier: suppliers[1],
      createdAt: new Date('2026-07-10T10:00:00Z'),
      save() { return Promise.resolve(this) }
    },
    {
      _id: p5Id,
      name: 'Corrugated Shipping Boxes (25pk)',
      sku: 'STK-BOX-005',
      category: 'Packaging',
      price: 45.00,
      quantity: 3,
      lowStockThreshold: 10,
      supplier: suppliers[1],
      createdAt: new Date('2026-07-10T10:00:00Z'),
      save() { return Promise.resolve(this) }
    },
    {
      _id: p6Id,
      name: 'Electronic Digital Postal Scale',
      sku: 'STK-SCL-006',
      category: 'Hardware',
      price: 74.95,
      quantity: 15,
      lowStockThreshold: 8,
      supplier: suppliers[0],
      createdAt: new Date('2026-07-10T10:00:00Z'),
      save() { return Promise.resolve(this) }
    },
    {
      _id: p7Id,
      name: 'Industrial Pallet Stretch Wrap',
      sku: 'STK-WRP-007',
      category: 'Packaging',
      price: 28.50,
      quantity: 35,
      lowStockThreshold: 12,
      supplier: suppliers[1],
      createdAt: new Date('2026-07-10T10:00:00Z'),
      save() { return Promise.resolve(this) }
    }
  ]

  const stocklogs = [
    {
      _id: new mongoose.Types.ObjectId(),
      product: { _id: p1Id, name: products[0].name, sku: products[0].sku, price: products[0].price },
      type: 'in',
      quantity: 10,
      note: 'Routine supplier restock intake',
      date: new Date('2026-09-17T10:00:00Z'),
      performedBy: { _id: adminId, name: users[0].name, email: users[0].email, role: users[0].role },
      createdAt: new Date('2026-09-17T10:00:00Z')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product: { _id: p2Id, name: products[1].name, sku: products[1].sku, price: products[1].price },
      type: 'out',
      quantity: 4,
      note: 'Dispatched to retail checkout lanes',
      date: new Date('2026-09-17T11:30:00Z'),
      performedBy: { _id: staffId, name: users[1].name, email: users[1].email, role: users[1].role },
      createdAt: new Date('2026-09-17T11:30:00Z')
    }
  ]

  User.findOne = (query) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const email = query?.email?.toLowerCase?.()
        const match = users.find(u => u.email.toLowerCase() === email)
        resolve(match ? { ...match, comparePassword: match.comparePassword } : null)
      })
    )
  }

  User.findById = (id) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const match = users.find(u => u._id.toString() === id?.toString?.())
        resolve(match ? { ...match, comparePassword: match.comparePassword } : null)
      })
    )
  }

  User.create = async (userData) => {
    const hash = await bcrypt.hash(userData.password, 10)
    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      ...userData,
      password: hash,
      createdAt: new Date(),
      comparePassword(pwd) { return bcrypt.compare(pwd, this.password) },
      save() { return Promise.resolve(this) }
    }
    users.push(newUser)
    return newUser
  }

  Product.find = () => new QueryBuilder([...products])

  Product.findOne = (query) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const sku = query?.sku?.toUpperCase?.()
        const match = products.find(p => p.sku.toUpperCase() === sku)
        resolve(match || null)
      })
    )
  }

  Product.findById = (id) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const match = products.find(p => p._id.toString() === id?.toString?.())
        resolve(match || null)
      })
    )
  }

  Product.create = async (data) => {
    const sup = suppliers.find(s => s._id.toString() === data.supplier?.toString?.()) || null
    const newProduct = {
      _id: new mongoose.Types.ObjectId(),
      ...data,
      supplier: sup,
      createdAt: new Date(),
      save() { return Promise.resolve(this) }
    }
    products.unshift(newProduct)
    return newProduct
  }

  Product.findOneAndUpdate = (query, updateData) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const sku = query?.sku?.toUpperCase?.()
        const idx = products.findIndex(p => p.sku.toUpperCase() === sku)
        if (idx === -1) return resolve(null)
        products[idx] = { ...products[idx], ...updateData }
        resolve(products[idx])
      })
    )
  }

  Product.findOneAndDelete = (query) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const sku = query?.sku?.toUpperCase?.()
        const idx = products.findIndex(p => p.sku.toUpperCase() === sku)
        if (idx === -1) return resolve(null)
        const removed = products.splice(idx, 1)[0]
        resolve(removed)
      })
    )
  }

  Product.countDocuments = (filter) => {
    if (filter && filter['$expr']) {
      const lowCount = products.filter(p => p.quantity <= p.lowStockThreshold).length
      return Promise.resolve(lowCount)
    }
    return Promise.resolve(products.length)
  }

  Product.aggregate = () => {
    const totalVal = products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
    return Promise.resolve([{ _id: null, totalValue: totalVal }])
  }

  Supplier.find = () => new QueryBuilder([...suppliers])

  Supplier.findById = (id) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const match = suppliers.find(s => s._id.toString() === id?.toString?.())
        resolve(match || null)
      })
    )
  }

  Supplier.create = async (data) => {
    const newSup = { _id: new mongoose.Types.ObjectId(), ...data, createdAt: new Date() }
    suppliers.push(newSup)
    return newSup
  }

  Supplier.findByIdAndUpdate = (id, data) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const idx = suppliers.findIndex(s => s._id.toString() === id?.toString?.())
        if (idx === -1) return resolve(null)
        suppliers[idx] = { ...suppliers[idx], ...data }
        resolve(suppliers[idx])
      })
    )
  }

  Supplier.findByIdAndDelete = (id) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const idx = suppliers.findIndex(s => s._id.toString() === id?.toString?.())
        if (idx === -1) return resolve(null)
        const removed = suppliers.splice(idx, 1)[0]
        resolve(removed)
      })
    )
  }

  StockLog.create = async (data) => {
    const prod = products.find(p => p._id.toString() === data.product?.toString?.())
    const usr = users.find(u => u._id.toString() === data.performedBy?.toString?.())
    const newLog = {
      _id: new mongoose.Types.ObjectId(),
      ...data,
      product: prod ? { _id: prod._id, name: prod.name, sku: prod.sku, price: prod.price } : data.product,
      performedBy: usr ? { _id: usr._id, name: usr.name, email: usr.email, role: usr.role } : data.performedBy,
      createdAt: new Date()
    }
    stocklogs.unshift(newLog)
    return newLog
  }

  StockLog.findById = (id) => {
    return new QueryBuilder(
      new Promise(resolve => {
        const match = stocklogs.find(l => l._id.toString() === id?.toString?.())
        resolve(match || null)
      })
    )
  }

  StockLog.find = (query) => {
    let filtered = [...stocklogs]
    if (query?.product) {
      filtered = filtered.filter(l => l.product?._id?.toString?.() === query.product.toString() || l.product?.toString?.() === query.product.toString())
    }
    return new QueryBuilder(filtered)
  }
}
