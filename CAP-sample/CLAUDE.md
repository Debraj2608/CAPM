# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Common Tasks
- **Start application**: `npm run start` or `cds watch`
- **Build for production**: `npm run build`
- **Deploy to Cloud Foundry**: `npm run deploy`
- **Run tests**: `npm test` (uses Jest)

### UI Development (CAP/Fiori)
- **Watch Manage Books & Orders**: `npm run watch-managebooksandorders`
- **Watch Create Orders**: `npm run watch-createorders`

## Architecture Overview

This is an SAP Cloud Application Programming Model (CAP) project implementing a Bookshop management system.

### Core Structure
- `db/`: Data model definitions (`schema.cds`).
- `srv/`: Service layer containing OData API definitions (`.cds` files) and custom business logic (`.js` files).
- `app/`: SAP Fiori UI applications.
    - `managebooksandorders`: Admin portal for inventory and order tracking.
    - `createorders`: Customer portal for browsing and purchasing.
- `_i18n/`: Internationalization properties.

### Service Layer
The application is split into two primary services:
1. **CatalogService** (`/service/CatalogService`):
   - **Role**: Administrative.
   - **Access**: Restricted to `Admin`.
   - **Key Entities**: `Books`, `Orders` (read-only), `OrderStatus`.
   - **Key Actions**: `confirmOrder`, `shipOrder`, `deliverOrder`.
2. **OrderService** (`/service/OrderService`):
   - **Role**: Customer-facing.
   - **Access**: Available to `User`.
   - **Key Entities**: `Orders` (user-specific), `Books` (read-only), `OrderItems`.
   - **Key Actions**: `placeOrder`, `cancelOrder`, `downloadPDF` (custom PDF generation).

### Security & Auth
- **Development**: Mocked authentication is configured in `package.json`.
- **Production**: Uses `xsuaa` for authentication and SAP HANA for the database.
- **Authorization**: Defined via `@restrict` and `@requires` annotations in the service definitions.

### Integration
- **PDF Generation**: Custom logic implemented using `pdfkit` in `srv/code/download-PDF.js`.
- **Deployment**: Managed via `mta.yaml` for SAP BTP deployment.
