import { Supplier } from '../models/Supplier.js'

/**
 * Supplier Controller
 *
 * Implements CRUD operations for vendor and distributor records.
 */

/**
 * @desc    Fetch all suppliers
 * @route   GET /api/suppliers
 * @access  Private (Requires login)
 */
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}).sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: suppliers.length,
      data: suppliers,
    })
  } catch (error) {
    console.error(`[Controller Error - getSuppliers]: ${error.message}`)
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve suppliers.',
      error: error.message,
    })
  }
}

/**
 * @desc    Fetch single supplier by ID
 * @route   GET /api/suppliers/:id
 * @access  Private (Requires login)
 */
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id)

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: `Supplier with ID "${req.params.id}" not found.`,
      })
    }

    res.status(200).json({
      success: true,
      data: supplier,
    })
  } catch (error) {
    console.error(`[Controller Error - getSupplierById]: ${error.message}`)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid Supplier ID format.',
      })
    }
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve supplier.',
      error: error.message,
    })
  }
}

/**
 * @desc    Create a new supplier
 * @route   POST /api/suppliers
 * @access  Private (Requires login)
 */
export const createSupplier = async (req, res) => {
  try {
    const { name, contactEmail, phone, address } = req.body

    // Input Validation
    if (!name || !contactEmail || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required supplier fields: name, contactEmail, and phone.',
      })
    }

    const newSupplier = await Supplier.create({
      name: name.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      phone: phone.trim(),
      address: address ? address.trim() : '',
    })

    res.status(201).json({
      success: true,
      message: 'Supplier created successfully',
      data: newSupplier,
    })
  } catch (error) {
    console.error(`[Controller Error - createSupplier]: ${error.message}`)
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to create supplier.',
      error: error.message,
    })
  }
}

/**
 * @desc    Update a supplier by ID
 * @route   PUT /api/suppliers/:id
 * @access  Private (Requires login)
 */
export const updateSupplier = async (req, res) => {
  try {
    const updateData = { ...req.body }
    if (updateData.contactEmail) {
      updateData.contactEmail = updateData.contactEmail.trim().toLowerCase()
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    )

    if (!updatedSupplier) {
      return res.status(404).json({
        success: false,
        message: `Supplier with ID "${req.params.id}" not found for update.`,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Supplier updated successfully',
      data: updatedSupplier,
    })
  } catch (error) {
    console.error(`[Controller Error - updateSupplier]: ${error.message}`)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid Supplier ID format.',
      })
    }
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to update supplier.',
      error: error.message,
    })
  }
}

/**
 * @desc    Delete a supplier by ID
 * @route   DELETE /api/suppliers/:id
 * @access  Private (Admin Only)
 */
export const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id)

    if (!deletedSupplier) {
      return res.status(404).json({
        success: false,
        message: `Supplier with ID "${req.params.id}" not found for deletion.`,
      })
    }

    res.status(200).json({
      success: true,
      message: `Supplier "${deletedSupplier.name}" deleted successfully.`,
      data: deletedSupplier,
    })
  } catch (error) {
    console.error(`[Controller Error - deleteSupplier]: ${error.message}`)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid Supplier ID format.',
      })
    }
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to delete supplier.',
      error: error.message,
    })
  }
}

export default {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
}
