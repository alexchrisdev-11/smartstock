import PropTypes from 'prop-types'
import './components.css'

/**
 * SearchBar Component
 *
 * A reusable controlled search input component.
 *
 * Props received:
 * - searchTerm: string (required) - the current query text passed down from App.jsx state.
 *   (Why prop? The search term must live in App.jsx so App can derive the filtered product list).
 * - onSearchChange: func (required) - callback fired whenever the user types, notifying App.jsx to update its searchTerm state.
 *
 * Renders:
 * - A clean search input field with live search icon and clear button
 */
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          id="product-search-input"
          type="text"
          className="search-input-field"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products by name"
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default SearchBar
