const express = require('express');
const router = express.Router();// creates a new router object using the Express framework, which allows us to define routes 
// for handling HTTP requests related to products
const data = require('../data/Products.json'); // imports the product data from a JSON file located in the data directory, 
// which contains an array of product objects

router.route('/').get((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data)); // defines a GET route for the root path of the router ('/'), which sends a 
    // response back to the client with the product data in JSON format. The JSON.stringify() method is used to convert the J
    // avaScript object into a JSON string before sending it in the response.
})

router.route('/').post((req,res) => {
    const payload = req.body;
    data.Products.push(payload);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data));
})

module.exports = router; // exports the router object so that it can be used in other parts of the application, 
// such as the main server file (app.js) where it can be mounted on a specific path to handle product-related requests