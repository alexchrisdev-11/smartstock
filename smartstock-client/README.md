# SmartStock — Inventory Management System

SmartStock is a modern full-stack web application designed to manage products, stock levels, and suppliers in one place. Built as part of the **Full Stack Development - I (3040233448)** coursework at **Silver Oak University (SOCCA - BCA Honours)**.

---

## 🚀 Progress Roadmap

- [x] **Week 1:** React Setup & GitHub Initialization (Vite + React 19 SPA)
- [x] **Week 2:** Components & Props (`ProductCard`, `ProductList`, `Header`, `Badge`, `prop-types`)
- [x] **Week 3:** State Management using `useState` (Add/Delete products, stock adjustment `+`/`−`, search filter)
- [x] **Week 4:** `useEffect` & Lifecycle Concepts (Simulated async fetch, loading/error states, title sync, `StockClock` cleanup)
- [x] **Week 5:** React Router & Navigation (`react-router-dom`, `<Navbar>`, `HomePage`, `ProductsPage`, `ProductDetailPage`, `NotFoundPage`)
- [ ] **Week 6:** Advanced Hooks (Upcoming)
- [ ] **Week 7:** API Integration & Node.js Fundamentals (Upcoming)
- [ ] **Week 8:** Express.js & Routing (Upcoming)
- [ ] **Week 9:** MongoDB & Mongoose (Upcoming)
- [ ] **Week 10:** REST API Development (Upcoming)
- [ ] **Week 11:** Frontend-Backend Integration & Deployment (Upcoming)
- [ ] **Week 12:** Final Project Submission (Upcoming)

---

## 🛠️ Tech Stack (Current)

* **Frontend Framework:** React 19 (JavaScript)
* **Build Tool:** Vite 8
* **Routing:** React Router v7 (`react-router-dom`)
* **Type Validation:** `prop-types`
* **Styling:** Modular CSS3 (CSS Grid & Flexbox, responsive design)
* **Version Control:** Git & GitHub

---

## 📁 Application Routes

| Path | View Component | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Welcome dashboard, system introduction, quick-action link |
| `/products` | `ProductsPage` | Complete inventory catalog, live statistics, search, stock controls |
| `/products/:sku` | `ProductDetailPage` | Dynamic single product inspector using `useParams()` |
| `*` | `NotFoundPage` | 404 catch-all fallback page |

---

## 💻 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (bundled with Node.js)
* Git

### Installation & Run

1. Open your terminal in the project directory:
   ```bash
   cd smartstock-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Available Scripts

* `npm run dev` — Starts the local development server with Hot Module Replacement (HMR).
* `npm run build` — Compiles and bundles production assets into `dist/`.
* `npm run lint` — Runs `oxlint` for fast code verification.
* `npm run preview` — Previews the production build locally.
