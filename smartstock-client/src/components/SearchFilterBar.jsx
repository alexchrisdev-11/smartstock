import PropTypes from 'prop-types'
import './components.css'

/**
 * SearchFilterBar Component
 * Props received:
 * - searchTerm: string (required) - current query string for filtering by name, SKU, or category
 * - onSearchChange: func (required) - callback when search input changes
 * - stockFilter: string (required) - active stock availability filter ('all' | 'in-stock' | 'low-stock')
 * - onFilterChange: func (required) - callback when stock filter selection changes
 * - onReset: func (required) - callback to reset inventory, search query, and stock filter
 * Renders:
 * - A controls toolbar containing a search input, stock status dropdown, and reset button
 */
function SearchFilterBar({
  searchTerm,
  onSearchChange,
  stockFilter,
  onFilterChange,
  onReset,
}) {
  return (
    <div className="search-filter-bar">
      {/* Search by product name, SKU, or category */}
      <div className="search-box">
        <label htmlFor="inventory-search" className="visually-hidden">
          Search Products
        </label>
        <input
          id="inventory-search"
          type="text"
          className="search-input"
          placeholder="Search by name, SKU, or category..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filter by stock status */}
      <div className="filter-group">
        <label htmlFor="stock-filter" className="filter-label">
          Status:
        </label>
        <select
          id="stock-filter"
          className="filter-select"
          value={stockFilter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All Products</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
        </select>

        {/* Reset inventory and filters button */}
        <button
          type="button"
          className="reset-btn"
          onClick={onReset}
          title="Reset inventory quantities and clear filters"
        >
          Reset Inventory
        </button>
      </div>
    </div>
  )
}

SearchFilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  stockFilter: PropTypes.oneOf(['all', 'in-stock', 'low-stock']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}

export default SearchFilterBar
