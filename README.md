# SmartStock — Inventory Management System

SmartStock is a full-stack inventory management web application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Structure

```text
smartstock/
├── server/               # Backend REST API (Node.js + Express + MongoDB)
│   ├── config/           # Database connection configuration
│   ├── controllers/      # Route controllers and business logic
│   ├── models/           # Mongoose schemas and data models
│   ├── routes/           # Express API route definitions
│   ├── .env.example      # Environment variable template
│   ├── package.json      # Backend dependencies and scripts
│   └── server.js         # Backend entry point
│
└── smartstock-client/    # Frontend Single Page Application (React + Vite)
    ├── src/
    │   ├── components/   # Reusable UI components (Navbar, ProductCard, etc.)
    │   ├── context/      # React Context (AuthContext for global auth state)
    │   ├── data/         # Mock data sources
    │   ├── hooks/        # Custom React hooks (useAuth)
    │   ├── pages/        # Page components (HomePage, ProductsPage, etc.)
    │   ├── App.jsx       # Root router & layout
    │   └── main.jsx      # React DOM entry point
    ├── package.json      # Frontend dependencies and scripts
    └── vite.config.js    # Vite configuration
```

## Getting Started

### 1. Backend Setup (`/server`)

1. Open a terminal and navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

### 2. Frontend Setup (`/smartstock-client`)

1. Open another terminal and navigate to the client folder:
   ```bash
   cd smartstock-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend app will run on `http://localhost:5173`.
