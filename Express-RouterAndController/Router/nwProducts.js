const express = require('express');
const router = express.Router();// creates a new router object using the Express framework, which allows us to define routes
const axios_instance = require('../Middleware/axiosinstance'); // imports the Axios instance from the Middleware directory, which is configured to make HTTP requests to the NorthWind API
const { getSupplierDetails, getProducts, filterByProperty } = require('../controller/nwProduct');


// ----- IMP**** Uncomment below code to test but remember to comment the code calling the controller below
// router.route('/').get(async (req, res) => {
//     try{
//         const results = await axios_instance.get('/Products'); // makes a GET request to the '/Products' endpoint 
//         // of the NorthWind API using the Axios instance
//         res.setHeader('Content-Type', 'application/json'); // sets the Content-Type header of the response to 'application/json', indicating that the response will be in JSON format
//         res.status(200).send(JSON.stringify(results.data.value)); // sends a response back to the client with the product data in JSON format. The JSON.stringify() method is used to convert the JavaScript object into a JSON string before sending it in the response.
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching data from NorthWind API');
//     }

// }); // defines a GET route for the root path of the router ('/'), which will handle requests to fetch product data 
// // from the NorthWind API

router.route('/').get(getProducts);

router.route('/withSupplier').get(getSupplierDetails);

router.route('/:id').get(filterByProperty);

module.exports = router; // exports the router object so that it can be used in other parts of the application