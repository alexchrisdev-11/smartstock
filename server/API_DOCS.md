# SmartStock REST API Documentation

Comprehensive reference documentation for the **SmartStock Inventory Management REST API** (Node.js + Express + MongoDB).

---

## 1. Overview & Conventions

### Base URL
```
http://localhost:5000
```

### Authentication Header
Endpoints marked as **Protected** or **Admin Only** require an HTTP `Authorization` header with a JSON Web Token (JWT) using the Bearer scheme:
```http
Authorization: Bearer <jwt_token>
```

### Standard Response Envelope

All API endpoints strictly adhere to standardized response envelopes:

#### Success Response (`success: true`)
- **Single Resource / Object Mutation:**
  ```json
  {
    "success": true,
    "message": "Resource created/updated successfully",
    "data": { ... }
  }
  ```
- **Resource List / Collections:**
  ```json
  {
    "success": true,
    "count": 6,
    "data": [ ... ]
  }
  ```

#### Error Response (`success: false`)
Every error response across the entire API follows this exact shape without extra or mismatched keys:
```json
{
  "success": false,
  "message": "Human-readable explanation of why the request failed."
}
```

---

## 2. Authentication (`/api/auth`)

### 2.1 Register User
Creates a new staff or admin user account and issues a JWT token.

- **Method / Path:** `POST /api/auth/register`
- **Access:** Public
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Sarah Staff",
    "email": "sarah.staff@smartstock.com",
    "password": "staff123",
    "role": "staff"
  }
  ```
  *(Note: `role` is optional and defaults to `"staff"`. Accepted roles: `"admin"`, `"staff"`).*
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "65e2a1b2c3d4e5f60718293a",
      "name": "Sarah Staff",
      "email": "sarah.staff@smartstock.com",
      "role": "staff",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Missing fields):
    ```json
    {
      "success": false,
      "message": "Please provide all required fields: name, email, and password."
    }
    ```
  - `400 Bad Request` (Invalid email):
    ```json
    {
      "success": false,
      "message": "Please provide a valid email address."
    }
    ```
  - `400 Bad Request` (Duplicate email):
    ```json
    {
      "success": false,
      "message": "A user account with this email address already exists."
    }
    ```

---

### 2.2 Login User
Authenticates user credentials and returns a signed JWT token.

- **Method / Path:** `POST /api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "admin@smartstock.com",
    "password": "admin123"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "_id": "65e2a1b2c3d4e5f607182930",
      "name": "Admin User",
      "email": "admin@smartstock.com",
      "role": "admin",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Missing credentials):
    ```json
    {
      "success": false,
      "message": "Please provide both email and password."
    }
    ```
  - `401 Unauthorized` (Invalid credentials):
    ```json
    {
      "success": false,
      "message": "Invalid email or password."
    }
    ```

---

### 2.3 Get Current User Profile (`me`)
Returns profile data of the currently logged-in user.

- **Method / Path:** `GET /api/auth/me`
- **Access:** Protected (Requires valid JWT)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "65e2a1b2c3d4e5f607182930",
      "name": "Admin User",
      "email": "admin@smartstock.com",
      "role": "admin",
      "createdAt": "2026-09-13T10:00:00.000Z",
      "updatedAt": "2026-09-13T10:00:00.000Z"
    }
  }
  ```
- **Error Responses:**
  - `401 Unauthorized` (Missing / Invalid Token):
    ```json
    {
      "success": false,
      "message": "Not authorized: No Bearer token provided in Authorization header."
    }
    ```

---

## 3. Products (`/api/products`)

### 3.1 Get All Products
Fetches all products with populated supplier records, sorted newest first.

- **Method / Path:** `GET /api/products`
- **Access:** Public
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "65e2b001a1b2c3d4e5f60701",
        "name": "Wireless Barcode Scanner",
        "sku": "STK-SCN-001",
        "category": "Hardware",
        "price": 89.99,
        "quantity": 24,
        "lowStockThreshold": 5,
        "supplier": {
          "_id": "65e2c001a1b2c3d4e5f60801",
          "name": "Apex Logistics & Supplies",
          "contactEmail": "contact@apexsupplies.com",
          "phone": "+1-800-555-0199"
        },
        "createdAt": "2026-09-13T10:15:00.000Z",
        "updatedAt": "2026-09-13T10:15:00.000Z"
      }
    ]
  }
  ```

---

### 3.2 Get Product by SKU
Retrieves a single product by its unique SKU identifier.

- **Method / Path:** `GET /api/products/:sku`
- **Access:** Public
- **URL Parameters:** `sku` (string, case-insensitive, e.g. `STK-SCN-001`)
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "65e2b001a1b2c3d4e5f60701",
      "name": "Wireless Barcode Scanner",
      "sku": "STK-SCN-001",
      "category": "Hardware",
      "price": 89.99,
      "quantity": 24,
      "lowStockThreshold": 5,
      "supplier": null
    }
  }
  ```
- **Error Responses:**
  - `404 Not Found`:
    ```json
    {
      "success": false,
      "message": "Product with SKU \"STK-UNKNOWN\" not found."
    }
    ```

---

### 3.3 Create Product
Creates a new inventory product.

- **Method / Path:** `POST /api/products`
- **Access:** Protected (Any logged-in user)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Heavy Duty Industrial Shelving",
    "sku": "SHL-HD-990",
    "category": "Storage",
    "price": 249.99,
    "quantity": 10,
    "lowStockThreshold": 5,
    "supplier": "65e2c001a1b2c3d4e5f60801"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Product created successfully",
    "data": {
      "_id": "65e2b002a1b2c3d4e5f60702",
      "name": "Heavy Duty Industrial Shelving",
      "sku": "SHL-HD-990",
      "category": "Storage",
      "price": 249.99,
      "quantity": 10,
      "lowStockThreshold": 5,
      "supplier": {
        "_id": "65e2c001a1b2c3d4e5f60801",
        "name": "Apex Logistics & Supplies"
      }
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Missing required fields):
    ```json
    {
      "success": false,
      "message": "Please provide all required fields: name, sku, category, price, and quantity."
    }
    ```
  - `400 Bad Request` (Negative number):
    ```json
    {
      "success": false,
      "message": "Price must be a non-negative number."
    }
    ```
  - `400 Bad Request` (Duplicate SKU):
    ```json
    {
      "success": false,
      "message": "A product with SKU \"SHL-HD-990\" already exists. SKU must be unique."
    }
    ```

---

### 3.4 Update Product by SKU
Updates fields of an existing product.

- **Method / Path:** `PUT /api/products/:sku`
- **Access:** Protected (Any logged-in user)
- **Request Body:**
  ```json
  {
    "price": 229.99,
    "lowStockThreshold": 8
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Product updated successfully",
    "data": {
      "_id": "65e2b002a1b2c3d4e5f60702",
      "name": "Heavy Duty Industrial Shelving",
      "sku": "SHL-HD-990",
      "price": 229.99,
      "quantity": 10,
      "lowStockThreshold": 8
    }
  }
  ```
- **Error Responses:**
  - `404 Not Found`:
    ```json
    {
      "success": false,
      "message": "Product with SKU \"STK-XYZ\" not found for update."
    }
    ```

---

### 3.5 Delete Product by SKU
Permanently deletes a product from inventory.

- **Method / Path:** `DELETE /api/products/:sku`
- **Access:** Protected & **Admin Only**
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Product with SKU \"SHL-HD-990\" deleted successfully.",
    "data": { ... }
  }
  ```
- **Error Responses:**
  - `403 Forbidden` (Logged in as Staff):
    ```json
    {
      "success": false,
      "message": "Forbidden: User role \"staff\" is not authorized to access this resource."
    }
    ```
  - `404 Not Found`:
    ```json
    {
      "success": false,
      "message": "Product with SKU \"NONEXISTENT\" not found for deletion."
    }
    ```

---

## 4. Suppliers (`/api/suppliers`)

### 4.1 Get All Suppliers
- **Method / Path:** `GET /api/suppliers`
- **Access:** Protected (Any logged-in user)
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "65e2c001a1b2c3d4e5f60801",
        "name": "Apex Logistics & Supplies",
        "contactEmail": "contact@apexsupplies.com",
        "phone": "+1-800-555-0199",
        "address": "450 Industrial Parkway"
      }
    ]
  }
  ```

---

### 4.2 Get Supplier by ID
- **Method / Path:** `GET /api/suppliers/:id`
- **Access:** Protected
- **URL Parameters:** `id` (24-char hex MongoDB ObjectId)
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "65e2c001a1b2c3d4e5f60801",
      "name": "Apex Logistics & Supplies",
      "contactEmail": "contact@apexsupplies.com",
      "phone": "+1-800-555-0199",
      "address": "450 Industrial Parkway"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Malformed ObjectId):
    ```json
    {
      "success": false,
      "message": "Invalid Supplier ID format."
    }
    ```
  - `404 Not Found`:
    ```json
    {
      "success": false,
      "message": "Supplier with ID \"65e2c001a1b2c3d4e5f60800\" not found."
    }
    ```

---

### 4.3 Create Supplier
- **Method / Path:** `POST /api/suppliers`
- **Access:** Protected
- **Request Body:**
  ```json
  {
    "name": "Global Barcode & Logistics Inc",
    "contactEmail": "vendor@globallogistics.com",
    "phone": "+1-800-555-0144",
    "address": "770 Commerce Boulevard, Suite 300"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Supplier created successfully",
    "data": {
      "_id": "65e2c002a1b2c3d4e5f60802",
      "name": "Global Barcode & Logistics Inc",
      "contactEmail": "vendor@globallogistics.com",
      "phone": "+1-800-555-0144",
      "address": "770 Commerce Boulevard, Suite 300"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Missing fields):
    ```json
    {
      "success": false,
      "message": "Please provide all required supplier fields: name, contactEmail, and phone."
    }
    ```
  - `400 Bad Request` (Invalid email format):
    ```json
    {
      "success": false,
      "message": "Please provide a valid contact email address."
    }
    ```

---

### 4.4 Update Supplier
- **Method / Path:** `PUT /api/suppliers/:id`
- **Access:** Protected
- **Request Body:**
  ```json
  {
    "phone": "+1-800-555-0999"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Supplier updated successfully",
    "data": { ... }
  }
  ```

---

### 4.5 Delete Supplier
- **Method / Path:** `DELETE /api/suppliers/:id`
- **Access:** Protected & **Admin Only**
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Supplier \"Global Barcode & Logistics Inc\" deleted successfully.",
    "data": { ... }
  }
  ```
- **Error Responses:**
  - `403 Forbidden` (Logged in as Staff):
    ```json
    {
      "success": false,
      "message": "Forbidden: User role \"staff\" is not authorized to access this resource."
    }
    ```

---

## 5. Stock Logs (`/api/stocklogs`)

### 5.1 Create Stock Adjustment Log
Records an immutable inventory audit log and updates product stock quantity atomically server-side.

- **Method / Path:** `POST /api/stocklogs`
- **Access:** Protected (Any logged-in user)
- **Request Body:**
  ```json
  {
    "product": "65e2b001a1b2c3d4e5f60701",
    "type": "in",
    "quantity": 15,
    "note": "Restock shipment PO-782"
  }
  ```
  *(Note: `type` must be strictly `"in"` or `"out"`. `quantity` must be greater than `0`).*
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Stock received successfully. Product quantity updated to 39.",
    "data": {
      "log": {
        "_id": "65e2d001a1b2c3d4e5f60901",
        "product": {
          "_id": "65e2b001a1b2c3d4e5f60701",
          "name": "Wireless Barcode Scanner",
          "sku": "STK-SCN-001",
          "price": 89.99
        },
        "type": "in",
        "quantity": 15,
        "note": "Restock shipment PO-782",
        "performedBy": {
          "_id": "65e2a001a1b2c3d4e5f60601",
          "name": "Admin User",
          "email": "admin@smartstock.com",
          "role": "admin"
        },
        "date": "2026-09-14T10:30:00.000Z"
      },
      "updatedProductQuantity": 39
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Invalid Product ID format):
    ```json
    {
      "success": false,
      "message": "Invalid Product ID format."
    }
    ```
  - `400 Bad Request` (Insufficient Stock):
    ```json
    {
      "success": false,
      "message": "Insufficient stock: Cannot decrease by 100. Current stock is 39."
    }
    ```
  - `404 Not Found` (Product does not exist):
    ```json
    {
      "success": false,
      "message": "Product with ID \"65e2b001a1b2c3d4e5f60700\" not found."
    }
    ```

---

### 5.2 Get Stock Logs for Product
Returns the chronological audit trail for a specific product.

- **Method / Path:** `GET /api/stocklogs/product/:productId`
- **Access:** Protected
- **URL Parameters:** `productId` (24-char hex MongoDB ObjectId)
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "65e2d001a1b2c3d4e5f60901",
        "type": "in",
        "quantity": 15,
        "note": "Restock shipment PO-782",
        "performedBy": {
          "_id": "65e2a001a1b2c3d4e5f60601",
          "name": "Admin User",
          "email": "admin@smartstock.com",
          "role": "admin"
        },
        "date": "2026-09-14T10:30:00.000Z"
      }
    ]
  }
  ```

---

## 6. Dashboard (`/api/dashboard`)

### 6.1 Get Dashboard Summary
Aggregates high-level inventory metrics and returns the 10 most recent activity logs.

- **Method / Path:** `GET /api/dashboard/summary`
- **Access:** Protected (Any logged-in user)
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "totalProducts": 6,
      "totalInventoryValue": 10438.50,
      "lowStockCount": 3,
      "recentActivity": [
        {
          "_id": "65e2d001a1b2c3d4e5f60901",
          "type": "in",
          "quantity": 15,
          "product": {
            "name": "Wireless Barcode Scanner",
            "sku": "STK-SCN-001",
            "price": 89.99
          },
          "performedBy": {
            "name": "Admin User",
            "role": "admin"
          },
          "date": "2026-09-14T10:30:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Responses:**
  - `401 Unauthorized` (Unauthenticated request):
    ```json
    {
      "success": false,
      "message": "Not authorized: No Bearer token provided in Authorization header."
    }
    ```

---

## 7. HTTP Status Code Reference

| Status Code | Meaning | Typical Usage in SmartStock API |
| :--- | :--- | :--- |
| **`200 OK`** | Request succeeded | `GET`, `PUT`, `DELETE` operations |
| **`201 Created`** | Resource successfully created | `POST /register`, `POST /products`, `POST /suppliers`, `POST /stocklogs` |
| **`400 Bad Request`** | Input validation failure / malformed ID | Missing required fields, invalid email, negative numbers, malformed ObjectId |
| **`401 Unauthorized`** | Missing or invalid authentication token | No Bearer header, expired token, invalid login credentials |
| **`403 Forbidden`** | Authenticated user lacks permission | Staff member attempting `DELETE` on products or suppliers |
| **`404 Not Found`** | Resource does not exist | Unknown SKU or non-existent database ID |
| **`500 Internal Error`** | Unhandled server or database fault | Database connection issues or internal runtime errors |
