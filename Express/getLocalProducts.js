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

//Get Local Products
app.get('/api/v1/Products', (req, res) => { // defines a route handler for the URL /api/v1/Products using the app.get() method. When a GET request is made to this URL, the callback function is executed, which takes the request (req) and response (res) objects as parameters.
    res.setHeader('Content-Type', 'application/json'); // sets the Content-Type header of the response to 'application/json', indicating that the response will be in JSON format
    res.status(200).send(JSON.stringify(Products_local)); // sends a response back to the client with the data from the Products_local variable in JSON format. The res.status(200) method sets the HTTP status code of the response to 200, indicating a successful request, and the res.send() method sends the response back to the client. The JSON.stringify() method is used to convert the JavaScript object (Products_local) into a JSON string before sending it in the response.
});

//Test API - http://localhost:4000/api/v1/Products - create a GET request to the above URL to get the local products data in JSON format. 
// You can use tools like Postman or curl to test the API.

app.listen(PORT, console.log(`Listening to PORT: ${PORT} in ${process.env.NODE_ENV} mode`)); // starts the Express server and listens on the specified PORT. 