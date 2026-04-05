const express = require('express');
const app = express();
const env = require('dotenv');
const axios = require('axios'); // imports the axios library, which is a popular HTTP client for making requests to external APIs. 
// It allows us to send HTTP requests and handle responses in a simple and efficient way.

env.config({
    path: './config/config.env'
});
const PORT = process.env.PORT || 3000;

const axios_instance = axios.create({
    baseURL: 'https://services.odata.org/v4/northwind/northwind.svc',
})
//Access NorthWind Products Service
app.get('/api/v1/NorthWind/Products', (req, res) => {

    // Below are multiple modes. Please refer to code in line 19 and comment and uncomment individual modes before testing. 

    // Mode 1 - Using Axios to fetch data from the NorthWind Products API and send it back to the client in JSON format.

    // axios.get('https://services.odata.org/v4/northwind/northwind.svc/Products?$format=json')
    // .then((results) => {
    //     console.log(results);
    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).send(JSON.stringify(results.data.value));
    // })

    //Mode 2 - Using the Axios instance to fetch data from the NorthWind Products API and send it back to the client in JSON format.
    axios_instance.get('/Products').then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(results.data.value));
    })

    // Mode 3 - Using Async/ Await in file - async-await - accessNorthWindProductsService.js
})
//Test API - http://localhost:4000/api/v1/NorthWind/Products - create a GET request to the above URL to get the NorthWind products 
// data in JSON format. 
// You can use tools like Postman or curl to test the API.

app.listen(PORT, console.log(`Listening to PORT: ${PORT} in ${process.env.NODE_ENV} mode for get northwind service`)); // starts the Express server and listens on the specified PORT. 