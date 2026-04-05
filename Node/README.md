# Node.js Server Learning Project

This folder contains a collection of simple Node.js HTTP servers, each demonstrating a specific functionality extracted from the original `server.js` file. Each server runs on a separate port to allow independent testing without conflicts.

## Files Overview

### 1. `plain-text-server.js`
- **Purpose**: Demonstrates sending a plain text response to HTTP requests.
- **Port**: 3000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node plain-text-server.js`.
  3. (Optional) For development with auto-restart on file changes, run `npx nodemon plain-text-server.js` (uses the locally installed nodemon).
  4. Open a browser or use a tool like curl: `curl http://localhost:3000`.
  5. Expected Response: "Hello World" as plain text.
- **Functionality**: Logs request details (headers, URL, method) and responds with a simple text message.

### 2. `html-server.js`
- **Purpose**: Demonstrates sending an HTML response to HTTP requests.
- **Port**: 3000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node html-server.js`.
  3. (Optional) For development with auto-restart on file changes, run `npx nodemon html-server.js` (uses the locally installed nodemon).
  4. Open a browser: `http://localhost:3000`.
  5. Expected Response: "Hello World" rendered as an H1 heading in HTML.
- **Functionality**: Logs request details and responds with HTML content.

### 3. `json-server.js`
- **Purpose**: Demonstrates sending a JSON response to HTTP requests.
- **Port**: 3000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node json-server.js`.
  3. (Optional) For development with auto-restart on file changes, run `npx nodemon json-server.js` (uses the locally installed nodemon).
  4. Use curl or a REST client: `curl http://localhost:3000`.
  5. Expected Response: A JSON object `{"My message": "Hello World"}`.
- **Functionality**: Logs request details and responds with JSON data.

### 4. `post-echo-server.js`
- **Purpose**: Demonstrates handling POST requests by echoing back the received JSON data.
- **Port**: 3000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node post-echo-server.js`.
  3. (Optional) For development with auto-restart on file changes, run `npx nodemon post-echo-server.js` (uses the locally installed nodemon).
  4. Use a tool like curl or Postman to send a POST request with JSON body: `curl -X POST -H "Content-Type: application/json" -d '{"key": "value"}' http://localhost:3000`.
  5. Expected Response: The sent JSON data echoed back.
- **Functionality**: Collects POST data chunks, parses JSON, and sends it back. For non-POST requests, responds with a welcome message.

### 5. `post-file-server.js`
- **Purpose**: Demonstrates handling POST requests by storing received JSON data (employee records) into a tab-separated text file.
- **Port**: 3000
- **How to Run**:
  1. Open a terminal in this folder.
  2. Run `node post-file-server.js`.
  3. (Optional) For development with auto-restart on file changes, run `npx nodemon post-file-server.js` (uses the locally installed nodemon).
  4. Use a tool like curl or Postman to send a POST request with JSON body containing `employees` array and `fileID`: `curl -X POST -H "Content-Type: application/json" -d '{"employees": [{"FirstName": "John", "LastName": "Doe", "Email": "john@example.com"}], "fileID": "01"}' http://localhost:3000`.
  5. Check the `Files/` folder for a new file (e.g., `01.txt`) with employee data.
  6. Expected Response: JSON message indicating success or if the file already exists.
- **Functionality**: Parses POST JSON, extracts employees and fileID, creates a tab-separated file in `Files/` directory. Prevents overwriting existing files.

## General Notes
- All servers use built-in Node.js modules (`http`, `fs`, `path`) and log request details to the console for debugging.
- Ensure the `Files/` directory exists for `post-file-server.js` (it should, based on your project structure).
- To stop a server, use Ctrl+C in the terminal.
- Nodemon is installed as a dev dependency for auto-restarting the server on file changes. Each server can be run with `npx nodemon filename.js` for development (as noted in each section).
- These are simplified examples for learning; in production, consider adding error handling, security, and using frameworks like Express.js.

## Original File
- `server.js`: The original file containing all functionalities combined. It is not modified and serves as a reference.
- To run with Node.js: `npm run start` (uses `node server.js`).
- To run with nodemon for development: `npm run start-dev` (uses `nodemon server.js`).