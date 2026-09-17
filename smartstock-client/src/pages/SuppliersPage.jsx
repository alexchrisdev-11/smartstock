import { useState, useEffect } from 'react'
import Header from '../components/Header'
import StockClock from '../components/StockClock'
import { useAuth } from '../hooks/useAuth'
import { getSuppliers, createSupplier, deleteSupplier } from '../api/suppliersApi'
import './pages.css'

/**
 * SuppliersPage Component
 *
 * Route: "/suppliers" (Protected)
 *
 * Capabilities:
 * - Fetches supplier list from `GET /api/suppliers`.
 * - Provides an Add Supplier Form calling `POST /api/suppliers` with live validation.
 * - Restricts supplier deletion to users with `admin` role (`DELETE /api/suppliers/:id`).
 * - Displays asynchronous loading and mutation states with user-friendly error banners.
 */
function SuppliersPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [suppliers, setSuppliers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionAlert, setActionAlert] = useState(null)

  // Add Supplier Form State
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    contactEmail: '',
    phone: '',
    address: '',
  })
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  // Fetch all suppliers on mount
  const fetchSupplierList = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getSuppliers()
      setSuppliers(data || [])
    } catch (err) {
      console.error('Failed to fetch suppliers:', err)
      setError(
        err.response?.data?.message || 'Failed to load supplier directory from server.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSupplierList()
  }, [])

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formError) setFormError(null)
  }

  // Handle Add Supplier Submission
  const handleAddSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!formData.name.trim() || !formData.contactEmail.trim() || !formData.phone.trim()) {
      setFormError('Please fill in all required fields: Name, Contact Email, and Phone.')
      return
    }

    setIsSubmitting(true)
    try {
      const created = await createSupplier(formData)
      setSuppliers((prev) => [created, ...prev])
      setFormData({ name: '', contactEmail: '', phone: '', address: '' })
      setShowAddForm(false)
      setActionAlert({
        type: 'success',
        message: `Supplier "${created.name}" created successfully!`,
      })
      setTimeout(() => setActionAlert(null), 4000)
    } catch (err) {
      console.error('Failed to create supplier:', err)
      setFormError(
        err.response?.data?.message || 'Error creating supplier. Please verify inputs.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Delete Supplier (Admin Only)
  const handleDelete = async (id, name) => {
    if (!isAdmin) return
    const confirmed = window.confirm(
      `Are you sure you want to remove supplier "${name}"? This action cannot be undone.`
    )
    if (!confirmed) return

    setDeletingId(id)
    try {
      await deleteSupplier(id)
      setSuppliers((prev) => prev.filter((s) => s._id !== id))
      setActionAlert({
        type: 'success',
        message: `Supplier "${name}" was deleted successfully.`,
      })
      setTimeout(() => setActionAlert(null), 4000)
    } catch (err) {
      console.error('Failed to delete supplier:', err)
      setActionAlert({
        type: 'error',
        message: err.response?.data?.message || `Failed to delete supplier "${name}".`,
      })
      setTimeout(() => setActionAlert(null), 5000)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="page-container suppliers-page">
      <Header
        title="Supplier Directory"
        subtitle="Manage verified vendors, distribution partners, and procurement contacts"
      />

      {/* Top Bar Controls */}
      <div className="top-bar-controls">
        <StockClock />
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          {showAddForm ? '✕ Close Form' : '➕ Add New Supplier'}
        </button>
      </div>

      {/* Action Notification Alert */}
      {actionAlert && (
        <div
          className={`action-notification-banner ${
            actionAlert.type === 'success' ? 'banner-success' : 'banner-error'
          }`}
          role="status"
        >
          <span>{actionAlert.type === 'success' ? '✅' : '⚠️'}</span>
          <span>{actionAlert.message}</span>
        </div>
      )}

      {/* Collapsible Add Supplier Form */}
      {showAddForm && (
        <section className="add-product-section supplier-form-section">
          <h2 className="form-heading">Register New Vendor / Supplier</h2>

          {formError && (
            <div className="form-error" role="alert">
              ⚠️ {formError}
            </div>
          )}

          <form onSubmit={handleAddSubmit} className="add-product-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="sup-name">Supplier Name *</label>
                <input
                  id="sup-name"
                  name="name"
                  type="text"
                  placeholder="e.g., Global Logistics Corp"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sup-email">Contact Email *</label>
                <input
                  id="sup-email"
                  name="contactEmail"
                  type="email"
                  placeholder="orders@vendor.com"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sup-phone">Phone Number *</label>
                <input
                  id="sup-phone"
                  name="phone"
                  type="tel"
                  placeholder="+1-555-0199"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sup-address">Facility Address</label>
                <input
                  id="sup-address"
                  name="address"
                  type="text"
                  placeholder="100 Freight Way, Chicago, IL"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              className="add-product-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving Supplier...' : 'Create Supplier Record'}
            </button>
          </form>
        </section>
      )}

      {/* Supplier Listing Section */}
      {isLoading ? (
        <div className="status-banner loading-banner" role="status" aria-live="polite">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p className="loading-text">Loading registered suppliers...</p>
        </div>
      ) : error ? (
        <div className="status-banner error-banner" role="alert">
          <p className="error-message">⚠️ {error}</p>
          <button type="button" className="retry-btn" onClick={fetchSupplierList}>
            ↻ Retry Connection
          </button>
        </div>
      ) : suppliers.length === 0 ? (
        <div className="no-products">
          <h3 className="no-products-title">No Suppliers Registered</h3>
          <p className="no-products-subtitle">
            Click "+ Add New Supplier" above to register your first logistics or vendor partner.
          </p>
        </div>
      ) : (
        <div className="suppliers-grid">
          {suppliers.map((sup) => (
            <article key={sup._id} className="supplier-card">
              <div className="supplier-card-header">
                <span className="supplier-icon" aria-hidden="true">🏢</span>
                <div className="supplier-title-wrap">
                  <h3 className="supplier-name">{sup.name}</h3>
                  <span className="supplier-status-pill">Active Partner</span>
                </div>
              </div>

              <div className="supplier-details">
                <div className="supplier-row">
                  <span className="detail-label">Email:</span>
                  <a href={`mailto:${sup.contactEmail}`} className="supplier-link">
                    {sup.contactEmail}
                  </a>
                </div>

                <div className="supplier-row">
                  <span className="detail-label">Phone:</span>
                  <a href={`tel:${sup.phone}`} className="supplier-link">
                    {sup.phone}
                  </a>
                </div>

                {sup.address && (
                  <div className="supplier-row">
                    <span className="detail-label">Address:</span>
                    <span className="supplier-address-text">{sup.address}</span>
                  </div>
                )}
              </div>

              {isAdmin && (
                <div className="supplier-card-footer">
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(sup._id, sup.name)}
                    disabled={deletingId === sup._id}
                    title="Delete this supplier (Admin Only)"
                  >
                    {deletingId === sup._id ? 'Deleting...' : '🗑 Remove Supplier'}
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default SuppliersPage
