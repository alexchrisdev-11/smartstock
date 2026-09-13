import mongoose from 'mongoose'

/**
 * Product Schema
 *
 * Defines the schema and validation constraints for products in the SmartStock system.
 *
 * Why SKU has `unique: true` and what happens upon inserting a duplicate:
 * 1. Business Logic: In retail and warehousing, the SKU (Stock Keeping Unit) is the primary
 *    external identifier used by barcode scanners, suppliers, and managers. No two physical
 *    items can share the same SKU code without causing inventory reconciliation chaos.
 * 2. Database Index: Setting `unique: true` instructs MongoDB to construct a unique B-Tree index
 *    on the `sku` collection field at the database level.
 * 3. Duplicate Handling: If an API client attempts to insert a second product with an existing SKU,
 *    MongoDB aborts the transaction and throws error code 11000 (`E11000 duplicate key error`).
 *    Our controller catches this error and responds with an explicit 400 Bad Request message.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'Product SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
      min: [0, 'Threshold cannot be negative'],
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  },
)

/**
 * Data Integrity & Population Notes:
 *
 * 1. Why `supplier` is optional on Product, but `performedBy` is required on StockLog:
 *    - Domain Modeling: A product can be cataloged or created as an initial concept before a vendor
 *      contract or supplier relationship is assigned. Forcing `supplier` to be required would block
 *      users from entering newly designed SKUs into the system.
 *    - Auditability: In contrast, a StockLog is an immutable audit trail entry representing a physical
 *      transfer of goods (stock in or stock out). Omitting `performedBy` would create an untraceable
 *      inventory discrepancy. Knowing *who* authorized or executed the stock change is mandatory
 *      for operational accountability and theft prevention.
 *
 * 2. How `.populate()` replaces an ObjectId with the referenced document:
 *    - In MongoDB, referencing another document stores a 24-character hexadecimal ObjectId (e.g. "65e2...").
 *    - Calling `.populate('supplier')` instructs Mongoose to automatically query the `suppliers` collection
 *      in the background using an efficient `$in` query matching all referenced IDs.
 *    - It replaces the scalar ObjectId with the full Supplier document `{ _id, name, contactEmail, phone, address }`.
 *    - This eliminates the "N+1 query problem" on the frontend, avoiding tens of separate HTTP requests
 *      to fetch each product's supplier individually.
 */

export const Product = mongoose.model('Product', productSchema)
export default Product
