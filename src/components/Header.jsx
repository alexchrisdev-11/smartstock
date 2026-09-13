import PropTypes from 'prop-types'
import './components.css'

/**
 * Header Component
 * Props received:
 * - title: string (required) - primary title text for the header
 * - subtitle: string (optional) - supporting descriptive tagline
 * Renders:
 * - A reusable header banner containing an h1 title and optional subtitle paragraph
 */
function Header({ title, subtitle }) {
  return (
    <header className="smartstock-header">
      <h1 className="header-title">{title}</h1>
      {subtitle && <p className="header-subtitle">{subtitle}</p>}
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default Header
