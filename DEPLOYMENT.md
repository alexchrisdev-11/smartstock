# SmartStock: Production Deployment & Infrastructure Guide

Comprehensive, step-by-step documentation for deploying the **SmartStock** full-stack inventory management solution (Vite/React frontend, Express/Node.js REST API, and MongoDB Atlas database).

---

## 1. System Architecture Overview

```
                  ┌───────────────────────────────┐
                  │    Client Browser / Device    │
                  └──────────────┬────────────────┘
                                 │
                   HTTPS / JSON  │  Bearer JWT
                                 ▼
        ┌──────────────────────────────────────────────────┐
        │   Vite + React SPA (Vercel / Netlify / Cloud)    │
        │   - Route handling via React Router v6           │
        │   - Centralized Axios API client with interceptors│
        └────────────────────────┬─────────────────────────┘
                                 │
                  REST API Calls │  (VITE_API_BASE_URL)
                                 ▼
        ┌──────────────────────────────────────────────────┐
        │     Express.js API Server (Render / Railway)      │
        │   - JWT Auth & Role Verification (Admin / Staff)  │
        │   - Atomic Stock Log transactions                │
        │   - Input validation & Error envelope middleware │
        └────────────────────────┬─────────────────────────┘
                                 │
                    Mongoose ODM │  TCP Port 27017 (TLS)
                                 ▼
        ┌──────────────────────────────────────────────────┐
        │        MongoDB Atlas Cloud Database              │
        │   - Collections: users, products, suppliers,     │
        │     stocklogs                                    │
        └──────────────────────────────────────────────────┘
```

---

## 2. Environment Variables Reference

### Backend (`server/.env`)

| Variable | Description | Example / Production Value | Required |
| :--- | :--- | :--- | :--- |
| `PORT` | Local network port or bound by host platform | `5000` (Render sets this dynamically) | Optional |
| `MONGO_URI` | MongoDB Atlas cluster connection string | `mongodb+srv://<user>:<pwd>@cluster0.abcde.mongodb.net/smartstock?retryWrites=true&w=majority` | **Yes** |
| `JWT_SECRET` | Cryptographically secure string for signing tokens | `super-secret-key-min-32-chars-long` | **Yes** |
| `JWT_EXPIRES_IN` | Validity window of issued JWT tokens | `7d` (or `24h`) | Optional (defaults to `7d`) |
| `NODE_ENV` | Environment mode | `production` | Recommended |

### Frontend (`smartstock-client/.env`)

| Variable | Description | Example / Production Value | Required |
| :--- | :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Public HTTPS base URL of the deployed Express backend | `https://smartstock-api.onrender.com/api` | **Yes** |

> [!IMPORTANT]
> **Vite Prefix Rule**: All frontend environment variables MUST be prefixed with `VITE_` to be exposed to client-side bundles via `import.meta.env`.

---

## 3. Step-by-Step Deployment Instructions

### Step 1: Database Provisioning (MongoDB Atlas)

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new project named `SmartStock` and deploy a **Shared M0 Free Cluster** in your preferred region.
3. Under **Security → Database Access**:
   - Create a database user (e.g., `smartstock_admin`).
   - Assign the **Read and write to any database** role.
   - Record the generated password.
4. Under **Security → Network Access**:
   - Add IP Access List Entry: `0.0.0.0/0` (Allow access from anywhere) to allow cloud hosting providers (Render, Railway, etc.) to connect.
5. Under **Deployment → Database → Connect**:
   - Select **Drivers** (Node.js).
   - Copy the SRV connection URI:
     ```
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/smartstock?retryWrites=true&w=majority
     ```

---

### Step 2: Backend Deployment (Render.com)

1. Sign in to [Render](https://render.com/) and click **New + → Web Service**.
2. Connect your GitHub repository: `smartstock-client`.
3. Configure the service settings:
   - **Name**: `smartstock-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Expand **Environment Variables** and add:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: *(Your MongoDB Atlas SRV connection string)*
   - `JWT_SECRET`: *(A random 64-character string)*
   - `JWT_EXPIRES_IN`: `7d`
5. Click **Create Web Service**. Wait for the build and deployment logs to display:
   ```
   [MongoDB Connected]: cluster0.mongodb.net
   [Server Status]: SmartStock backend listening on port ...
   ```
6. Copy the assigned URL (e.g., `https://smartstock-api.onrender.com`).
7. Test the API: navigate to `https://smartstock-api.onrender.com/api/products` in your browser. You should receive `{ "success": true, "data": [] }` or a product list.

---

### Step 3: Frontend Deployment (Vercel)

1. Sign in to [Vercel](https://vercel.com/) and click **Add New... → Project**.
2. Import the GitHub repository: `smartstock-client`.
3. Configure Project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `smartstock-client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables**:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://smartstock-api.onrender.com/api` *(replace with your actual Render URL)*
5. Click **Deploy**.
6. When deployment finishes, Vercel provides a production domain (e.g., `https://smartstock-client.vercel.app`).

---

## 4. Single-Page Application (SPA) Routing Configuration

Because SmartStock uses client-side routing via React Router (`/products`, `/products/:sku`, `/suppliers`, `/login`), direct requests or browser refreshes on those URLs will result in a 404 error on static hosts unless redirects are configured.

### For Vercel (`smartstock-client/vercel.json`):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### For Netlify (`smartstock-client/public/_redirects`):
```
/*    /index.html   200
```

---

## 5. Cross-Origin Resource Sharing (CORS)

The SmartStock backend uses Express `cors()` middleware in [`server/server.js`](file:///server/server.js).

In development, requests from `http://localhost:5173` are allowed. For production:
- In `server/server.js`, you can configure CORS to explicitly allow your production frontend origin:
```javascript
import cors from 'cors'

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // e.g. https://smartstock-client.vercel.app
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true)
      }
      return callback(new Error('CORS not allowed for this origin.'))
    },
    credentials: true,
  })
)
```

---

## 6. Post-Deployment Verification Checklist

Execute these checks after deploying to confirm full end-to-end functionality:

- [ ] **Database Connection**: Server logs indicate successful connection to MongoDB Atlas cluster.
- [ ] **User Registration & JWT Login**:
  - Visit `/login` on the live site.
  - Register a new account or log in with demo credentials.
  - Verify that the auth token and profile are saved to `localStorage` and the user badge appears in the navigation bar.
- [ ] **Catalog CRUD**:
  - Add a new product via `AddProductForm`.
  - Verify that the product appears in the product grid immediately.
  - Adjust stock (+ / -) and verify the count updates in real time.
- [ ] **Audit Trail History**:
  - Click "View Details" on any product (`/products/:sku`).
  - Verify that stock adjustments appear in the "Stock Movement Audit History" table with correct timestamp, action, and user.
- [ ] **Supplier Management**:
  - Navigate to `/suppliers`.
  - Add a new supplier and verify immediate rendering.
  - Delete a supplier as an admin user.
- [ ] **Dashboard Metrics**:
  - Navigate to Home (`/`).
  - Verify total catalog items, total valuation calculation, and low-stock indicators reflect the database state.
- [ ] **Browser Console**: Confirm zero unhandled promise rejections, CORS errors, or mixed-content warnings.
- [ ] **Direct URL Refresh**: Refresh the page while on `/products` or `/suppliers` to verify SPA rewrites serve `index.html` without 404s.
