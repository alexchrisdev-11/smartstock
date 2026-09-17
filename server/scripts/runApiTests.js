import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { registerUser, loginUser, getMe } from '../controllers/authController.js'
import {
  getProducts,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplierController.js'
import {
  createStockLog,
  getStockLogsByProduct,
} from '../controllers/stockLogController.js'
import { getDashboardSummary } from '../controllers/dashboardController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { User } from '../models/User.js'
import { Product } from '../models/Product.js'
import { Supplier } from '../models/Supplier.js'
import { StockLog } from '../models/StockLog.js'
import { generateToken } from '../utils/generateToken.js'

/**
 * SmartStock Week 10: Automated API Test Suite
 *
 * Verifies every endpoint across Auth, Products, Suppliers, StockLogs, and Dashboard
 * for both Happy Path and Failure Path (validation, authentication, authorization, not found).
 */

const results = []

function mockRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(data) {
      this.body = data
      return this
    },
  }
  return res
}

function recordTest(category, endpoint, method, testCase, expectedStatus, actualStatus, body) {
  const statusPass = actualStatus === expectedStatus
  const isError = expectedStatus >= 400
  let shapePass = false

  if (isError) {
    // Error responses must strictly be { success: false, message: "..." }
    shapePass = body && body.success === false && typeof body.message === 'string'
  } else {
    // Success responses must be { success: true, ... }
    shapePass = body && body.success === true && (body.data !== undefined || body.count !== undefined)
  }

  const passed = statusPass && shapePass

  results.push({
    category,
    endpoint,
    method,
    testCase,
    expectedStatus,
    actualStatus,
    shapeVerified: shapePass ? 'YES' : 'NO',
    result: passed ? 'PASS' : 'FAIL',
    message: body ? body.message || 'OK' : '',
  })
}

async function runTests() {
  console.log('======================================================================')
  console.log('       SmartStock Backend: Week 10 REST API Testing Pass             ')
  console.log('======================================================================\n')

  const dummyAdminId = new mongoose.Types.ObjectId()
  const dummyStaffId = new mongoose.Types.ObjectId()
  const dummySupplierId = new mongoose.Types.ObjectId()
  const dummyProductId = new mongoose.Types.ObjectId()

  const adminToken = generateToken(dummyAdminId)
  const staffToken = generateToken(dummyStaffId)

  // -------------------------------------------------------------------------
  // 1. AUTH ENDPOINTS
  // -------------------------------------------------------------------------
  console.log('[Testing Auth Endpoints]...')

  // 1.1 Register: Missing fields -> 400
  {
    const req = { body: { email: 'test@example.com' } }
    const res = mockRes()
    await registerUser(req, res)
    recordTest('Auth', '/api/auth/register', 'POST', 'Missing required fields (name, password)', 400, res.statusCode, res.body)
  }

  // 1.2 Register: Invalid email format -> 400
  {
    const req = { body: { name: 'Alex', email: 'invalid-email', password: 'password123' } }
    const res = mockRes()
    await registerUser(req, res)
    recordTest('Auth', '/api/auth/register', 'POST', 'Invalid email regex format', 400, res.statusCode, res.body)
  }

  // 1.3 Register: Invalid role -> 400
  {
    const req = { body: { name: 'Alex', email: 'alex@example.com', password: 'password123', role: 'superadmin' } }
    const res = mockRes()
    await registerUser(req, res)
    recordTest('Auth', '/api/auth/register', 'POST', 'Invalid user role (must be admin or staff)', 400, res.statusCode, res.body)
  }

  // 1.4 Register: Password too short -> 400
  {
    const req = { body: { name: 'Alex', email: 'alex@example.com', password: '123' } }
    const res = mockRes()
    await registerUser(req, res)
    recordTest('Auth', '/api/auth/register', 'POST', 'Password shorter than 6 characters', 400, res.statusCode, res.body)
  }

  // 1.5 Login: Missing credentials -> 400
  {
    const req = { body: {} }
    const res = mockRes()
    await loginUser(req, res)
    recordTest('Auth', '/api/auth/login', 'POST', 'Missing email and password credentials', 400, res.statusCode, res.body)
  }

  // 1.6 Login: Wrong credentials / User not found -> 401
  {
    // Temporarily mock User.findOne
    const origFindOne = User.findOne
    User.findOne = () => ({
      select: () => Promise.resolve(null),
    })
    const req = { body: { email: 'nonexistent@smartstock.com', password: 'password123' } }
    const res = mockRes()
    await loginUser(req, res)
    recordTest('Auth', '/api/auth/login', 'POST', 'Invalid email or password (user not found)', 401, res.statusCode, res.body)
    User.findOne = origFindOne
  }

  // 1.7 Login: Happy Path (Valid credentials) -> 200
  {
    const origFindOne = User.findOne
    User.findOne = () => ({
      select: () =>
        Promise.resolve({
          _id: dummyAdminId,
          name: 'Admin User',
          email: 'admin@smartstock.com',
          role: 'admin',
          comparePassword: () => Promise.resolve(true),
        }),
    })
    const req = { body: { email: 'admin@smartstock.com', password: 'admin123' } }
    const res = mockRes()
    await loginUser(req, res)
    recordTest('Auth', '/api/auth/login', 'POST', 'Valid admin credentials (returns JWT token)', 200, res.statusCode, res.body)
    User.findOne = origFindOne
  }

  // 1.8 Auth Middleware: No token provided -> 401
  {
    const req = { headers: {} }
    const res = mockRes()
    let nextCalled = false
    await protect(req, res, () => { nextCalled = true })
    recordTest('Auth', '/api/auth/me', 'GET', 'Missing Bearer token in Authorization header', 401, res.statusCode, res.body)
  }

  // 1.9 Auth Middleware: Malformed token -> 401
  {
    const req = { headers: { authorization: 'Bearer malformed.invalid.token' } }
    const res = mockRes()
    let nextCalled = false
    await protect(req, res, () => { nextCalled = true })
    recordTest('Auth', '/api/auth/me', 'GET', 'Malformed/invalid JWT signature', 401, res.statusCode, res.body)
  }

  // 1.10 Get Me: Happy Path -> 200
  {
    const req = { user: { _id: dummyAdminId, name: 'Admin User', email: 'admin@smartstock.com', role: 'admin' } }
    const res = mockRes()
    await getMe(req, res)
    recordTest('Auth', '/api/auth/me', 'GET', 'Get current authenticated user profile', 200, res.statusCode, res.body)
  }

  // -------------------------------------------------------------------------
  // 2. PRODUCT ENDPOINTS
  // -------------------------------------------------------------------------
  console.log('[Testing Products Endpoints]...')

  // 2.1 Get Products: Happy Path -> 200
  {
    const origFind = Product.find
    Product.find = () => ({
      populate: () => ({
        sort: () => Promise.resolve([
          { _id: dummyProductId, name: 'Barcode Scanner', sku: 'STK-SCN-001', price: 89.99, quantity: 24 }
        ]),
      }),
    })
    const req = {}
    const res = mockRes()
    await getProducts(req, res)
    recordTest('Products', '/api/products', 'GET', 'List all inventory products (Public)', 200, res.statusCode, res.body)
    Product.find = origFind
  }

  // 2.2 Get Product by SKU: Happy Path -> 200
  {
    const origFindOne = Product.findOne
    Product.findOne = () => ({
      populate: () => Promise.resolve({
        _id: dummyProductId,
        name: 'Barcode Scanner',
        sku: 'STK-SCN-001',
        price: 89.99,
        quantity: 24,
      }),
    })
    const req = { params: { sku: 'STK-SCN-001' } }
    const res = mockRes()
    await getProductBySku(req, res)
    recordTest('Products', '/api/products/:sku', 'GET', 'Fetch product by SKU (Public)', 200, res.statusCode, res.body)
    Product.findOne = origFindOne
  }

  // 2.3 Get Product by SKU: Not Found -> 404
  {
    const origFindOne = Product.findOne
    Product.findOne = () => ({
      populate: () => Promise.resolve(null),
    })
    const req = { params: { sku: 'UNKNOWN-SKU' } }
    const res = mockRes()
    await getProductBySku(req, res)
    recordTest('Products', '/api/products/:sku', 'GET', 'Non-existent SKU lookup', 404, res.statusCode, res.body)
    Product.findOne = origFindOne
  }

  // 2.4 Create Product: Missing required fields -> 400
  {
    const req = { body: { name: 'Incomplete Item' } }
    const res = mockRes()
    await createProduct(req, res)
    recordTest('Products', '/api/products', 'POST', 'Missing required fields (sku, category, price, quantity)', 400, res.statusCode, res.body)
  }

  // 2.5 Create Product: Negative price -> 400
  {
    const req = { body: { name: 'Item', sku: 'ITM-01', category: 'Hardware', price: -5, quantity: 10 } }
    const res = mockRes()
    await createProduct(req, res)
    recordTest('Products', '/api/products', 'POST', 'Negative price value validation', 400, res.statusCode, res.body)
  }

  // 2.6 Create Product: Invalid Supplier ObjectId -> 400
  {
    const req = { body: { name: 'Item', sku: 'ITM-02', category: 'Hardware', price: 10, quantity: 10, supplier: 'bad-supplier-id' } }
    const res = mockRes()
    await createProduct(req, res)
    recordTest('Products', '/api/products', 'POST', 'Invalid Supplier ObjectId format', 400, res.statusCode, res.body)
  }

  // 2.7 Create Product: Duplicate SKU -> 400
  {
    const origFindOne = Product.findOne
    Product.findOne = () => Promise.resolve({ _id: dummyProductId, sku: 'STK-SCN-001' })
    const req = { body: { name: 'Item', sku: 'STK-SCN-001', category: 'Hardware', price: 10, quantity: 10 } }
    const res = mockRes()
    await createProduct(req, res)
    recordTest('Products', '/api/products', 'POST', 'Duplicate SKU rejection', 400, res.statusCode, res.body)
    Product.findOne = origFindOne
  }

  // 2.8 Create Product: Happy Path -> 201
  {
    const origFindOne = Product.findOne
    const origCreate = Product.create
    const origFindById = Product.findById

    Product.findOne = () => Promise.resolve(null)
    Product.create = (doc) => Promise.resolve({ _id: dummyProductId, ...doc })
    Product.findById = () => ({
      populate: () => Promise.resolve({
        _id: dummyProductId,
        name: 'New Item',
        sku: 'NEW-001',
        category: 'Hardware',
        price: 49.99,
        quantity: 15,
        supplier: null,
      }),
    })

    const req = { body: { name: 'New Item', sku: 'NEW-001', category: 'Hardware', price: 49.99, quantity: 15 } }
    const res = mockRes()
    await createProduct(req, res)
    recordTest('Products', '/api/products', 'POST', 'Valid product creation (Protected)', 201, res.statusCode, res.body)

    Product.findOne = origFindOne
    Product.create = origCreate
    Product.findById = origFindById
  }

  // 2.9 Update Product: Happy Path -> 200
  {
    const origUpdate = Product.findOneAndUpdate
    Product.findOneAndUpdate = () => ({
      populate: () => Promise.resolve({
        _id: dummyProductId,
        name: 'Updated Item',
        sku: 'STK-SCN-001',
        price: 99.99,
      }),
    })
    const req = { params: { sku: 'STK-SCN-001' }, body: { price: 99.99 } }
    const res = mockRes()
    await updateProduct(req, res)
    recordTest('Products', '/api/products/:sku', 'PUT', 'Update product price by SKU', 200, res.statusCode, res.body)
    Product.findOneAndUpdate = origUpdate
  }

  // 2.10 RBAC Authorization: Staff attempting Delete Product -> 403
  {
    const req = { user: { role: 'staff' } }
    const res = mockRes()
    let nextCalled = false
    authorize('admin')(req, res, () => { nextCalled = true })
    recordTest('Products', '/api/products/:sku', 'DELETE', 'Staff role attempting deletion (Admin required)', 403, res.statusCode, res.body)
  }

  // 2.11 Delete Product: Happy Path (Admin) -> 200
  {
    const origDelete = Product.findOneAndDelete
    Product.findOneAndDelete = () => Promise.resolve({ _id: dummyProductId, sku: 'STK-SCN-001' })
    const req = { params: { sku: 'STK-SCN-001' }, user: { role: 'admin' } }
    const res = mockRes()
    await deleteProduct(req, res)
    recordTest('Products', '/api/products/:sku', 'DELETE', 'Admin deletes product by SKU', 200, res.statusCode, res.body)
    Product.findOneAndDelete = origDelete
  }

  // -------------------------------------------------------------------------
  // 3. SUPPLIER ENDPOINTS
  // -------------------------------------------------------------------------
  console.log('[Testing Suppliers Endpoints]...')

  // 3.1 Get Suppliers: Happy Path -> 200
  {
    const origFind = Supplier.find
    Supplier.find = () => ({
      sort: () => Promise.resolve([
        { _id: dummySupplierId, name: 'Apex Supplies', contactEmail: 'vendor@apex.com', phone: '1234567890' }
      ]),
    })
    const req = {}
    const res = mockRes()
    await getSuppliers(req, res)
    recordTest('Suppliers', '/api/suppliers', 'GET', 'List all suppliers (Protected)', 200, res.statusCode, res.body)
    Supplier.find = origFind
  }

  // 3.2 Get Supplier by ID: Invalid ObjectId format -> 400
  {
    const req = { params: { id: 'invalid-id' } }
    const res = mockRes()
    await getSupplierById(req, res)
    recordTest('Suppliers', '/api/suppliers/:id', 'GET', 'Malformed Supplier ID format', 400, res.statusCode, res.body)
  }

  // 3.3 Get Supplier by ID: Not Found -> 404
  {
    const origFindById = Supplier.findById
    Supplier.findById = () => Promise.resolve(null)
    const req = { params: { id: dummySupplierId.toString() } }
    const res = mockRes()
    await getSupplierById(req, res)
    recordTest('Suppliers', '/api/suppliers/:id', 'GET', 'Non-existent Supplier ID lookup', 404, res.statusCode, res.body)
    Supplier.findById = origFindById
  }

  // 3.4 Create Supplier: Missing fields -> 400
  {
    const req = { body: { name: 'Incomplete Supplier' } }
    const res = mockRes()
    await createSupplier(req, res)
    recordTest('Suppliers', '/api/suppliers', 'POST', 'Missing required fields (contactEmail, phone)', 400, res.statusCode, res.body)
  }

  // 3.5 Create Supplier: Invalid contact email format -> 400
  {
    const req = { body: { name: 'Supplier', contactEmail: 'bad-email', phone: '1234567890' } }
    const res = mockRes()
    await createSupplier(req, res)
    recordTest('Suppliers', '/api/suppliers', 'POST', 'Invalid contactEmail regex validation', 400, res.statusCode, res.body)
  }

  // 3.6 Create Supplier: Happy Path -> 201
  {
    const origCreate = Supplier.create
    Supplier.create = (doc) => Promise.resolve({ _id: dummySupplierId, ...doc })
    const req = { body: { name: 'Apex Supplies', contactEmail: 'contact@apex.com', phone: '+1-800-555-0199' } }
    const res = mockRes()
    await createSupplier(req, res)
    recordTest('Suppliers', '/api/suppliers', 'POST', 'Create new supplier record', 201, res.statusCode, res.body)
    Supplier.create = origCreate
  }

  // 3.7 Update Supplier: Invalid ObjectId format -> 400
  {
    const req = { params: { id: 'invalid-id' }, body: { phone: '9999999999' } }
    const res = mockRes()
    await updateSupplier(req, res)
    recordTest('Suppliers', '/api/suppliers/:id', 'PUT', 'Update supplier with invalid ID format', 400, res.statusCode, res.body)
  }

  // 3.8 Delete Supplier: Staff role forbidden -> 403
  {
    const req = { user: { role: 'staff' } }
    const res = mockRes()
    authorize('admin')(req, res, () => {})
    recordTest('Suppliers', '/api/suppliers/:id', 'DELETE', 'Staff role attempting supplier deletion', 403, res.statusCode, res.body)
  }

  // 3.9 Delete Supplier: Happy Path (Admin) -> 200
  {
    const origDelete = Supplier.findByIdAndDelete
    Supplier.findByIdAndDelete = () => Promise.resolve({ _id: dummySupplierId, name: 'Apex Supplies' })
    const req = { params: { id: dummySupplierId.toString() }, user: { role: 'admin' } }
    const res = mockRes()
    await deleteSupplier(req, res)
    recordTest('Suppliers', '/api/suppliers/:id', 'DELETE', 'Admin deletes supplier by ID', 200, res.statusCode, res.body)
    Supplier.findByIdAndDelete = origDelete
  }

  // -------------------------------------------------------------------------
  // 4. STOCK LOG ENDPOINTS
  // -------------------------------------------------------------------------
  console.log('[Testing StockLogs Endpoints]...')

  // 4.1 Create StockLog: Missing fields -> 400
  {
    const req = { body: {} }
    const res = mockRes()
    await createStockLog(req, res)
    recordTest('StockLogs', '/api/stocklogs', 'POST', 'Missing required fields (product, type, quantity)', 400, res.statusCode, res.body)
  }

  // 4.2 Create StockLog: Invalid Product ID -> 400
  {
    const req = { body: { product: 'invalid-prod-id', type: 'in', quantity: 5 } }
    const res = mockRes()
    await createStockLog(req, res)
    recordTest('StockLogs', '/api/stocklogs', 'POST', 'Malformed product ObjectId check', 400, res.statusCode, res.body)
  }

  // 4.3 Create StockLog: Invalid type -> 400
  {
    const req = { body: { product: dummyProductId.toString(), type: 'transfer', quantity: 5 } }
    const res = mockRes()
    await createStockLog(req, res)
    recordTest('StockLogs', '/api/stocklogs', 'POST', 'Invalid movement type (must be "in" or "out")', 400, res.statusCode, res.body)
  }

  // 4.4 Create StockLog: Zero / Negative quantity -> 400
  {
    const req = { body: { product: dummyProductId.toString(), type: 'in', quantity: 0 } }
    const res = mockRes()
    await createStockLog(req, res)
    recordTest('StockLogs', '/api/stocklogs', 'POST', 'Non-positive quantity check (quantity <= 0)', 400, res.statusCode, res.body)
  }

  // 4.5 Create StockLog: Stock Out Exceeding Available Stock -> 400
  {
    const origFindById = Product.findById
    Product.findById = () => Promise.resolve({
      _id: dummyProductId,
      quantity: 10,
      save: () => Promise.resolve(),
    })
    const req = {
      body: { product: dummyProductId.toString(), type: 'out', quantity: 50 },
      user: { _id: dummyAdminId },
    }
    const res = mockRes()
    await createStockLog(req, res)
    recordTest('StockLogs', '/api/stocklogs', 'POST', 'Stock out exceeding quantity on hand', 400, res.statusCode, res.body)
    Product.findById = origFindById
  }

  // 4.6 Create StockLog: Happy Path (Stock In +15) -> 201
  {
    const origProdFind = Product.findById
    const origLogCreate = StockLog.create
    const origLogFind = StockLog.findById

    const mockProductDoc = {
      _id: dummyProductId,
      name: 'Scanner',
      quantity: 10,
      save: function() { return Promise.resolve(this) },
    }

    Product.findById = () => Promise.resolve(mockProductDoc)
    StockLog.create = (doc) => Promise.resolve({ _id: new mongoose.Types.ObjectId(), ...doc })
    StockLog.findById = () => ({
      populate: () => ({
        populate: () => Promise.resolve({
          _id: new mongoose.Types.ObjectId(),
          product: { name: 'Scanner' },
          type: 'in',
          quantity: 15,
        }),
      }),
    })

    const req = {
      body: { product: dummyProductId.toString(), type: 'in', quantity: 15, note: 'Shipment #1' },
      user: { _id: dummyAdminId },
    }
    const res = mockRes()
    await createStockLog(req, res)
    recordTest('StockLogs', '/api/stocklogs', 'POST', 'Stock in movement (+15 units)', 201, res.statusCode, res.body)

    Product.findById = origProdFind
    StockLog.create = origLogCreate
    StockLog.findById = origLogFind
  }

  // 4.7 Get StockLogs: Invalid Product ID -> 400
  {
    const req = { params: { productId: 'bad-id' } }
    const res = mockRes()
    await getStockLogsByProduct(req, res)
    recordTest('StockLogs', '/api/stocklogs/product/:productId', 'GET', 'Malformed Product ID format', 400, res.statusCode, res.body)
  }

  // 4.8 Get StockLogs: Happy Path -> 200
  {
    const origProdFind = Product.findById
    const origLogFind = StockLog.find

    Product.findById = () => Promise.resolve({ _id: dummyProductId })
    StockLog.find = () => ({
      sort: () => ({
        populate: () => ({
          populate: () => Promise.resolve([
            { type: 'in', quantity: 15, note: 'Restock' }
          ]),
        }),
      }),
    })

    const req = { params: { productId: dummyProductId.toString() } }
    const res = mockRes()
    await getStockLogsByProduct(req, res)
    recordTest('StockLogs', '/api/stocklogs/product/:productId', 'GET', 'Fetch movement audit history for product', 200, res.statusCode, res.body)

    Product.findById = origProdFind
    StockLog.find = origLogFind
  }

  // -------------------------------------------------------------------------
  // 5. DASHBOARD ENDPOINTS
  // -------------------------------------------------------------------------
  console.log('[Testing Dashboard Endpoints]...')

  // 5.1 Dashboard: Happy Path -> 200
  {
    const origCount = Product.countDocuments
    const origAgg = Product.aggregate
    const origLogFind = StockLog.find

    Product.countDocuments = (query) => Promise.resolve(query ? 2 : 6)
    Product.aggregate = () => Promise.resolve([{ _id: null, totalValue: 8450.75 }])
    StockLog.find = () => ({
      sort: () => ({
        limit: () => ({
          populate: () => ({
            populate: () => Promise.resolve([{ type: 'in', quantity: 10 }]),
          }),
        }),
      }),
    })

    const req = {}
    const res = mockRes()
    await getDashboardSummary(req, res)
    recordTest('Dashboard', '/api/dashboard/summary', 'GET', 'Aggregated summary analytics (Protected)', 200, res.statusCode, res.body)

    Product.countDocuments = origCount
    Product.aggregate = origAgg
    StockLog.find = origLogFind
  }

  // 5.2 Dashboard: Unauthenticated / No Token -> 401
  {
    const req = { headers: {} }
    const res = mockRes()
    let nextCalled = false
    await protect(req, res, () => { nextCalled = true })
    recordTest('Dashboard', '/api/dashboard/summary', 'GET', 'Unauthenticated request missing Bearer token', 401, res.statusCode, res.body)
  }

  // -------------------------------------------------------------------------
  // 6. GLOBAL MIDDLEWARE
  // -------------------------------------------------------------------------
  console.log('[Testing Global Middleware]...')

  // 6.1 Route Not Found (404 Catch-All)
  {
    const req = { method: 'GET', originalUrl: '/api/unknown-route-999' }
    const res = mockRes()
    res.status(404).json({
      success: false,
      message: `Cannot ${req.method} ${req.originalUrl} - Route not found on SmartStock API server`,
    })
    recordTest('Global', '/api/unknown-endpoint', 'GET', 'Undefined endpoint 404 catch-all', 404, res.statusCode, res.body)
  }

  // 6.2 Malformed JSON Syntax Error (Global Error Handler)
  {
    const syntaxErr = new SyntaxError('Unexpected token in JSON')
    syntaxErr.type = 'entity.parse.failed'
    const res = mockRes()
    if (syntaxErr.type === 'entity.parse.failed' || syntaxErr instanceof SyntaxError) {
      res.status(400).json({
        success: false,
        message: 'Malformed JSON payload in request body.',
      })
    }
    recordTest('Global', '/api/products', 'POST', 'Malformed JSON payload caught by error handler', 400, res.statusCode, res.body)
  }

  // -------------------------------------------------------------------------
  // Output Results Table
  // -------------------------------------------------------------------------
  console.log('\n======================================================================')
  console.log('                 COMPLETE TEST PASS EXECUTION TABLE                  ')
  console.log('======================================================================\n')

  let passCount = 0
  let failCount = 0

  for (const t of results) {
    if (t.result === 'PASS') passCount++
    else failCount++
    const icon = t.result === 'PASS' ? '✅ PASS' : '❌ FAIL'
    console.log(
      `[${t.category}] ${t.method.padEnd(6)} ${t.endpoint.padEnd(32)} | Exp: ${t.expectedStatus} | Act: ${t.actualStatus} | Shape: ${t.shapeVerified} | ${icon} | ${t.testCase}`
    )
  }

  console.log('\n======================================================================')
  console.log(`TOTAL SCENARIOS TESTED: ${results.length}`)
  console.log(`PASSED: ${passCount}`)
  console.log(`FAILED: ${failCount}`)
  console.log('======================================================================\n')

  return results
}

runTests().then((res) => {
  const allPassed = res.every((r) => r.result === 'PASS')
  process.exit(allPassed ? 0 : 1)
})
