# Express Router and Controller Project

This folder contains an Express.js project demonstrating a router/controller architecture with modular route handling, middleware, and external API integration.

## Project Structure

- `index.js` - Application entry point. Configures Express, loads environment vars, enables JSON parsing, and mounts routers.
- `Router/` - Contains route modules for local products and NorthWind API products.
- `controller/` - Contains controller functions for NorthWind API operations.
- `Middleware/` - Contains shared middleware helpers such as the axios instance for API calls.
- `config/` - Environment configuration files.
- `data/` - Local sample data used by the local products router.

## package.json

- `start`: `set NODE_ENV=production && node index.js`
- `dev`: `nodemon index.js`

The project depends on:
- `express`
- `axios`
- `dotenv`

## Environment

- `config/config.env`
  - `NODE_ENV=Development`
  - `PORT=4000`

The app uses `process.env.PORT` and falls back to `3000` if the environment value is missing.

## Files and Folders

### `index.js`
- Sets up Express and dotenv.
- Enables JSON body parsing with `app.use(json())` and URL-encoded parsing with `express.urlencoded({ extended: false })`.
- Mounts routers:
  - `/api/v1/Products` -> `Router/localProducts.js`
  - `/api/v1/northwind/Products` -> `Router/nwProducts.js`
- Defines a root route (`/`) returning a simple HTML greeting.
- Starts the server on the configured port.

### `Router/localProducts.js`
- Defines routes for local product data stored in `data/Products.json`.
- Routes:
  - `GET /api/v1/Products/` - Returns the full local products JSON.
  - `POST /api/v1/Products/` - Adds a new product to the in-memory local data and returns the updated JSON.
- This router is mounted by `index.js` at `/api/v1/Products`.

### `Router/nwProducts.js`
- Defines routes that delegate work to controller functions in `controller/nwProduct.js`.
- Routes:
  - `GET /api/v1/northwind/Products/` - Returns all NorthWind products.
  - `GET /api/v1/northwind/Products/withSupplier` - Returns NorthWind products with supplier details.
  - `GET /api/v1/northwind/Products/:id` - Filters NorthWind products by a field=value route parameter (for example, `SupplierID=2`).
- This router is mounted by `index.js` at `/api/v1/northwind/Products`.

### `controller/nwProduct.js`
- Contains controller functions used by `Router/nwProducts.js`:
  - `getProducts` - Fetches products from the NorthWind API.
  - `getSupplierDetails` - Fetches products with expanded supplier details.
  - `filterByProperty` - Filters NorthWind products using OData `$filter` based on the path parameter.
- Each function sends JSON responses and handles API errors.

### `Middleware/axiosinstance.js`
- Creates and exports a shared axios instance configured with NorthWind API base URL.
- Used by `controller/nwProduct.js` for external API requests.

### `data/Products.json`
- Contains local product data used for `Router/localProducts.js`.
- This file is read and modified in-memory by the POST route.
- Changes are not persisted to disk by the current code.

## How to Run

### Run normally
1. Open a terminal in this folder.
2. Run:
   - `node index.js`
3. Open in browser or use curl:
   - `http://localhost:4000/`
   - `http://localhost:4000/api/v1/Products`
   - `http://localhost:4000/api/v1/northwind/Products`

### Run with nodemon
1. Open a terminal in this folder.
2. Run:
   - `npm run dev`
   - or `nodemon index.js`
3. The app will restart automatically when files change.

## Example Requests

- Local products: `GET http://localhost:4000/api/v1/Products`
- Add local product: `POST http://localhost:4000/api/v1/Products`
  - Body: JSON product object
- NorthWind products: `GET http://localhost:4000/api/v1/northwind/Products`
- NorthWind products with supplier details: `GET http://localhost:4000/api/v1/northwind/Products/withSupplier`
- Filter NorthWind products: `GET http://localhost:4000/api/v1/northwind/Products/SupplierID=2`

## Notes

- Routers and controllers are separated for cleaner organization.
- Local product modifications are in-memory only and will reset after a restart.
- The NorthWind API routes require internet access.
- Nodemon is recommended for development so the server restarts automatically on changes.
