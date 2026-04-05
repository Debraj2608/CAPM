# Express.js Server Learning Project

This folder contains a collection of Express.js servers, each demonstrating different functionalities for handling HTTP requests, working with local JSON data, and integrating with external APIs (NorthWind OData service). Each server is standalone and runs on port 4000 (configured in `config/config.env`), but since they share the same port, only one can run at a time.

## Project Setup
- **Dependencies**: Express.js (web framework), Axios (HTTP client for API calls), Dotenv (environment variables).
- **Configuration**: Environment variables in `config/config.env` (NODE_ENV=Development, PORT=4000).
- **Data**: Local products data in `data/Products.json`.
- **Scripts** (from `package.json`):
  - `npm run dev`: Run with nodemon for development (auto-restart).
  - `npm run start`: Run in production mode.

## Files Overview

### 1. `index.js` (Main Server)
- **Purpose**: Comprehensive server demonstrating basic Express setup, local data handling, and external API integration.
- **Routes**:
  - GET `/`: Returns "Hello Express" in HTML.
  - GET `/api/v1/Products`: Returns local products from `data/Products.json`.
  - POST `/api/v1/Products`: Adds a new product to local data (body: JSON product object).
  - GET `/api/v1/NorthWind/Products`: Fetches products from NorthWind API using async/await.
- **Port**: 4000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node index.js` or `npm run dev` (with nodemon) or `nodemon index.js`.
  3. Test endpoints with curl/Postman (e.g., `curl http://localhost:4000/`).
- **Functionality**: Middleware for JSON parsing, dotenv config, axios instance for API calls.

### 2. `getLocalProducts.js`
- **Purpose**: Demonstrates GET request to retrieve local products data.
- **Routes**:
  - GET `/`: Returns "Hello Express" in HTML.
  - GET `/api/v1/Products`: Returns local products in JSON.
- **Port**: 4000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node getLocalProducts.js` or `nodemon getLocalProducts.js`.
  3. Test: `curl http://localhost:4000/api/v1/Products`.
- **Functionality**: Loads and serves static JSON data from `data/Products.json`.

### 3. `postNewProduct.js`
- **Purpose**: Demonstrates POST request to add new products to local data.
- **Routes**:
  - GET `/`: Returns "Hello Express" in HTML.
  - POST `/api/v1/Products`: Adds new product (body: JSON product object).
- **Port**: 4000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node postNewProduct.js` or `nodemon postNewProduct.js`.
  3. Test: `curl -X POST -H "Content-Type: application/json" -d '{"ProductID": 99, "ProductName": "Test"}' http://localhost:4000/api/v1/Products`.
- **Functionality**: Parses JSON body, pushes to local products array, returns updated data.

### 4. `putProducts.js`
- **Purpose**: Demonstrates PUT request to update existing products in local data.
- **Routes**:
  - PUT `/api/v1/Products/:id`: Updates product by ID (e.g., `ProductID=1`).
- **Port**: 4000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node putProducts.js` or `nodemon putProducts.js`.
  3. Test: `curl -X PUT -H "Content-Type: application/json" -d '{"ProductID": 1, "ProductName": "Updated"}' http://localhost:4000/api/v1/Products/ProductID=1`.
- **Functionality**: Parses ID parameter (field=value), finds and updates matching product.

### 5. `deleteProducts.js`
- **Purpose**: Demonstrates DELETE request to remove products from local data.
- **Routes**:
  - DELETE `/api/v1/Products/:id`: Deletes product by ID (e.g., `ProductID=1`).
- **Port**: 4000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node deleteProducts.js` or `nodemon deleteProducts.js`.
  3. Test: `curl -X DELETE http://localhost:4000/api/v1/Products/ProductID=1`.
- **Functionality**: Filters out the matching product and returns updated list.

### 6. `accessNorthWindProductsService.js`
- **Purpose**: Demonstrates fetching data from external NorthWind OData API using promises.
- **Routes**:
  - GET `/api/v1/NorthWind/Products`: Returns all NorthWind products.
- **Port**: 4000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node accessNorthWindProductsService.js` or `nodemon accessNorthWindProductsService.js`.
  3. Test: `curl http://localhost:4000/api/v1/NorthWind/Products`.
- **Functionality**: Uses axios instance with base URL, fetches and returns JSON data.

### 7. `async-await-accessNorthWindProductsService.js`
- **Purpose**: Demonstrates fetching NorthWind data using async/await for cleaner asynchronous code.
- **Routes**:
  - GET `/api/v1/NorthWind/Products`: Returns all NorthWind products.
- **Port**: 4000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node async-await-accessNorthWindProductsService.js` or `nodemon async-await-accessNorthWindProductsService.js`.
  3. Test: `curl http://localhost:4000/api/v1/NorthWind/Products`.
- **Functionality**: Async route handler with try/catch for error handling.

### 8. `filterDataNorthWindService`
- **Purpose**: Demonstrates filtering external API data using OData query parameters.
- **Routes**:
  - GET `/api/v1/NorthWind/Products/:id`: Filters products (e.g., `SupplierID=2`).
- **Port**: 4000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node filterDataNorthWindService` or `nodemon filterDataNorthWindService`.
  3. Test: `curl http://localhost:4000/api/v1/NorthWind/Products/SupplierID=2`.
- **Functionality**: Parses ID parameter, applies $filter query to NorthWind API.

## General Notes
- All servers use Express middleware for JSON parsing and dotenv for configuration.
- Local data modifications (POST/PUT/DELETE) are in-memory only and reset on restart.
- NorthWind API calls require internet access.
- To stop a server, use Ctrl+C in the terminal.
- Nodemon can be used for auto-restart during development (run `nodemon filename.js` for any server).
- These are learning examples; in production, add validation, authentication, and persistent storage.

## Configuration and Data
- **`config/config.env`**: Environment variables (NODE_ENV, PORT).
- **`data/Products.json`**: Sample products data for local operations.