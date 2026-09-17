import mongoose from 'mongoose'
import { Product } from '../models/Product.js'

/**
 * Separation of Concerns (Routes vs. Controllers):
 * - Routes (`routes/productRoutes.js`) act as the traffic controller: their sole responsibility
 *   is matching HTTP methods (GET, POST, PUT, DELETE) and URL endpoints to their target functions.
 * - Controllers (`controllers/productController.js`) contain the actual domain business logic:
 *   parsing request payloads, validating inputs, executing database queries, handling errors,
 *   and constructing appropriate HTTP responses.
 * - This separation ensures cleaner code, facilitates unit testing, and prevents monolithic files.
 */

/**
 * @desc    Fetch all inventory products
 * @route   GET /api/products
 * @access  Public (in Week 7)
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('supplier')
      .sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    })
  } catch (error) {
    console.error(`[Controller Error - getProducts]: ${error.message}`)
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve products.',
    })
  }
}

/**
 * @desc    Fetch single product by SKU
 * @route   GET /api/products/:sku
 * @access  Public
 */
export const getProductBySku = async (req, res) => {
  try {
    const sku = (req.params.sku || '').toUpperCase()
    const product = await Product.findOne({ sku }).populate('supplier')

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with SKU "${sku}" not found.`,
      })
    }

    res.status(200).json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error(`[Controller Error - getProductBySku]: ${error.message}`)
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve product.',
    })
  }
}

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public (in Week 7)
 */
export const createProduct = async (req, res) => {
  try {
    const { name, sku, category, price, quantity, lowStockThreshold, supplier } = req.body

    // Input Validation: Check for required fields
    if (!name || !sku || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, sku, category, price, and quantity.',
      })
    }

    const numPrice = Number(price)
    if (isNaN(numPrice) || numPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a non-negative number.',
      })
    }

    const numQuantity = Number(quantity)
    if (isNaN(numQuantity) || numQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a non-negative number.',
      })
    }

    let parsedThreshold = 5
    if (lowStockThreshold !== undefined) {
      const numThreshold = Number(lowStockThreshold)
      if (isNaN(numThreshold) || numThreshold < 0) {
        return res.status(400).json({
          success: false,
          message: 'Low stock threshold must be a non-negative number.',
        })
      }
      parsedThreshold = numThreshold
    }

    if (supplier && supplier !== '' && !mongoose.Types.ObjectId.isValid(supplier)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Supplier ID format.',
      })
    }

    const formattedSku = sku.trim().toUpperCase()

    // Pre-check for duplicate SKU to return a clean user message
    const existingProduct = await Product.findOne({ sku: formattedSku })
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: `A product with SKU "${formattedSku}" already exists. SKU must be unique.`,
      })
    }

    // Create and save new product record
    const newProduct = await Product.create({
      name: name.trim(),
      sku: formattedSku,
      category: category.trim(),
      price: numPrice,
      quantity: numQuantity,
      lowStockThreshold: parsedThreshold,
      supplier: supplier && supplier !== '' ? supplier : null,
    })

    const populatedProduct = await Product.findById(newProduct._id).populate('supplier')

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: populatedProduct,
    })
  } catch (error) {
    console.error(`[Controller Error - createProduct]: ${error.message}`)

    // Handle MongoDB duplicate key error code 11000
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate key error: A product with this SKU already exists.',
      })
    }

    // Handle Mongoose schema validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: 'Server error: Unable to create product.',
    })
  }
}

/**
 * @desc    Update an existing product by SKU
 * @route   PUT /api/products/:sku
 * @access  Private (Requires login)
 */
export const updateProduct = async (req, res) => {
  try {
    const sku = (req.params.sku || '').toUpperCase()

    const updateData = { ...req.body }
    if (updateData.sku) {
      updateData.sku = updateData.sku.trim().toUpperCase()
    }

    if (updateData.price !== undefined) {
      const numPrice = Number(updateData.price)
      if (isNaN(numPrice) || numPrice < 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be a non-negative number.',
        })
      }
      updateData.price = numPrice
    }

    if (updateData.quantity !== undefined) {
      const numQuantity = Number(updateData.quantity)
      if (isNaN(numQuantity) || numQuantity < 0) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be a non-negative number.',
        })
      }
      updateData.quantity = numQuantity
    }

    if (updateData.lowStockThreshold !== undefined) {
      const numThreshold = Number(updateData.lowStockThreshold)
      if (isNaN(numThreshold) || numThreshold < 0) {
        return res.status(400).json({
          success: false,
          message: 'Low stock threshold must be a non-negative number.',
        })
      }
      updateData.lowStockThreshold = numThreshold
    }

    if (updateData.supplier && updateData.supplier !== '' && !mongoose.Types.ObjectId.isValid(updateData.supplier)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Supplier ID format.',
      })
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { sku },
      updateData,
      { new: true, runValidators: true },
    ).populate('supplier')

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with SKU "${sku}" not found for update.`,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    })
  } catch (error) {
    console.error(`[Controller Error - updateProduct]: ${error.message}`)

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Cannot update SKU: The new SKU is already in use by another product.',
      })
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: 'Server error: Unable to update product.',
    })
  }
}

/**
 * @desc    Delete a product by SKU
 * @route   DELETE /api/products/:sku
 * @access  Public (in Week 7)
 */
export const deleteProduct = async (req, res) => {
  try {
    const sku = (req.params.sku || '').toUpperCase()
    const deletedProduct = await Product.findOneAndDelete({ sku })

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with SKU "${sku}" not found for deletion.`,
      })
    }

    res.status(200).json({
      success: true,
      message: `Product with SKU "${sku}" deleted successfully.`,
      data: deletedProduct,
    })
  } catch (error) {
    console.error(`[Controller Error - deleteProduct]: ${error.message}`)
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to delete product.',
    })
  }
}
