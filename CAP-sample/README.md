# Bookshop CAP Application

This folder contains the core implementation of the Bookshop management system built using the SAP Cloud Application Programming Model (CAP).

## 📚 Application Overview

The application provides a complete flow for managing a book catalog and processing customer orders. It is split into two primary services:

### 1. Catalog Service (`CatalogService`)
- **Purpose**: Manages the inventory of books and genres. It is also used to manage customer orders.
- **Access**: Restricted to **Admin** users.
- **Key Entities**: `Books`, `Orders` (read-only), `OrderStatus`(read-only).
- **Actions**: Includes administrative actions like `confirmOrder`, `shipOrder`, and `deliverOrder`.

### 2. Order Service (`OrderService`)
- **Purpose**: Allows customers to browse available books and place orders.
- **Access**: Available to **User** roles.
- **Key Features**:
  - Order placement and cancellation.
  - User-specific order history (users can only see their own orders).
  - **PDF Generation**: A custom function `downloadPDF` to generate order summaries.

## 📂 Project Layout

- **`db/`**: Contains the data model (`schema.cds`) defining the relationship between books, orders, and logs.
- **`srv/`**: Contains the service definitions and custom logic for the OData APIs.
- **`app/`**: Contains the SAP Fiori UI applications:
  - `managebooksandorders`: Admin portal for inventory and order tracking.
  - `createorders`: Customer portal for purchasing books.

## 🛠️ Development Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the project**:
   ```bash
   cds watch
   ```

3. **Test with Mock Users**:
   The project is configured with mocked authentication for development:
   - `admin` / `admin` (Admin & User roles)
   - `user` / `user` (User role)
