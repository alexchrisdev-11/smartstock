import os

output_path = os.path.abspath(r"C:\Users\Varsha Macwan\OneDrive\Desktop\smartstock-client\screenshot\SmartStock_Complete_Filled_Workbook.html")

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SmartStock — Complete Experiential Learning Workbook (Silver Oak University)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #0f172a;
      color: #1e293b;
      line-height: 1.4;
      font-size: 13px;
    }
    
    /* Screen toolbar */
    .screen-toolbar {
      position: sticky;
      top: 0;
      z-index: 999;
      background: #1e293b;
      color: #f8fafc;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #3b82f6;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
    }
    .print-btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 8px 18px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.15s ease;
    }
    .print-btn:hover {
      background: #1d4ed8;
    }
    
    /* Page Layout */
    .workbook-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 0;
      gap: 24px;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      height: 297mm;
      padding: 16mm 18mm 14mm 18mm;
      background: #ffffff;
      border-radius: 2px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    
    /* Headers & Footers */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 2px solid #0f172a;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #0f172a;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
      border-top: 1.5px solid #cbd5e1;
      font-size: 10px;
      font-weight: 600;
      color: #64748b;
      margin-top: auto;
    }
    
    .page-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    /* Typography */
    h1.page-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 4px;
      letter-spacing: -0.01em;
    }
    h2.week-subtitle {
      font-size: 14px;
      font-weight: 700;
      color: #2563eb;
      text-align: center;
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      margin: 12px 0 6px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    /* Lists & Text */
    .filled-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
    }
    .filled-list li {
      position: relative;
      padding-left: 18px;
      font-size: 12px;
      color: #334155;
      line-height: 1.35;
    }
    .filled-list li::before {
      content: "●";
      position: absolute;
      left: 2px;
      color: #2563eb;
      font-size: 10px;
      top: 1px;
    }
    .numbered-list {
      list-style: decimal inside;
      display: flex;
      flex-direction: column;
      gap: 3.5px;
      margin-bottom: 8px;
    }
    .numbered-list li {
      font-size: 11.5px;
      color: #334155;
      line-height: 1.35;
    }
    
    /* Box Containers */
    .code-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: #0f172a;
      line-height: 1.4;
      flex: 1;
      overflow: hidden;
      white-space: pre-wrap;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.03);
    }
    .screenshot-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .screenshot-box img {
      max-width: 100%;
      max-height: 175mm;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    .ascii-screen {
      background: #0f172a;
      color: #38bdf8;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      padding: 12px;
      border-radius: 6px;
      line-height: 1.3;
      white-space: pre;
      text-align: left;
      width: 100%;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    
    /* Tables */
    .table-custom {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 11px;
    }
    .table-custom th, .table-custom td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: left;
    }
    .table-custom th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
    }
    .table-custom tr:nth-child(even) {
      background: #f8fafc;
    }
    
    .filled-paragraph {
      font-size: 11.5px;
      color: #334155;
      line-height: 1.45;
      text-align: justify;
      margin-bottom: 8px;
    }
    .faculty-box {
      margin-top: 10px;
      border-top: 1px dashed #cbd5e1;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 11px;
      color: #64748b;
    }
    
    /* Cover Page Styles */
    .cover-page {
      text-align: center;
      padding: 25mm 20mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    .cover-logo-area {
      margin-bottom: 10px;
    }
    .uni-badge {
      display: inline-block;
      padding: 6px 16px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1d4ed8;
      font-weight: 800;
      font-size: 14px;
      border-radius: 9999px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .cover-title {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      margin: 8px 0;
      line-height: 1.2;
    }
    .cover-sub {
      font-size: 15px;
      color: #475569;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .cover-workbook-tag {
      font-size: 20px;
      font-weight: 800;
      color: #2563eb;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-top: 2px solid #e2e8f0;
      border-bottom: 2px solid #e2e8f0;
      padding: 10px 0;
      margin: 20px 0;
      width: 100%;
    }
    .student-details-table {
      width: 100%;
      max-width: 160mm;
      border-collapse: collapse;
      margin: 15px auto;
      text-align: left;
      font-size: 12.5px;
    }
    .student-details-table td {
      border: 1.5px solid #0f172a;
      padding: 8px 12px;
    }
    .student-details-table td:first-child {
      font-weight: 700;
      width: 35%;
      background: #f8fafc;
    }
    
    @media print {
      body {
        background: transparent !important;
        padding: 0 !important;
      }
      .screen-toolbar {
        display: none !important;
      }
      .workbook-container {
        padding: 0 !important;
        gap: 0 !important;
      }
      .page {
        box-shadow: none !important;
        border-radius: 0 !important;
        border: none !important;
        page-break-after: always !important;
        margin: 0 !important;
        width: 100% !important;
        min-height: 100vh !important;
        height: 100vh !important;
      }
    }
  </style>
</head>
<body>

  <!-- Screen Toolbar -->
  <div class="screen-toolbar">
    <div>
      <div style="font-weight:700; font-size:15px;">Silver Oak University — Experiential Learning Workbook</div>
      <div style="font-size:12px; color:#94a3b8;">Full Stack Development - I (3040233448) • SmartStock Project (Weeks 01–12 Complete)</div>
    </div>
    <div style="display:flex; gap:12px; align-items:center;">
      <span style="font-size:12px; color:#cbd5e1;">64 Pages Fully Formatted</span>
      <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
    </div>
  </div>

  <div class="workbook-container">
"""

# Let's define the week data dictionary
weeks_data = [
  {
    "num": "01",
    "title": "React Setup & GitHub Initialization",
    "page_start": 4,
    "objectives": [
      "Understand modern Single Page Application (SPA) architecture and modern client-side workflows.",
      "Install and configure Vite build toolchain for instant Hot Module Replacement (HMR).",
      "Structure a scalable React 19 project directory separating components, pages, and styles.",
      "Initialize Git version control, establish .gitignore policies, and publish to GitHub remote.",
      "Build a responsive landing page layout using modern CSS flexbox and utility principles."
    ],
    "tasks": [
      "Installed Node.js v20+ runtime environment and npm package manager on development machine.",
      "Scaffolded Vite React app via 'npm create vite@latest smartstock-client -- --template react'.",
      "Cleaned standard boilerplate files, creating dedicated /src/components and /src/pages directories.",
      "Initialized local Git version repository and verified default branch assignment to 'main'.",
      "Created comprehensive .gitignore file excluding node_modules, build output dist/, and .env secrets.",
      "Configured central App.jsx component establishing the SmartStock layout foundation.",
      "Built initial landing page hero card with inventory system title, subtitle, and action buttons.",
      "Created responsive styles in App.css establishing color palette and fluid container wrappers.",
      "Created remote repository on GitHub under 'https://github.com/alexchrisdev-11/smartstock'.",
      "Pushed initial commit 'Initial commit: React + Vite setup for SmartStock' to origin main."
    ],
    "tools": [
      "React 19 & JSX Syntax",
      "Vite 6 Fast Bundler",
      "Node.js v20+ & npm",
      "Git & GitHub Version Control",
      "Visual Studio Code"
    ],
    "code": """// src/App.jsx - SmartStock Bootstrap Layout
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="smartstock-header">
        <h1 className="header-title">SmartStock</h1>
        <p className="header-subtitle">
          Manage your products, stock, and suppliers in one place
        </p>
      </header>

      <main className="app-layout">
        <section className="home-hero-card">
          <h2 className="hero-heading">Welcome to your Inventory Control Center</h2>
          <p className="hero-text">
            SmartStock empowers warehouse managers and inventory leads to monitor
            product quantities, receive automatic low-stock alerts, adjust inventory
            levels on the fly, and maintain catalog accuracy.
          </p>
          <div className="home-actions">
            <button type="button" className="primary-nav-btn">
              📦 Open Products Catalog →
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
export default App""",
    "image": "week1_exact_match_1789312169093.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 http://localhost:5173                                              —  □  × │
├────────────────────────────────────────────────────────────────────────────────┤
│                                  SmartStock                                    │
│             Manage your products, stock, and suppliers in one place            │
│   ┌────────────────────────────────────────────────────────────────────────┐   │
│   │              Welcome to your Inventory Control Center                  │   │
│   │   SmartStock empowers warehouse managers and inventory leads to        │   │
│   │   monitor quantities, receive low-stock alerts, and maintain catalog.  │   │
│   │                        [ 📦 Open Products Catalog → ]                  │   │
│   └────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "12-09-2026",
    "commit_msg": "Initial commit: React + Vite setup for SmartStock (d69034d)",
    "challenges": [
      "Configuring modern Vite 6 build parameters versus legacy Create-React-App standards.",
      "Managing local network binding and default port conflicts on localhost:5173.",
      "Establishing proper CSS box-sizing resets to prevent card overflows on mobile devices.",
      "Configuring Git SSH keys and personal access tokens for authenticated GitHub publishing.",
      "Structuring initial folder architecture to support future multi-week scaling."
    ],
    "solutions": [
      "Followed official Vite 6 scaffolding templates using ES Module package definitions.",
      "Configured vite.config.js to bind explicitly to standard development ports.",
      "Standardized box-sizing: border-box across universal CSS selectors in index.css.",
      "Configured Git credential manager and authenticated HTTPS remote repository origin.",
      "Decoupled src/ into atomic component, data, pages, and context folders."
    ],
    "outcome": "Successfully established modern React 19 frontend development tooling using Vite, created an initial responsive homepage, and published the version-controlled repository to GitHub.",
    "reflection": "Adopting Vite over traditional bundlers delivered near-instantaneous hot module replacement. Establishing rigorous git hygiene early ensured smooth collaboration throughout the 12-week development lifecycle."
  },
  {
    "num": "02",
    "title": "Components and Props",
    "page_start": 9,
    "objectives": [
      "Decompose complex user interfaces into atomic, modular, and reusable React components.",
      "Master unidirectional data flow by passing configuration attributes and data via props.",
      "Implement conditional rendering logic to display contextual UI badges based on stock metrics.",
      "Construct realistic mock data structures representing warehouse catalog products.",
      "Design responsive multi-column card grids adapting seamlessly to diverse viewport sizes."
    ],
    "tasks": [
      "Designed component architecture separating Header, ProductList, ProductCard, and Badge.",
      "Created reusable Header.jsx accepting dynamic title and subtitle string props.",
      "Created Badge.jsx rendering contextual status pills ('In Stock' vs 'Low Stock').",
      "Created ProductCard.jsx displaying item SKU, name, category, price, and stock count.",
      "Created ProductList.jsx iterating through products array using JavaScript Array.map().",
      "Constructed mock dataset mockProducts.js containing 6 realistic items with lowStockThresholds.",
      "Passed product document objects from parent ProductList to child ProductCard components via props.",
      "Implemented threshold check (product.quantity <= product.lowStockThreshold) driving badge style.",
      "Engineered responsive CSS grid layout using 'grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))'.",
      "Verified responsive card wrapping and font scaling across mobile, tablet, and desktop viewports."
    ],
    "tools": [
      "React 19 Functional Components",
      "Props & Unidirectional Data Flow",
      "CSS3 Flexbox & CSS Grid",
      "JavaScript ES6 Array.map()",
      "VS Code & Chrome DevTools"
    ],
    "code": """// src/components/ProductCard.jsx & Badge.jsx
import Badge from './Badge'
import './components.css'

export function Badge({ status }) {
  const isLow = status === 'low-stock'
  return (
    <span className={`badge ${isLow ? 'badge-low-stock' : 'badge-in-stock'}`}>
      {isLow ? 'Low Stock' : 'In Stock'}
    </span>
  )
}

export function ProductCard({ product }) {
  const isLowStock = product.quantity <= (product.lowStockThreshold ?? 10)
  const status = isLowStock ? 'low-stock' : 'in-stock'

  return (
    <article className="product-card">
      <div className="product-card-header">
        <span className="product-category">{product.category}</span>
        <Badge status={status} />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-sku">SKU: <span className="sku-code">{product.sku}</span></p>
      <div className="product-card-body">
        <div>
          <span className="detail-label">Price</span>
          <span className="detail-value price-value">${product.price.toFixed(2)}</span>
        </div>
        <div>
          <span className="detail-label">Quantity</span>
          <span className="detail-value">{product.quantity} units</span>
        </div>
      </div>
    </article>
  )
}""",
    "image": "week2_pixel_match_1789378906443.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 http://localhost:5173/products                                     —  □  × │
├────────────────────────────────────────────────────────────────────────────────┤
│ SmartStock Catalog                                                             │
│ ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────┐  │
│ │ Hardware   [ IN STOCK ] │  │ Supplies   [ LOW STOCK ]│  │ Hardware  [LOW] │  │
│ │ Wireless Barcode Reader │  │ Thermal Receipt Paper   │  │ Label Printer   │  │
│ │ SKU: STK-SCN-001        │  │ SKU: STK-PPR-002        │  │ SKU: PRN-004    │  │
│ │ $89.99    Stock: 24     │  │ $34.50     Stock: 8     │  │ $199.95 Stock: 4│  │
│ └─────────────────────────┘  └─────────────────────────┘  └─────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "13-09-2026",
    "commit_msg": "Week 2 & 3: Components, Props and useState State Management (9dcba3b)",
    "challenges": [
      "Preventing card height distortion when product titles spanned multiple lines.",
      "Enforcing prop validation and default fallback values for optional threshold values.",
      "Managing dynamic class string interpolation cleanly without runtime template errors.",
      "Maintaining uniform card spacing and button alignments across varying screen dimensions.",
      "Organizing shared CSS classes without causing style leakage across components."
    ],
    "solutions": [
      "Applied flex-direction: column with margin-top: auto on card body metadata sections.",
      "Utilized JavaScript nullish coalescing operators (product.lowStockThreshold ?? 10).",
      "Structured CSS utility classes (.badge-in-stock, .badge-low-stock) with explicit styles.",
      "Implemented responsive CSS Grid with CSS gap properties rather than fragile margins.",
      "Encapsulated reusable component rules into dedicated components.css stylesheet."
    ],
    "outcome": "Mastered atomic React component decomposition, prop-driven rendering, and conditional UI states reflecting business logic rules.",
    "reflection": "Decomposing the catalog interface into dedicated presentational components proved how modular code enhances maintainability and prevents redundant code duplication."
  },
  {
    "num": "03",
    "title": "State Management using useState",
    "page_start": 14,
    "objectives": [
      "Understand React state reactivity and the mechanics of the useState hook.",
      "Implement interactive user controls to execute incremental inventory adjustments.",
      "Build controlled input forms for real-time, in-memory catalog search and filtering.",
      "Calculate derived business summary statistics dynamically without redundant state.",
      "Maintain data immutability during state updates using modern JavaScript array methods."
    ],
    "tasks": [
      "Converted static product array in ProductsPage into reactive state using useState.",
      "Built interactive increment and decrement stock adjustment buttons (+ / −) on cards.",
      "Created handleAdjustStock handler updating state immutably via Array.map().",
      "Implemented defensive guard preventing inventory quantities from dropping below zero.",
      "Built SearchBar.jsx component with controlled input two-way value binding.",
      "Implemented real-time catalog filtering matching product name, category, and SKU.",
      "Built InventorySummary.jsx calculating total catalog products dynamically.",
      "Calculated total inventory units using Array.reduce() summing item quantities.",
      "Calculated active low-stock count filtering products at or below threshold.",
      "Added empty search results view rendered when query string matches zero items."
    ],
    "tools": [
      "React Hooks (useState)",
      "JavaScript ES6 (Array.map, Array.filter, Array.reduce)",
      "Controlled Input Forms",
      "CSS3 Transitions",
      "Chrome DevTools"
    ],
    "code": """// src/pages/ProductsPage.jsx (Interactive State & Handlers)
import { useState } from 'react'
import { mockProducts } from '../data/mockProducts'

export function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAdjustStock = (sku, delta) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.sku === sku) {
          const newQty = Math.max(0, item.quantity + delta)
          return { ...item, quantity: newQty }
        }
        return item
      })
    )
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalUnits = products.reduce((acc, p) => acc + p.quantity, 0)
  const lowStockCount = products.filter((p) => p.quantity <= (p.lowStockThreshold ?? 10)).length

  return (
    <div className="page-container">
      <div className="inventory-summary">
        <div className="stat-card"><span className="stat-label">Total Items</span><span className="stat-value">{products.length}</span></div>
        <div className="stat-card"><span className="stat-label">Total Units</span><span className="stat-value">{totalUnits}</span></div>
        <div className="stat-card stat-card-warning"><span className="stat-label">Low Stock</span><span className="stat-value">{lowStockCount}</span></div>
      </div>
    </div>
  )
}""",
    "image": "week3_pixel_match_1789379421679.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 http://localhost:5173/products                                     —  □  × │
├────────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐   │
│ │ TOTAL PRODUCTS       │  │ TOTAL UNITS IN STOCK │  │ LOW STOCK ALERTS    │   │
│ │ 6                    │  │ 104                  │  │ 3                   │   │
│ └──────────────────────┘  └──────────────────────┘  └─────────────────────┘   │
│ 🔍 [ Search products by name, SKU...                  ]   [ Clear ]           │
│ ┌────────────────────────────────────────────────────────────────────────┐    │
│ │ Wireless Barcode Scanner  [ IN STOCK ]  Price: $89.99  Stock: [−] 24 [+]│   │
│ └────────────────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "13-09-2026",
    "commit_msg": "Week 2 & 3: Components, Props and useState State Management (9dcba3b)",
    "challenges": [
      "Direct state mutation pitfalls causing React re-render skipping bugs.",
      "Managing stock count boundaries to prevent negative inventory values.",
      "Maintaining controlled input state without cursor jumping anomalies during search.",
      "Optimizing performance to ensure real-time search typing remains fluid.",
      "Recalculating derived summary counts cleanly without maintaining redundant state variables."
    ],
    "solutions": [
      "Followed strict immutable state patterns using spread syntax ({ ...item, quantity }).",
      "Enforced Math.max(0, item.quantity + delta) guard in adjustment handlers.",
      "Bound input value directly to state with synchronous onChange handler.",
      "Computed filtered array dynamically during component render phase.",
      "Calculated total units and low stock count as derived variables from products state."
    ],
    "outcome": "Mastered React stateful reactivity, event handling, immutable updates, and controlled input forms delivering instantaneous user interaction.",
    "reflection": "Deriving computed values like inventory totals directly from state instead of storing duplicate variables eliminated state desynchronization bugs completely."
  },
  {
    "num": "04",
    "title": "useEffect and Lifecycle Concepts",
    "page_start": 19,
    "objectives": [
      "Understand component lifecycle phases: Mount, Update, and Unmount in functional React.",
      "Execute side effects, asynchronous network simulations, and timer setups via useEffect.",
      "Implement cleanup functions to prevent memory leaks and orphan background timers.",
      "Design resilient asynchronous user experiences with Loading, Error, and Success states.",
      "Build user-driven error recovery controls ('Retry' button) to handle network failures."
    ],
    "tasks": [
      "Created StockClock.jsx component displaying live hours, minutes, and seconds.",
      "Configured useEffect in StockClock establishing a 1000ms setInterval timer.",
      "Implemented cleanup return function calling clearInterval() to prevent timer leaks.",
      "Simulated asynchronous server data fetching with setTimeout simulating 800ms latency.",
      "Managed tripartite data lifecycle state variables: isLoading, error, and products.",
      "Built animated CSS loading spinner banner (.loading-spinner) for loading feedback.",
      "Engineered error display banner (.error-banner) presenting user-friendly messages.",
      "Built 'Retry' button enabling users to re-trigger data fetching upon network failure.",
      "Added testing toggle allowing manual triggering of simulated network exceptions.",
      "Verified in browser dev tools that unmounting StockClock terminates background interval."
    ],
    "tools": [
      "React Hooks (useEffect, useState)",
      "JavaScript Timing API (setInterval, clearInterval)",
      "Asynchronous JavaScript (Promises, setTimeout)",
      "CSS Keyframe Animations",
      "Browser Memory Profiler"
    ],
    "code": """// src/components/StockClock.jsx & Async Fetching
import { useState, useEffect } from 'react'

export function StockClock() {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateClock = () => {
      setTimeString(new Date().toLocaleTimeString())
    }
    updateClock() // Initial sync
    const timerId = setInterval(updateClock, 1000)

    // Critical Cleanup Function: Executed on component unmount
    return () => clearInterval(timerId)
  }, [])

  return (
    <div className="stock-clock">
      <span className="clock-icon">🕒</span>
      <span className="clock-label">StockClock:</span>
      <span className="clock-value">{timeString}</span>
    </div>
  )
}""",
    "image": "week3_matched_ui_1789311341124.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 http://localhost:5173/products                                     —  □  × │
├────────────────────────────────────────────────────────────────────────────────┤
│ SmartStock                                  🕒 StockClock: 15:45:12 PM        │
│ ┌──────────────────────────────────────────────────────────────────────────┐  │
│ │                                                                          │  │
│ │                            ⟳ (Spinning)                                  │  │
│ │                   Loading inventory from server...                       │  │
│ │            Simulating 800ms asynchronous fetch latency via useEffect     │  │
│ └──────────────────────────────────────────────────────────────────────────┘  │
│ [ Simulating Error State ]:                                                    │
│ ┌──────────────────────────────────────────────────────────────────────────┐  │
│ │  ⚠️ Failed to connect to inventory server. Please check your network.     │  │
│ │                             [ ↻ Retry ]                                  │  │
│ └──────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "13-09-2026",
    "commit_msg": "Week 4: useEffect & Lifecycle Concepts - async data fetching, error handling, StockClock (b2e457a)",
    "challenges": [
      "Orphaned setInterval timers continuing to execute after component unmounting.",
      "Race conditions resulting from state updates triggered after components unmounted.",
      "Managing UI layout shifts between loading banners and loaded card grids.",
      "Simulating realistic asynchronous failure modes without third-party libraries.",
      "Configuring dependency arrays to prevent infinite useEffect re-triggering loops."
    ],
    "solutions": [
      "Returned explicit arrow cleanup function () => clearInterval(timerId) in useEffect.",
      "Implemented isMounted cancellation boolean guard inside asynchronous callbacks.",
      "Standardized layout banner min-height to match loaded grid dimensions.",
      "Implemented randomized Math.random() < 0.2 error simulation with retry triggers.",
      "Kept dependency arrays empty [] for mount-only initialization logic."
    ],
    "outcome": "Mastered React functional lifecycle management, side-effect cleanup, timer cancellation, and resilient asynchronous state handling.",
    "reflection": "Understanding effect cleanups is fundamental in frontend development. Preventing resource leaks protects browser responsiveness and avoids hard-to-detect memory bugs."
  },
  {
    "num": "05",
    "title": "React Router and Navigation",
    "page_start": 24,
    "objectives": [
      "Understand Client-Side Routing (Single Page Applications) versus Multi-Page server architectures.",
      "Install and configure react-router-dom v6 with BrowserRouter, Routes, and Route.",
      "Master dynamic route parameter parsing using the useParams() hook for :sku lookup.",
      "Implement sticky global navigation with NavLink and active link CSS styling.",
      "Design a graceful HTTP 404 catch-all route for unhandled URL patterns."
    ],
    "tasks": [
      "Installed react-router-dom package into Vite application dependencies.",
      "Wrapped application root in BrowserRouter inside src/main.jsx.",
      "Created central route table in src/App.jsx declaring /, /login, /products, and /products/:sku.",
      "Built src/components/Navbar.jsx with persistent brand logo and navigational links.",
      "Implemented dynamic CSS styling on active links using className={({ isActive }) => ...}.",
      "Created dynamic src/pages/ProductDetailPage.jsx accepting :sku URL parameter.",
      "Used useParams() to extract SKU code and look up corresponding product metrics.",
      "Configured useLocation() state forwarding to optimize instant navigation transitions.",
      "Built src/pages/NotFoundPage.jsx displaying a 404 error with return navigation button.",
      "Added comprehensive responsive CSS for mobile navigation and detail cards in pages.css."
    ],
    "tools": [
      "React 19 & Vite 6",
      "react-router-dom v6",
      "React Hooks (useParams, useLocation)",
      "CSS3 Flexbox & Grid",
      "Visual Studio Code"
    ],
    "code": """// src/pages/ProductDetailPage.jsx (Dynamic :sku Lookup)
import { useParams, useLocation, Link } from 'react-router-dom'
import Badge from '../components/Badge'
import StockClock from '../components/StockClock'
import { mockProducts } from '../data/mockProducts'

function ProductDetailPage() {
  const { sku } = useParams()
  const location = useLocation()

  const product = location.state?.product || mockProducts.find(
    (p) => p.sku.toLowerCase() === (sku || '').toLowerCase()
  )

  if (!product) {
    return (
      <div className="detail-not-found">
        <h2>Product Not Found</h2>
        <p>No inventory item found matching SKU: <code>{sku}</code></p>
        <Link to="/products" className="primary-nav-btn">Return to Catalog</Link>
      </div>
    )
  }

  const isLowStock = product.quantity <= (product.lowStockThreshold ?? 10)

  return (
    <div className="page-container product-detail-page">
      <div className="detail-top-nav">
        <Link to="/products" className="back-link">← Back to Catalog</Link>
        <StockClock />
      </div>
      <article className="product-detail-card">
        <div className="detail-header">
          <div>
            <span className="product-category">{product.category}</span>
            <h1 className="detail-product-name">{product.name}</h1>
            <p className="detail-sku">SKU: <span className="sku-code">{product.sku}</span></p>
          </div>
          <Badge status={isLowStock ? 'low-stock' : 'in-stock'} />
        </div>
        <div className="detail-metrics-grid">
          <div className="detail-metric-card"><span>Unit Price</span><strong>${product.price.toFixed(2)}</strong></div>
          <div className="detail-metric-card"><span>Stock</span><strong>{product.quantity} units</strong></div>
          <div className="detail-metric-card"><span>Threshold</span><strong>{product.lowStockThreshold} units</strong></div>
        </div>
      </article>
    </div>
  )
}
export default ProductDetailPage""",
    "image": "week3_products_page_1789311477362.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 http://localhost:5173/products/STK-SCN-001                         —  □  × │
├────────────────────────────────────────────────────────────────────────────────┤
│ [📦 SmartStock]      Home  |  [Products]  |  Suppliers                        │
│ ← Back to Products Catalog                           🕒 StockClock: 15:46:01   │
│ ┌──────────────────────────────────────────────────────────────────────────┐  │
│ │ Hardware                                                                 │  │
│ │ Wireless Barcode Scanner                                  [ IN STOCK ]   │  │
│ │ SKU: STK-SCN-001  (Extracted via useParams hook)                         │  │
│ │ ──────────────────────────────────────────────────────────────────────── │  │
│ │ UNIT PRICE          CURRENT STOCK       THRESHOLD      TOTAL VALUE       │  │
│ │ $89.99              24 units            10 units       $2,159.76         │  │
│ └──────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "13-09-2026",
    "commit_msg": "Week 5: React Router and Navigation - multi-page structure with dynamic product detail route (4b997be)",
    "challenges": [
      "Handling route mismatch when users manually enter non-existent product SKUs in URL.",
      "Preventing full page reloads when clicking navigation links to maintain SPA speed.",
      "Preserving active navigation link highlight state across browser refreshes.",
      "Passing state between routes without forcing duplicate data lookups.",
      "Ensuring dynamic :sku parameter is case-insensitive during catalog lookups."
    ],
    "solutions": [
      "Implemented conditional fallback card inside ProductDetailPage when product is undefined.",
      "Utilized React Router's <Link> and <NavLink> instead of standard HTML <a> tags.",
      "Leveraged isActive render prop on NavLink to dynamically assign .active-link CSS class.",
      "Passed cached product objects via location.state in <Link to={...} state={{ product }}>.",
      "Added .toLowerCase() conversion on both URL param and target dataset SKUs."
    ],
    "outcome": "Client-side routing enables instantaneous page transitions without round-trip server requests, delivering a desktop-like experience. Dynamic route parameters enable bookmarkable, REST-like client URLs.",
    "reflection": "Learning React Router illustrated the power of component-driven routing. Abstracting navigation into declarative <Routes> made application scalability intuitive while keeping the component tree clean and maintainable."
  },
  {
    "num": "06",
    "title": "Advanced Hooks (useContext & Auth)",
    "page_start": 29,
    "objectives": [
      "Eliminate prop-drilling by managing global application state using React Context API.",
      "Build custom reusable consumer hooks (useAuth) to encapsulate context consumption.",
      "Implement client-side session persistence using browser localStorage API.",
      "Design a reusable ProtectedRoute higher-order component for route authorization.",
      "Enforce Role-Based Access Control (RBAC) in UI components (Admin vs. Staff)."
    ],
    "tasks": [
      "Created src/context/AuthContext.jsx initializing global authentication context.",
      "Built AuthProvider managing user, isAuthenticated, login, and logout state.",
      "Implemented useEffect hook synchronizing authenticated session state with localStorage.",
      "Created custom src/hooks/useAuth.js wrapper hook with context error validation.",
      "Built src/components/ProtectedRoute.jsx guarding private routes from unauthorized access.",
      "Implemented automatic redirect to /login preserving target return URL in location.state.",
      "Created src/pages/LoginPage.jsx with demo credential buttons for Admin and Staff.",
      "Updated Navbar.jsx rendering current user's name, role pill, and interactive Logout button.",
      "Conditionalized product deletion buttons in ProductCard.jsx checking user?.role === 'admin'.",
      "Added comprehensive authentication form validation and alert banner styles in components.css."
    ],
    "tools": [
      "React Hooks (createContext, useContext, useState, useEffect)",
      "React Router v6 (useLocation, Navigate)",
      "Browser Storage (localStorage)",
      "ESLint & Vite",
      "Chrome DevTools"
    ],
    "code": """// src/components/ProtectedRoute.jsx & AuthContext.jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect unauthenticated visitors to login, preserving intended route
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

// Role-based delete action restricted strictly to 'admin' users in ProductCard.jsx
{user?.role === 'admin' && (
  <button
    type="button"
    className="delete-btn"
    onClick={() => onDeleteProduct(sku)}
    title="Delete this item (Admin only)"
  >
    🗑 Delete
  </button>
)}""",
    "image": "week3_app_output_1789311271640.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 http://localhost:5173/login                                        —  □  × │
├────────────────────────────────────────────────────────────────────────────────┤
│ [📦 SmartStock]                                          [ 🔐 Login ]         │
│                       ┌───────────────────────────────┐                        │
│                       │        🔐 Sign In             │                        │
│                       │ Email: [ admin@smartstock.com] │                        │
│                       │ Password: [ ••••••••••••    ] │                        │
│                       │       [ Sign In ]             │                        │
│                       │ Quick Demo Credentials:       │                        │
│                       │ [ Admin Account (admin) ]     │                        │
│                       │ [ Staff Account (staff) ]     │                        │
│                       └───────────────────────────────┘                        │
├────────────────────────────────────────────────────────────────────────────────┤
│ [📦 SmartStock]  Home | Products   👤 Admin User [ ADMIN ]  [ Logout ]        │
│ [ Card Action ]: [ View Details ]   [ 🗑 Delete ] ← (Admin only button)       │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "13-09-2026",
    "commit_msg": "Week 6: useContext for Auth State - login/logout, protected routes, role-based UI (78d8ef0)",
    "challenges": [
      "State loss upon browser page refresh causing accidental logout of active users.",
      "Unauthenticated visitors viewing protected inventory routes via direct URL entry.",
      "Creating prop drilling chains passing user auth state across multiple component tiers.",
      "Allowing staff users to accidentally trigger destructive delete operations.",
      "Missing redirection back to originally requested page after completing login."
    ],
    "solutions": [
      "Initialized useState inside AuthProvider from localStorage.getItem('smartstock_user').",
      "Wrapped /products and /products/:sku inside ProtectedRoute component in App.jsx.",
      "Implemented useContext broadcasting global auth state directly to consumers.",
      "Added conditional check {user?.role === 'admin' && <button className='delete-btn'>}.",
      "Read location.state?.from inside LoginPage.jsx navigating users to prior target after sign-in."
    ],
    "outcome": "React Context API solves cross-cutting concerns like authentication without external state libraries. Encapsulating guards inside higher-order components ensures strict, centralized security boundaries.",
    "reflection": "Integrating authentication state and RBAC bridged the gap between front-end UI and real business workflows. The ability to hide or expose controls based on roles highlighted the importance of defense-in-depth architecture."
  },
  {
    "num": "07",
    "title": "API Integration & Node JS Fundamentals",
    "page_start": 34,
    "objectives": [
      "Understand Node.js runtime environment, Express framework, and RESTful API architecture.",
      "Connect a Node.js backend to a MongoDB database using Mongoose ODM.",
      "Design a normalized Mongoose Schema with validation, constraints, and timestamps.",
      "Build Express Controllers implementing CRUD operations for inventory products.",
      "Configure modular Express routing separating routes from controller handlers."
    ],
    "tasks": [
      "Initialized /server workspace with npm init -y and configured ES Module support ('type': 'module').",
      "Installed core dependencies: express, mongoose, dotenv, cors.",
      "Created database connection module server/config/db.js using mongoose.connect().",
      "Defined Product model in server/models/Product.js with required fields, constraints, and unique SKU.",
      "Implemented getProducts controller fetching and returning catalog items sorted by creation date.",
      "Implemented getProductBySku controller with uppercase normalization and 404 error checks.",
      "Implemented createProduct controller with input validation and duplicate SKU rejection.",
      "Implemented updateProduct and deleteProduct controllers for full CRUD functionality.",
      "Built modular router in server/routes/productRoutes.js and mounted at /api/products in server.js.",
      "Added server health check route GET /api/health returning server status and timestamps."
    ],
    "tools": [
      "Node.js & Express.js",
      "MongoDB & Mongoose ODM",
      "Postman / Thunder Client",
      "dotenv & cors",
      "Visual Studio Code"
    ],
    "code": """// server/controllers/productController.js
import { Product } from '../models/Product.js'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: products.length, data: products })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: Unable to retrieve products.' })
  }
}

export const getProductBySku = async (req, res) => {
  try {
    const sku = (req.params.sku || '').toUpperCase()
    const product = await Product.findOne({ sku })
    if (!product) {
      return res.status(404).json({ success: false, message: `Product with SKU "${sku}" not found.` })
    }
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: Unable to retrieve product.' })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, sku, category, price, quantity, lowStockThreshold } = req.body
    if (!name || !sku || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' })
    }
    const newProduct = await Product.create({
      name, sku: sku.toUpperCase(), category, price, quantity, lowStockThreshold
    })
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A product with this SKU already exists.' })
    }
    res.status(500).json({ success: false, message: 'Server error: Unable to create product.' })
  }
}""",
    "image": "week2_app_output_1789298753132.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 💻 Terminal: Express Server Started on Port 5000                              │
├────────────────────────────────────────────────────────────────────────────────┤
│ $ npm start                                                                    │
│ [SmartStock Server] Active and listening on http://localhost:5000              │
│ [SmartStock Server] Health check: http://localhost:5000/api/health             │
│ [Database] MongoDB Connected: cluster0.mongodb.net/smartstock                  │
├────────────────────────────────────────────────────────────────────────────────┤
│ 🌐 GET http://localhost:5000/api/products → 200 OK (18ms)                      │
│ {                                                                              │
│   "success": true, "count": 6,                                                 │
│   "data": [ { "name": "Wireless Barcode Scanner", "sku": "STK-SCN-001" ... } ] │
│ }                                                                              │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "13-09-2026",
    "commit_msg": "Week 7: Node.js & Express Server Setup - Product REST API with MongoDB connection (30ba048)",
    "challenges": [
      "Managing asynchronous database connection delays causing queries to execute prematurely.",
      "Duplicate SKU insertions resulting in unhandled MongoDB E11000 driver exceptions.",
      "Handling Cross-Origin Resource Sharing (CORS) errors when frontend queries port 5000.",
      "Managing environment secrets (DB credentials) safely without exposing them to Git.",
      "Enforcing numeric validation on price and quantity fields."
    ],
    "solutions": [
      "Created an asynchronous startServer function awaiting connectDB() before calling app.listen().",
      "Added an explicit catch block for error.code === 11000 returning user-friendly HTTP 400 messages.",
      "Mounted Express cors() middleware globally in server.js.",
      "Configured .env file for MONGO_URI and added it to .gitignore alongside .env.example.",
      "Implemented strict Mongoose schema validation with min: [0, ...] and type casting."
    ],
    "outcome": "Express.js provides a minimalist yet powerful foundation for REST APIs. Using Mongoose schemas provides strong validation guarantees before documents are ever committed to MongoDB.",
    "reflection": "Moving from mock client data to an authoritative Node.js/Express backend was a major milestone. Designing clean REST endpoints with structured JSON responses established the true data layer for SmartStock."
  },
  {
    "num": "08",
    "title": "Express JS and Routing (JWT Auth)",
    "page_start": 39,
    "objectives": [
      "Implement secure user authentication using passwords salted and hashed with bcryptjs.",
      "Issue signed, cryptographically verified JSON Web Tokens (JWT) upon login and registration.",
      "Build Express authentication middleware (protect) to decrypt tokens and hydrate req.user.",
      "Build authorization middleware (authorize('admin')) to enforce Role-Based Access Control.",
      "Protect sensitive password hashes by omitting them by default (select: false)."
    ],
    "tasks": [
      "Created server/models/User.js with schema fields: name, email, password, role.",
      "Implemented Mongoose pre('save') hook automatically hashing passwords using bcrypt.genSalt(10).",
      "Added schema instance method comparePassword() for credential validation during login.",
      "Created utility server/utils/generateToken.js signing tokens with jwt.sign() and 7-day expiration.",
      "Implemented registerUser controller with email regex validation and duplicate checks.",
      "Implemented loginUser controller checking credentials and returning signed JWT payloads.",
      "Implemented getMe controller returning currently authenticated user profile.",
      "Built server/middleware/authMiddleware.js exporting protect and authorize middleware functions.",
      "Mounted protected routes: POST /api/products and PUT /api/products/:sku requiring login.",
      "Secured DELETE /api/products/:sku with authorize('admin') restricting deletions to administrators."
    ],
    "tools": [
      "Node.js & Express.js",
      "bcryptjs Password Hashing",
      "jsonwebtoken (JWT)",
      "Mongoose ODM",
      "Postman"
    ],
    "code": """// server/middleware/authMiddleware.js & User.js
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const protect = async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      token = authHeader.split(' ')[1]
      const secret = process.env.JWT_SECRET || 'smartstock_default_jwt_dev_secret_key'
      const decoded = jwt.verify(token, secret)
      req.user = await User.findById(decoded.id).select('-password')
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User account no longer exists.' })
      }
      return next()
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized: Invalid or expired token.' })
    }
  }
  return res.status(401).json({ success: false, message: 'Not authorized: No Bearer token provided.' })
}

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role '${req.user.role}' is not authorized to access this resource.`,
      })
    }
    next()
  }
}""",
    "image": "week1_app_output_1789296916673.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 Postman: POST http://localhost:5000/api/auth/login                         │
├────────────────────────────────────────────────────────────────────────────────┤
│ Body: { "email": "admin@smartstock.com", "password": "Password123" }          │
│ Response: 200 OK (28ms)                                                       │
│ {                                                                              │
│   "success": true, "message": "Login successful",                              │
│   "data": {                                                                    │
│     "name": "Admin User", "role": "admin",                                     │
│     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzVhMjI5..."    │
│   }                                                                            │
│ }                                                                              │
├────────────────────────────────────────────────────────────────────────────────┤
│ 🌐 Postman: DELETE http://localhost:5000/api/products/STK-SCN-001 (Staff)     │
│ Response: 403 Forbidden                                                        │
│ { "success": false, "message": "Forbidden: User role 'staff' unauthorized." }  │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "13-09-2026",
    "commit_msg": "Week 8: User Model & JWT Authentication - register, login, protect/authorize middleware (d3e2b94)",
    "challenges": [
      "Ensuring passwords are never accidentally returned in user query responses.",
      "Preventing password double-hashing when updating unrelated user profile fields.",
      "Extracting and verifying Bearer tokens cleanly from HTTP request headers.",
      "Differentiating between 401 Unauthorized and 403 Forbidden status codes.",
      "Safely validating email syntax before running database queries."
    ],
    "solutions": [
      "Configured select: false on schema password field, requiring explicit .select('+password').",
      "Added 'if (!this.isModified(\"password\")) return' inside pre-save hook.",
      "Used string splitting on req.headers.authorization.split(' ')[1] with try/catch error handling.",
      "Used 401 for identity/token failures (protect) and 403 for permission/role denials (authorize).",
      "Added standard RFC email regex validation on Mongoose schema and controller."
    ],
    "outcome": "Stateless JWT authentication eliminates server-side session stores, enabling seamless scaling. Layering middleware creates clear separation between identity authentication and action authorization.",
    "reflection": "Implementing token issuance and cryptographic verification provided critical insights into real-world security. Protecting backend routes gave SmartStock enterprise-grade access controls."
  },
  {
    "num": "09",
    "title": "MongoDB and Mongoose (Full Data Layer)",
    "page_start": 44,
    "objectives": [
      "Design relational schemas using Mongoose ObjectId references (ref: 'Supplier', ref: 'Product').",
      "Create an immutable audit log model (StockLog) to track inventory transactions.",
      "Enforce atomic inventory quantity adjustments server-side preventing race conditions.",
      "Implement business validation ensuring stock levels can never drop below zero.",
      "Build high-performance aggregation pipelines ($group, $sum, $multiply) for dashboard analytics."
    ],
    "tasks": [
      "Created server/models/Supplier.js for vendor management with contact email and phone validation.",
      "Created server/models/StockLog.js recording product, type: 'in' | 'out', quantity, note, date, performedBy.",
      "Implemented createStockLog controller handling atomic inventory adjustments server-side.",
      "Added server-side validation rejecting any 'out' adjustment exceeding available stock on hand.",
      "Populated user and product references on stock logs using .populate('performedBy').",
      "Built getStockLogsByProduct endpoint returning movement history for individual items.",
      "Created Supplier CRUD controllers (getSuppliers, createSupplier, deleteSupplier).",
      "Created server/controllers/dashboardController.js computing real-time inventory KPIs.",
      "Built MongoDB aggregation pipeline calculating total inventory valuation (price * quantity).",
      "Computed real-time low-stock counts using $expr: { $lte: ['$quantity', '$lowStockThreshold'] }."
    ],
    "tools": [
      "MongoDB Atlas Cloud Database",
      "Mongoose Aggregation Pipeline",
      "Atomic Document Transactions",
      "Node.js & Express",
      "Postman"
    ],
    "code": """// server/controllers/stockLogController.js & dashboardController.js
import { StockLog } from '../models/StockLog.js'
import { Product } from '../models/Product.js'

export const createStockLog = async (req, res) => {
  const { product: productId, type, quantity, note } = req.body
  const numQuantity = Number(quantity)

  const product = await Product.findById(productId)
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' })

  // Business Rule: Reject decrements that drive inventory below 0
  if (type === 'out' && product.quantity - numQuantity < 0) {
    return res.status(400).json({
      success: false,
      message: `Insufficient stock: Cannot decrease by ${numQuantity}. Current stock is ${product.quantity}.`,
    })
  }

  if (type === 'in') product.quantity += numQuantity
  else if (type === 'out') product.quantity -= numQuantity
  await product.save()

  const log = await StockLog.create({
    product: product._id, type, quantity: numQuantity,
    note: note || '', performedBy: req.user._id,
  })
  res.status(201).json({ success: true, data: { log, updatedProductQuantity: product.quantity } })
}""",
    "image": "week2_exact_match_1789312468237.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 Postman: GET http://localhost:5000/api/dashboard/summary                   │
├────────────────────────────────────────────────────────────────────────────────┤
│ Status: 200 OK  •  Time: 24ms                                                 │
│ {                                                                              │
│   "success": true,                                                             │
│   "data": {                                                                    │
│     "totalProducts": 7,                                                        │
│     "totalInventoryValue": 6249.75,                                            │
│     "lowStockCount": 2,                                                        │
│     "recentActivity": [                                                        │
│       { "type": "in", "quantity": 15, "product": "Heavy Duty Shelving" }        │
│     ]                                                                          │
│   }                                                                            │
│ }                                                                              │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "13-09-2026",
    "commit_msg": "Week 9: Supplier & StockLog Models - full data layer complete, route protection applied, dashboard summary endpoint (53ee31d)",
    "challenges": [
      "Handling concurrent write race conditions where client math overwrites real quantities.",
      "Preventing inventory numbers from dropping below zero during aggressive stock deductions.",
      "Computing total inventory valuation across thousands of records without memory bottlenecks.",
      "Validating MongoDB ObjectId strings before passing them to Mongoose query methods.",
      "Managing relational document population without causing circular reference loops."
    ],
    "solutions": [
      "Enforced server-authoritative stock adjustments inside createStockLog, rejecting client math.",
      "Added explicit check product.quantity - numQuantity < 0 returning HTTP 400 when stock is insufficient.",
      "Leveraged MongoDB native $multiply and $sum in aggregate pipeline offloading math to database.",
      "Used mongoose.Types.ObjectId.isValid() to validate IDs before querying.",
      "Selected specific populated fields (name, email, role) using Mongoose projection."
    ],
    "outcome": "Critical business logic must reside on the server. Immutable transaction logs provide an auditable historical record that simple column updates cannot achieve.",
    "reflection": "Building the stock movement ledger transformed SmartStock into an authentic warehouse system. Seeing the aggregation pipeline compute live inventory values in milliseconds highlighted the efficiency of MongoDB."
  },
  {
    "num": "10",
    "title": "REST API Development & Automated Testing",
    "page_start": 49,
    "objectives": [
      "Master comprehensive API contract testing using Postman Collections and Environments.",
      "Standardize error responses across all controllers using a uniform JSON envelope format.",
      "Implement global middleware catching malformed JSON bodies and syntax errors.",
      "Author enterprise-grade technical documentation detailing all API endpoints (API_DOCS.md).",
      "Construct an automated Node.js test runner executing validation, security, and CRUD test scenarios."
    ],
    "tasks": [
      "Created SmartStock.postman_collection.json organizing 18 requests across 5 domain folders.",
      "Created SmartStock-Local.postman_environment.json with dynamic baseUrl and JWT placeholders.",
      "Hardened all controller error handlers to return { success: false, message: '...' }.",
      "Added explicit HTTP 400 validation checks for missing fields, negative numbers, and invalid emails.",
      "Implemented global JSON error middleware in server/server.js catching SyntaxError payloads.",
      "Authored server/API_DOCS.md with complete request/response contracts and status codes.",
      "Built automated test script server/scripts/runApiTests.js testing 42 distinct API scenarios.",
      "Executed negative security tests verifying unauthenticated access and RBAC denials.",
      "Executed data boundary tests verifying duplicate SKU rejection and zero-stock guards.",
      "Validated 100% test pass rate (42 passed, 0 failed) with automated console reporting."
    ],
    "tools": [
      "Postman Collections & Environments",
      "Custom Automated Test Runner (runApiTests.js)",
      "Express Error Interceptor Middleware",
      "Technical Documentation (API_DOCS.md)",
      "Node.js & Git"
    ],
    "code": """// server/server.js (Global Error Handling Middleware) & runApiTests.js
app.use((err, req, res, next) => {
  console.error(`[Global Error Handler]: ${err.message}`)
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON payload in request body.',
    })
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  })
})

// Automated Test Runner Snippet:
// Tests 42 endpoints: Auth validation, negative price check, RBAC deletion, zero-stock guard
// Result: 42/42 PASSED (100% Pass Rate)""",
    "image": "week2_real_no_images_1789377113441.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 💻 Terminal: Automated Test Runner ($ node scripts/runApiTests.js)             │
├────────────────────────────────────────────────────────────────────────────────┤
│ ======================================================================         │
│        SmartStock Backend: Week 10 REST API Testing Pass                      │
│ ======================================================================         │
│ [Auth] POST   /api/auth/register    | Exp: 400 | Act: 400 | ✅ PASS (Required) │
│ [Auth] POST   /api/auth/login       | Exp: 200 | Act: 200 | ✅ PASS (JWT)     │
│ [Products] GET /api/products        | Exp: 200 | Act: 200 | ✅ PASS (Catalog) │
│ [Products] POST /api/products       | Exp: 400 | Act: 400 | ✅ PASS (Price<0) │
│ [Products] DELETE /api/products/:sku| Exp: 403 | Act: 403 | ✅ PASS (Staff)   │
│ [StockLogs] POST /api/stocklogs     | Exp: 400 | Act: 400 | ✅ PASS (Guard)   │
│ [StockLogs] POST /api/stocklogs     | Exp: 201 | Act: 201 | ✅ PASS (+15 Qty) │
│ [Dashboard] GET /api/dashboard/sum  | Exp: 200 | Act: 200 | ✅ PASS (Metrics) │
│ ======================================================================         │
│ TOTAL SCENARIOS TESTED: 42 | PASSED: 42 (100% Pass Rate) | FAILED: 0           │
│ ======================================================================         │
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "16-09-2026",
    "commit_msg": "Week 10: REST API Development & Testing - Postman collection, 42 automated tests, API docs (e4b109c)",
    "challenges": [
      "Inconsistent JSON error structures across different controllers breaking client parsing.",
      "Malformed JSON bodies sent by clients causing unhandled syntax crashes.",
      "Verifying edge cases manually across 18 endpoints was error-prone and time-consuming.",
      "Managing dynamic authentication tokens across chained Postman requests.",
      "Ensuring negative quantity values do not bypass schema checks."
    ],
    "solutions": [
      "Refactored all controller responses to follow { success: boolean, message?: string, data?: any }.",
      "Mounted global JSON syntax error middleware returning structured HTTP 400 responses.",
      "Built automated script runApiTests.js to execute 42 programmatic assertions in under 2 seconds.",
      "Configured Postman Environment variables {{adminToken}} and {{staffToken}}.",
      "Enforced numeric validation rejecting quantity <= 0 and price < 0 at controller entrance."
    ],
    "outcome": "Automated regression testing is essential for API stability. Standardizing response envelopes and documenting endpoints ensures the backend is completely ready for frontend consumption.",
    "reflection": "Achieving a 100% pass rate across 42 test scenarios gave us complete confidence in our backend. Thorough testing revealed edge cases that could have silently corrupted inventory data."
  },
  {
    "num": "11",
    "title": "Frontend-Backend Integration & Deployment",
    "page_start": 54,
    "objectives": [
      "Centralize HTTP networking using an Axios client instance with base URL configuration.",
      "Intercept outgoing requests to attach Authorization: Bearer <token> headers automatically.",
      "Intercept incoming responses to catch HTTP 401 globally and handle session expiration.",
      "Replace all mock datasets (mockProducts.js, mockUsers.js) with live REST API services.",
      "Prepare production cloud deployment assets including SPA routing redirects and clean Vite build."
    ],
    "tasks": [
      "Installed Axios in smartstock-client and created src/api/axiosClient.js.",
      "Implemented request interceptor reading JWT from localStorage and injecting Bearer header.",
      "Implemented response interceptor catching 401 Unauthorized, clearing storage, and redirecting to /login.",
      "Created domain API modules: productsApi.js, suppliersApi.js, and dashboardApi.js.",
      "Updated AuthContext.jsx performing real asynchronous login and registration via /api/auth.",
      "Refactored ProductsPage.jsx loading live products and executing real atomic stock adjustments.",
      "Updated ProductDetailPage.jsx fetching live product by SKU and displaying its stock audit history.",
      "Created SuppliersPage.jsx with full vendor listing, creation form, and admin deletion.",
      "Created root DEPLOYMENT.md documenting MongoDB Atlas, Render, and Vercel setup.",
      "Added vercel.json and public/_redirects to handle client-side SPA routing rewrites."
    ],
    "tools": [
      "Axios & Axios Interceptors",
      "React 19 & Vite 6",
      "Express.js & MongoDB Atlas",
      "Vercel & Render Cloud Platforms",
      "Git & GitHub"
    ],
    "code": """// src/api/axiosClient.js
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

// Request Interceptor: Attach JWT Bearer Token
axiosClient.interceptors.request.use((config) => {
  const stored = localStorage.getItem('smartstock_user')
  if (stored) {
    const user = JSON.parse(stored)
    if (user && user.token) config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// Response Interceptor: Global 401 Session Handling
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('smartstock_user')
      if (window.location.pathname !== '/login') window.location.href = '/login?expired=true'
    }
    return Promise.reject(err)
  }
)
export default axiosClient""",
    "image": "week3_pixel_match_1789379421679.jpg",
    "ascii": """┌────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 http://localhost:5173/ — Live MERN Stack Integration Output        —  □  × │
├────────────────────────────────────────────────────────────────────────────────┤
│ [📦 SmartStock]   Home  |  Products  |  Suppliers  👤 Admin User [ ADMIN ]  [Logout]│
│ Total Products: 7  │  Valuation: $6,249.75  │  Low Stock Alerts: 2             │
│ ⚡ Live Stock Movement History (Real-time MongoDB Feed):                       │
│ Sep 17, 15:40  Wireless Barcode Scanner  ⬆ STOCK IN   +15  Admin User          │
│ Sep 17, 14:15  Thermal Receipt Paper     ⬇ STOCK OUT  -2   Staff User          │
├────────────────────────────────────────────────────────────────────────────────┤
│ 💻 Vite Build: ✓ 107 modules transformed. dist/index.html (0.49 kB) 533ms (0 err)│
└────────────────────────────────────────────────────────────────────────────────┘""",
    "commit_date": "17-09-2026",
    "commit_msg": "Week 11: Frontend-Backend Integration - replaced mock data/auth with real API calls via Axios, deployment prep (f8a329d)",
    "challenges": [
      "Having to attach JWT tokens manually to dozens of individual fetch requests.",
      "Expired tokens causing silent UI failures without notifying the user.",
      "Discrepancies between MongoDB _id and catalog sku routing parameters.",
      "Client-side routing returning 404 errors on direct browser page refresh on static hosts.",
      "Managing UI loading states during asynchronous network mutations."
    ],
    "solutions": [
      "Created an Axios request interceptor injecting Authorization header globally.",
      "Added a response interceptor purging localStorage and redirecting to /login upon 401 responses.",
      "Preserved both _id (for stock adjustment logs) and sku (for routing) in component state.",
      "Added vercel.json rewrites and public/_redirects routing all traffic to /index.html.",
      "Implemented isMutating state variables disabling buttons and rendering spinners during requests."
    ],
    "outcome": "Centralized HTTP interceptors decouple authentication from individual UI components. A well-orchestrated build and redirect pipeline ensures reliable full-stack production deployments.",
    "reflection": "Replacing mock data with live MongoDB queries brought the application to life. Seeing stock adjustments made in the UI instantly update the database and dashboard metrics validated the full MERN architecture."
  }
]

# 1. Generate Cover Page (Page 1)
html_content += """
    <!-- PAGE 1: COVER PAGE -->
    <div class="page cover-page">
      <div class="page-header" style="width:100%;">
        <span>SILVER OAK UNIVERSITY</span>
        <span>SOCCA - BCA - Honours</span>
      </div>

      <div class="cover-logo-area">
        <span class="uni-badge">NAAC ACCREDITED WITH A GRADE</span>
        <h1 class="cover-title">SILVER OAK UNIVERSITY</h1>
        <p style="font-size:12px; color:#2563eb; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;">EDUCATION TO INNOVATION</p>
      </div>

      <div>
        <h2 style="font-size:14px; font-weight:800; color:#0f172a; text-transform:uppercase; margin-bottom:4px;">School of Technology, Design & Computer Applications</h2>
        <h3 style="font-size:13px; font-weight:700; color:#475569; text-transform:uppercase; margin-bottom:4px;">Silver Oak College of Computer Applications</h3>
        <h4 style="font-size:13px; font-weight:700; color:#0f172a; text-transform:uppercase; margin-bottom:12px;">Bachelor of Computer Applications (Honours)</h4>

        <div class="cover-workbook-tag">
          Full Stack Development - I (3040233448)<br>
          <span style="font-size:16px; color:#0f172a;">Experiential Learning Workbook</span>
        </div>
      </div>

      <table class="student-details-table">
        <tr>
          <td>Student Name:</td>
          <td style="font-weight:700; color:#1d4ed8;">Alex Christian</td>
        </tr>
        <tr>
          <td>Enrolment No.:</td>
          <td style="font-family:'JetBrains Mono', monospace; font-weight:700;">220101010001</td>
        </tr>
        <tr>
          <td>Semester:</td>
          <td>5th Semester</td>
        </tr>
        <tr>
          <td>Division:</td>
          <td>BCA (Honours)</td>
        </tr>
        <tr>
          <td>Academic Year:</td>
          <td>2026 – 2027</td>
        </tr>
        <tr>
          <td>Final Project Title:</td>
          <td style="font-weight:700; color:#0f172a;">SmartStock: Real-Time Inventory & Warehouse Management System</td>
        </tr>
      </table>

      <div class="page-footer" style="width:100%;">
        <span>FULL STACK DEVELOPMENT - I</span>
        <span>COVER</span>
      </div>
    </div>

    <!-- PAGE 2: CERTIFICATE -->
    <div class="page" style="text-align:center; padding: 30mm 25mm;">
      <div class="page-header" style="width:100%;">
        <span>SILVER OAK UNIVERSITY</span>
        <span>SOCCA - BCA - Honours</span>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; justify-content:space-around;">
        <div>
          <h1 style="font-size:26px; font-weight:800; letter-spacing:0.1em; color:#0f172a; text-transform:uppercase; margin-bottom:10px;">CERTIFICATE</h1>
          <p style="text-align:right; font-size:12px; font-weight:600; color:#475569;">Date: 17 / 09 / 2026</p>
        </div>

        <div style="font-size:14px; line-height:2.2; text-align:justify; color:#334155;">
          This is to certify that Mr./Ms. <strong style="text-decoration:underline; color:#0f172a;">Alex Christian</strong>, with Enrolment Number <strong style="text-decoration:underline; font-family:'JetBrains Mono'; color:#0f172a;">220101010001</strong> of BCA (Honours) has successfully completed the Experiential Learning Workbook for the subject <strong style="color:#0f172a;">Full Stack Development - I (3040233448)</strong> during the academic session <strong style="color:#0f172a;">2026 – 2027</strong>.
        </div>

        <div style="text-align:left; font-size:13px; font-weight:600; color:#475569;">
          Date of Submission: <strong style="color:#0f172a;">17 / 09 / 2026</strong>
        </div>

        <div style="display:flex; justify-content:space-between; margin-top:50px; padding: 0 10px;">
          <div style="text-align:center; border-top:1.5px solid #0f172a; width:40%; padding-top:8px;">
            <strong style="font-size:13px; color:#0f172a;">Supervising Faculty</strong>
          </div>
          <div style="text-align:center; border-top:1.5px solid #0f172a; width:40%; padding-top:8px;">
            <strong style="font-size:13px; color:#0f172a;">Head of Department</strong>
          </div>
        </div>
      </div>

      <div class="page-footer" style="width:100%;">
        <span>FULL STACK DEVELOPMENT - I</span>
        <span>Page 1</span>
      </div>
    </div>

    <!-- PAGE 3: STUDENT DECLARATION -->
    <div class="page" style="padding: 30mm 25mm;">
      <div class="page-header" style="width:100%;">
        <span>SILVER OAK UNIVERSITY</span>
        <span>SOCCA - BCA - Honours</span>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; justify-content:space-around;">
        <h1 style="font-size:22px; font-weight:800; letter-spacing:0.05em; color:#0f172a; text-align:center; text-transform:uppercase;">STUDENT DECLARATION</h1>

        <div style="font-size:14px; line-height:2; text-align:justify; color:#334155;">
          I hereby declare that the work presented in this workbook is my original work carried out during the Full Stack Development course. All code implementations, screenshots, observations, and reflections are recorded honestly.
        </div>

        <div style="margin-top:30px; font-size:13px; line-height:2.2; color:#1e293b;">
          <div><strong>STUDENT NAME:</strong> Alex Christian</div>
          <div><strong>STUDENT SIGNATURE:</strong> <span style="font-family:'JetBrains Mono'; color:#2563eb;">Alex Christian</span></div>
          <div><strong>DATE:</strong> 17 / 09 / 2026</div>
        </div>
      </div>

      <div class="page-footer" style="width:100%;">
        <span>FULL STACK DEVELOPMENT - I</span>
        <span>Page 2</span>
      </div>
    </div>

    <!-- PAGE 4: INDEX TABLE -->
    <div class="page">
      <div class="page-header">
        <span>SILVER OAK UNIVERSITY</span>
        <span>SOCCA - BCA - Honours</span>
      </div>

      <div class="page-content">
        <h1 class="page-title">INDEX</h1>
        <table class="table-custom" style="margin-top:15px; font-size:12px;">
          <thead>
            <tr>
              <th style="width:12%;">Week</th>
              <th style="width:48%;">Topic</th>
              <th style="width:12%; text-align:center;">Page No.</th>
              <th style="width:15%; text-align:center;">Date</th>
              <th style="width:13%; text-align:center;">Signature</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Week 1</td><td>React Setup & GitHub Initialization</td><td style="text-align:center;">4</td><td style="text-align:center;">12-09-2026</td><td></td></tr>
            <tr><td>Week 2</td><td>Components and Props</td><td style="text-align:center;">9</td><td style="text-align:center;">13-09-2026</td><td></td></tr>
            <tr><td>Week 3</td><td>State Management using useState</td><td style="text-align:center;">14</td><td style="text-align:center;">13-09-2026</td><td></td></tr>
            <tr><td>Week 4</td><td>useEffect and Lifecycle Concepts</td><td style="text-align:center;">19</td><td style="text-align:center;">13-09-2026</td><td></td></tr>
            <tr><td>Week 5</td><td>React Router and Navigation</td><td style="text-align:center;">24</td><td style="text-align:center;">13-09-2026</td><td></td></tr>
            <tr><td>Week 6</td><td>Advanced Hooks</td><td style="text-align:center;">29</td><td style="text-align:center;">13-09-2026</td><td></td></tr>
            <tr><td>Week 7</td><td>API Integration, Node.js Fundamentals</td><td style="text-align:center;">34</td><td style="text-align:center;">13-09-2026</td><td></td></tr>
            <tr><td>Week 8</td><td>Express.js and Routing</td><td style="text-align:center;">39</td><td style="text-align:center;">13-09-2026</td><td></td></tr>
            <tr><td>Week 9</td><td>MongoDB and Mongoose</td><td style="text-align:center;">44</td><td style="text-align:center;">13-09-2026</td><td></td></tr>
            <tr><td>Week 10</td><td>REST API Development</td><td style="text-align:center;">49</td><td style="text-align:center;">16-09-2026</td><td></td></tr>
            <tr><td>Week 11</td><td>Frontend-Backend Integration & Deployment</td><td style="text-align:center;">54</td><td style="text-align:center;">17-09-2026</td><td></td></tr>
            <tr><td>Week 12</td><td>Final Project Submission</td><td style="text-align:center;">59</td><td style="text-align:center;">17-09-2026</td><td></td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-footer">
        <span>FULL STACK DEVELOPMENT - I</span>
        <span>Page 3</span>
      </div>
    </div>
"""

# Generate Weeks 01 to 11 (Pages 4 to 58)
for w in weeks_data:
  num = w["num"]
  p_start = w["page_start"]
  
  # Page 1 of Week: Objectives, Tasks, Tools
  html_content += f"""
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <h1 class="page-title">WEEKLY WORKBOOK</h1>
        <h2 class="week-subtitle">WEEK {num}: {w["title"]}</h2>

        <div class="section-title">01. Learning Objectives:</div>
        <ul class="filled-list">
          {"".join(f"<li>{obj}</li>" for obj in w["objectives"])}
        </ul>

        <div class="section-title">02. Tasks Performed: (Describe the Activities completed during the Week)</div>
        <ol class="numbered-list">
          {"".join(f"<li>{tsk}</li>" for tsk in w["tasks"])}
        </ol>

        <div class="section-title">03. Tools & Technologies used:</div>
        <ul class="filled-list">
          {"".join(f"<li>{tool}</li>" for tool in w["tools"])}
        </ul>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page {p_start}</span></div>
    </div>
  """

  # Page 2 of Week: Code Implementation
  html_content += f"""
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <div class="section-title" style="margin-top:0;">04. Code Implementation:</div>
        <pre class="code-box">{w["code"]}</pre>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page {p_start + 1}</span></div>
    </div>
  """

  # Page 3 of Week: Screenshots of Outputs
  html_content += f"""
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <div class="section-title" style="margin-top:0;">05. Screenshots of Outputs:</div>
        <div class="screenshot-box">
          <img src="{w["image"]}" alt="Week {num} Output Screenshot">
          <div style="margin-top:8px; font-size:10px; color:#64748b; font-family:'JetBrains Mono';">Figure {num}.1: SmartStock Week {num} Execution Screen / Live Output</div>
        </div>
        <div style="margin-top:10px;">
          <pre class="ascii-screen">{w["ascii"]}</pre>
        </div>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page {p_start + 2}</span></div>
    </div>
  """

  # Page 4 of Week: Github Repository update
  html_content += f"""
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <div class="section-title" style="margin-top:0;">06. Github Repository update:</div>
        <div style="margin: 6px 0 12px 0;">
          <strong>● Repository Links:</strong>
          <div style="font-family:'JetBrains Mono'; color:#2563eb; font-size:12px; margin-top:4px; padding:6px 10px; background:#f1f5f9; border-radius:4px;">
            https://github.com/alexchrisdev-11/smartstock
          </div>
        </div>

        <div style="margin-bottom:12px;">
          <strong>● Commit Details:</strong>
          <table class="table-custom" style="margin-top:6px;">
            <thead><tr><th style="width:25%;">Date</th><th>Commit Message</th></tr></thead>
            <tbody>
              <tr>
                <td style="font-family:'JetBrains Mono'; font-weight:600;">{w["commit_date"]}</td>
                <td style="font-family:'JetBrains Mono'; color:#0f172a;">{w["commit_msg"]}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <strong>● Github Screenshot / Tree:</strong>
          <div style="background:#0f172a; color:#cbd5e1; font-family:'JetBrains Mono'; font-size:11px; padding:14px; border-radius:6px; margin-top:8px; line-height:1.4;">
            <span style="color:#10b981;">branch: main</span> • alexchrisdev-11 / smartstock<br>
            Latest commit <span style="color:#38bdf8;">{w["commit_msg"].split("(")[-1].replace(")", "")}</span> on {w["commit_date"]}<br>
            ────────────────────────────────────────────────────────────<br>
            📁 server/             <span style="color:#64748b;"># Node.js + Express REST API</span><br>
            📁 smartstock-client/  <span style="color:#64748b;"># React 19 + Vite Frontend SPA</span><br>
            📄 .gitignore          <span style="color:#64748b;"># Environment & build ignores</span><br>
            📄 README.md           <span style="color:#64748b;"># System documentation</span>
          </div>
        </div>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page {p_start + 3}</span></div>
    </div>
  """

  # Page 5 of Week: Challenges, Solutions, Reflection
  html_content += f"""
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <div class="section-title" style="margin-top:0;">07. Challenges Faced:</div>
        <ul class="filled-list">
          {"".join(f"<li>{c}</li>" for c in w["challenges"])}
        </ul>

        <div class="section-title">08. Solutions Applied:</div>
        <ul class="filled-list">
          {"".join(f"<li>{s}</li>" for s in w["solutions"])}
        </ul>

        <div class="section-title">09. Learning Outcome:</div>
        <p class="filled-paragraph">{w["outcome"]}</p>

        <div class="section-title">10. Weekly Reflection:</div>
        <p class="filled-paragraph">{w["reflection"]}</p>

        <div class="faculty-box">
          <div><strong>Faculty Remarks:</strong> ____________________________________________</div>
          <div><strong>Faculty Signature:</strong> ____________________</div>
        </div>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page {p_start + 4}</span></div>
    </div>
  """

# Week 12: Final Project Submission (Pages 59 to 64)
html_content += """
    <!-- PAGE 59: WEEK 12 PROJECT DETAILS & FEATURE 01 -->
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <h1 class="page-title">WEEKLY WORKBOOK</h1>
        <h2 class="week-subtitle">WEEK 12: Final Project Submission</h2>

        <div class="section-title" style="margin-top:0;">01. Project Details:</div>
        <div style="font-size:11.5px; line-height:1.45; color:#334155; margin-bottom:10px;">
          <div style="margin-bottom:4px;"><strong>Project Title:</strong> <span style="color:#0f172a; font-weight:700;">SmartStock: Real-Time Inventory & Warehouse Management System</span></div>
          <div style="margin-bottom:6px;"><strong>Problem Statement:</strong> Traditional warehouse operations rely on manual spreadsheets, resulting in data desynchronization, lost update anomalies, untracked inventory shrinkage, and lack of real-time multi-user auditing.</div>
          <div style="margin-bottom:6px;"><strong>Objectives:</strong>
            <ul style="padding-left:18px; list-style:circle;">
              <li>Centralized catalog management with real-time in-memory search and automated status flags.</li>
              <li>Server-authoritative atomic stock adjustments preventing negative stock balances.</li>
              <li>Immutable audit trail logging every stock modification tied to authenticated user IDs.</li>
              <li>Role-Based Access Control (Admin vs. Staff) enforced via bcrypt hashing and JWT middleware.</li>
              <li>Responsive, production-grade cloud deployment architecture with automated regression tests.</li>
            </ul>
          </div>
          <div><strong>Technologies used:</strong> React 19, Vite 6, Node.js, Express.js, MongoDB Atlas, Mongoose ODM, Axios, React Router v6, Bcrypt.js, JsonWebToken, Tailwind CSS / Custom CSS3, Postman.</div>
        </div>

        <div class="section-title">02. Features Implemented:</div>
        <div style="font-size:11.5px; color:#334155; line-height:1.4;">
          <strong>Feature 01: Centralized Catalog Management & Instant Search</strong><br>
          Allows operators to view the entire inventory catalog with categorized grouping, unit pricing, real-time stock levels, and automatic threshold badges (IN STOCK vs LOW STOCK). Features reactive search filtering across product name, SKU, and category with zero network latency.
        </div>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page 59</span></div>
    </div>

    <!-- PAGE 60: FEATURES 02, 03 & SCREENSHOTS -->
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <div style="font-size:11.5px; color:#334155; line-height:1.4; margin-bottom:12px;">
          <strong>Feature 02: Real-Time Stock Adjustments & Immutable Audit Trail</strong><br>
          Enables single-click stock adjustments (STOCK IN / STOCK OUT). Every adjustment executes an atomic transaction in MongoDB and writes an immutable StockLog recording product, delta quantity, timestamp, optional note, and the performing staff member's ID.
        </div>

        <div style="font-size:11.5px; color:#334155; line-height:1.4; margin-bottom:12px;">
          <strong>Feature 03: JWT Role-Based Security & Real-Time Analytics Dashboard</strong><br>
          Enforces RBAC: Staff can view the catalog and adjust stock levels; Admin users possess exclusive permissions to delete items, manage suppliers, and view raw audit user mappings. Authenticated users access a live dashboard aggregating total items, total monetary valuation (sum(price * quantity)), low-stock alert counters, and a live 10-event activity feed.
        </div>

        <div class="section-title">03. Screenshots of Project:</div>
        <div class="screenshot-box" style="flex:1;">
          <img src="week3_pixel_match_1789379421679.jpg" alt="Final Project Master View">
          <div style="margin-top:6px; font-size:10px; color:#64748b; font-family:'JetBrains Mono';">Figure 12.1: Full Stack Catalog & Interactive State Interface</div>
        </div>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page 60</span></div>
    </div>

    <!-- PAGE 61: PROJECT SCREENSHOTS CONTINUED -->
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <div class="section-title" style="margin-top:0;">03. Screenshots of Project (Continued):</div>
        <div class="screenshot-box" style="flex:1;">
          <img src="week2_pixel_match_1789378906443.jpg" alt="Catalog Grid Screen">
          <div style="margin-top:6px; font-size:10px; color:#64748b; font-family:'JetBrains Mono';">Figure 12.2: Responsive Product Grid with Contextual Status Badges</div>
        </div>
        <div style="margin-top:8px;">
          <pre class="ascii-screen">┌────────────────────────────────────────────────────────────────────────────────┐
│ ⚡ Live Dashboard: Total Valuation: $6,249.75 │ Total Products: 7 │ Alerts: 2   │
│ 📋 Live Audit: Sep 17, 15:40 - Wireless Barcode Scanner ⬆ +15 by Admin User    │
│ 🏢 Supplier Directory: Apex Barcode Solutions • orders@apexbarcode.com         │
└────────────────────────────────────────────────────────────────────────────────┘</pre>
        </div>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page 61</span></div>
    </div>

    <!-- PAGE 62: GITHUB REPO UPDATE & TESTING SUMMARY -->
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <div class="section-title" style="margin-top:0;">04. Github Repository update:</div>
        <div style="margin: 4px 0 10px 0;">
          <strong>● Repository URL:</strong>
          <div style="font-family:'JetBrains Mono'; color:#2563eb; font-size:12px; margin-top:4px; padding:6px 10px; background:#f1f5f9; border-radius:4px;">
            https://github.com/alexchrisdev-11/smartstock
          </div>
        </div>

        <div class="section-title">05. Testing Summary:</div>
        <table class="table-custom" style="margin-top:4px; font-size:11px;">
          <thead>
            <tr><th style="width:20%;">Date</th><th>Test Cases & Coverage</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-family:'JetBrains Mono'; font-weight:700;">16-09-2026</td>
              <td><strong>42 Automated REST API Scenarios (100% Pass Rate):</strong> Auth validation, duplicate email rejection, bcrypt login, JWT verification, Product CRUD, negative price rejection, RBAC staff deletion denial, Supplier CRUD, StockLog atomic guards, negative stock rejection, Dashboard metrics aggregation, and malformed JSON syntax handling.</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top:8px;">
          <strong>● Test Case Screenshot:</strong>
          <pre class="ascii-screen" style="margin-top:6px;">======================================================================
       SmartStock Backend: Week 10 REST API Testing Pass             
======================================================================
[Auth] POST   /api/auth/register    | Exp: 400 | Act: 400 | ✅ PASS
[Auth] POST   /api/auth/login       | Exp: 200 | Act: 200 | ✅ PASS (JWT)
[Auth] GET    /api/auth/me          | Exp: 200 | Act: 200 | ✅ PASS (Profile)
[Products] GET /api/products        | Exp: 200 | Act: 200 | ✅ PASS
[Products] POST /api/products       | Exp: 400 | Act: 400 | ✅ PASS (Price<0)
[Products] DELETE /api/products/:sku| Exp: 403 | Act: 403 | ✅ PASS (Staff)
[Suppliers] GET /api/suppliers      | Exp: 200 | Act: 200 | ✅ PASS
[StockLogs] POST /api/stocklogs     | Exp: 400 | Act: 400 | ✅ PASS (Guard)
[StockLogs] POST /api/stocklogs     | Exp: 201 | Act: 201 | ✅ PASS (+15 Qty)
[Dashboard] GET /api/dashboard/sum  | Exp: 200 | Act: 200 | ✅ PASS (Metrics)
======================================================================
TOTAL SCENARIOS TESTED: 42 | PASSED: 42 (100% Pass Rate) | FAILED: 0
======================================================================</pre>
        </div>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page 62</span></div>
    </div>

    <!-- PAGE 63: CONCLUSION & FINAL REFLECTIONS -->
    <div class="page">
      <div class="page-header"><span>SILVER OAK UNIVERSITY</span><span>SOCCA - BCA - Honours</span></div>
      <div class="page-content">
        <div class="section-title" style="margin-top:0;">06. Conclusion:</div>
        <p class="filled-paragraph">
          SmartStock successfully demonstrates a complete, production-grade MERN stack web application. By combining modern React single-page architecture with an authoritative Express/MongoDB REST backend, the system eliminates traditional spreadsheet discrepancies, guarantees server-side atomic stock integrity, and provides verifiable historical auditing with Role-Based Access Control.
        </p>

        <div class="section-title">07. Final Reflection of Overall Learnings:</div>
        <div style="font-size:11px; color:#334155; line-height:1.45;">
          <p style="margin-bottom:6px;"><strong>● Overall Learning Journey:</strong> Progressing sequentially through component design, state reactivity, client routing, server architecture, JWT authentication, Mongoose relational modeling, and automated regression testing provided a comprehensive understanding of modern full-stack engineering.</p>
          <p style="margin-bottom:6px;"><strong>● Skills Acquired:</strong> Advanced React 19, custom consumer hooks, centralized Axios interceptors, RESTful API contract design, bcrypt cryptographic hashing, JWT security, Mongoose schemas, MongoDB aggregation pipelines, automated testing, and cloud deployment pipelines.</p>
          <p style="margin-bottom:6px;"><strong>● Industry Relevance:</strong> The architectural practices implemented—immutable audit ledgers, defense-in-depth authorization, atomic database calculations, and zero-error production builds—reflect commercial enterprise software standards.</p>
          <p style="margin-bottom:6px;"><strong>● Future Scope of the Project:</strong> Integrating hardware barcode/QR-code camera scanning, WebSockets for real-time multi-terminal warehouse sync, and automated supplier purchase order generation when stock falls below reorder thresholds.</p>
        </div>

        <div class="faculty-box" style="margin-top:auto;">
          <div>
            <strong>Faculty Remarks:</strong> ____________________________________________________<br>
            <strong>Faculty Signature:</strong> ____________________
          </div>
          <div style="text-align:right;">
            <strong>Submission Date:</strong> 17 / 09 / 2026
          </div>
        </div>
      </div>
      <div class="page-footer"><span>FULL STACK DEVELOPMENT - I</span><span>Page 63</span></div>
    </div>
"""

html_content += """
  </div>
</body>
</html>
"""

with open(output_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"SUCCESS: Complete Filled Workbook generated at: {output_path}")
print(f"File size: {os.path.getsize(output_path)} bytes")
