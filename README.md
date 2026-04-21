# SAP CAP Bookshop Sample Project

A professional demonstration of a bookshop management system built using the SAP Cloud Application Programming Model (CAP). This project implements a full-stack application with a backend service and Fiori-based frontend applications.

## 🚀 Project Structure

The repository is organized into several key modules:

### 1. Core CAP Application (`/CAP-sample`)
This is the primary SAP CAP project implementing the bookshop business logic.

- **`db/`**: Database schema definitions using Core Data Services (CDS).
  - `schema.cds`: Defines the data model including `Books`, `Orders`, `OrderItems`, `OrderLogs`, `Genres`, and `OrderStatus`.
- **`srv/`**: Service layer defining the OData APIs.
  - `CatalogService`: Provides access to the book catalog (Admin restricted).
  - `OrderService`: Handles order placements, cancellations, and PDF generation for users.
- **`app/`**: Frontend applications built with SAPUI5/Fiori.
  - `managebooksandorders`: Administrative UI for managing the book inventory and orders.
  - `createorders`: User-facing UI for placing new book orders, including a custom PDF download feature.
- **`mta.yaml`**: Multi-Target Application configuration for deployment to SAP BTP.

### 2. Learning/Reference Modules
The root directory also contains reference implementations for general Node.js and Express development:
- **`Express/`**: Example implementations using the Express.js framework.
- **`Express-RouterAndController/`**: A structured approach to Express apps using routers and controllers.
- **`Node/`**: Basic Node.js utility and learning examples.

## 🛠️ Tech Stack

- **Backend**: SAP CAP (Node.js)
- **Database**: SAP HANA (Production), SQLite (Development)
- **Frontend**: SAPUI5 / Fiori Elements
- **Language**: CDS (Core Data Services), JavaScript
- **Deployment**: SAP BTP (Business Technology Platform) via MTA
- **Key Libraries**: `pdfkit` (for order PDF generation), `express`

## ⚙️ Getting Started

### Prerequisites
- Node.js (LTS)
- SAP CDS CLI (`npm install -g @sap/cds-dk`)

### Installation
```bash
cd CAP-sample
npm install
```

### Running Locally
```bash
# Start the CAP server
cds watch
```

### Available Scripts
- `npm run start`: Starts the CDS server.
- `npm run watch-createorders`: Starts server and opens the "Create Orders" app.
- `npm run watch-managebooksandorders`: Starts server and opens the "Manage Books & Orders" app.
- `npm run build`: Builds the MTA archive for deployment.

## 🛡️ Security & Roles
The project implements role-based access control (RBAC):
- **Admin**: Full access to the catalog and order management.
- **User**: Access to create and manage their own orders.
