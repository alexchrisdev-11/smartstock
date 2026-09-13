import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

/**
 * Root Application Entry Point
 *
 * Provider Nesting Order:
 * <BrowserRouter> wraps <AuthProvider>, which wraps <App />.
 *
 * Why place <AuthProvider> INSIDE <BrowserRouter>?
 * 1. Router Hook Accessibility: Placing AuthProvider inside BrowserRouter allows authentication
 *    callbacks, session handlers, or interceptors to safely call React Router navigation hooks
 *    (such as `useNavigate` or `useLocation`) in the future if needed.
 * 2. Full Application Scope: Every page, layout shell, protected route, and component inside
 *    `<App />` has seamless access to both routing state and authentication context.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
