const express = require('express');
const app = express();
const env = require('dotenv');
const Products_local = require('./data/Products.json'); // imports a local JSON file named Products.json from the data directory 
// and assigns it to the variable Products_local. This allows us to access the data in the JSON file as a JavaScript object.

env.config({
    path: './config/config.env'
});
const PORT = process.env.PORT || 3000;

//GET ROOT
app.get('/', (req, res) => { // defines a route handler for the root URL (/) using the app.get() method. When a GET request is made to 
    // the root URL, the callback function is executed, which takes the request (req) and response (res) objects as parameters.
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1 style = "color:red">Hello Express</h1>');
})

const { json } = require('express');
app.use(json()); // middleware that parses incoming JSON requests and puts the parsed data in req.body. 
// This allows us to access the data sent in the request body as a JavaScript object using req.body in our route handlers. 
// By using app.use(json()), we can easily handle JSON data sent from the client in our Express application.

app.use(express.urlencoded({ extended: false })); // middleware that parses incoming requests with URL-encoded payloads and 
// puts the parsed data in req.body.
// This allows us to access the data sent in the request body as a JavaScript object using req.body in our route handlers. 
// The extended: true option allows for rich objects and arrays to be encoded into the URL-encoded format, which can be useful for 
// handling complex data structures sent from the client.

//Post New Product
app.post('/api/v1/Products', (req, res) => {
    const payload = req.body; // accesses the data sent in the request body and assigns it to the variable payload. 
    // This allows us to work with the data sent from the client in our route handler.
    console.log(payload);
    Products_local.Products.push(payload);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(Products_local)); // sends a response back to the client with the updated Products_local variable 
    // in JSON format. The res.status(200) method sets the HTTP status code of the response to 200, indicating a successful request, 
    // and the res.send() method sends the response back to the client. The JSON.stringify() method is used to convert the JavaScript 
    // object (Products_local) into a JSON string before sending it in the response.
})

//Test API - http://localhost:4000/api/v1/Products - create a POST request to the above URL with a JSON payload to add a new product to 
// the local products data.
// You can use tools like Postman or curl to test the API. The JSON payload should have the same structure as the existing products 
// in the Products.json file, 
// with properties such as "ProductID", "ProductName", "SupplierID", "CategoryID", "QuantityPerUnit", "UnitPrice", "UnitsInStock", 
// "UnitsOnOrder", "ReorderLevel", and "Discontinued".
app.listen(PORT, console.log(`Listening to PORT: ${PORT} in ${process.env.NODE_ENV} mode for new post product`)); // starts the Express server and listens on the specified PORT. 