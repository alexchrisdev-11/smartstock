import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/**
 * Root Application Entry Point
 *
 * Wraps the entire component tree in <BrowserRouter> from react-router-dom.
 * This provides HTML5 History API integration, enabling client-side routing
 * without full page reloads.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
