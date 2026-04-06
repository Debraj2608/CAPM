const express = require('express');
const app = express();
const env = require('dotenv');
const axios = require('axios');
const Products_local = require('./data/Products.json');
const localProduct = require('./Router/localProducts');
const nwProducts = require('./Router/nwProducts');

env.config({
    path: './config/config.env'
});

// Add middleware BEFORE mounting routers
const { json } = require('express');
app.use(json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/Products', localProduct);// mounts the localProduct router on the '/api/v1/Products' path, which means that any 
// requests to this path will be handled by the routes defined in the localProduct router

app.use('/api/v1/northwind/Products', nwProducts); // mounts the nwProducts router on the '/api/v1/northwind/Products' path, which means 
// that any requests to this path will be handled by the routes defined in the nwProducts router

const PORT = process.env.PORT || 3000;

//GET ROOT
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1 style = "color:red">Hello Express</h1>');
})

// //Get Local Products
// app.get('/api/v1/Products', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).send(JSON.stringify(Products_local));
// });

// const { json } = require('express');
// app.use(json());
// app.use(express.urlencoded({ extended: false }));
// //Post New Product
// app.post('/api/v1/Products', (req, res) => {
//     const payload = req.body;
//     console.log(payload);
//     Products_local.Products.push(payload);
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).send(JSON.stringify(Products_local));
// })

// const axios_instance = axios.create({
//     baseURL: 'https://services.odata.org/v4/northwind/northwind.svc',
// })
// //Access NorthWind Products Service
// app.get('/api/v1/NorthWind/Products', async (req, res) => {

//     // Mode 1 - Using Axios to fetch data from the NorthWind Products API and send it back to the client in JSON format.

//     // axios.get('https://services.odata.org/v4/northwind/northwind.svc/Products?$format=json')
//     // .then((results) => {
//     //     console.log(results);
//     //     res.setHeader('Content-Type', 'application/json');
//     //     res.status(200).send(JSON.stringify(results.data.value));
//     // })

//     //Mode 2 - Using the Axios instance to fetch data from the NorthWind Products API and send it back to the client in JSON format.
//     // axios_instance.get('/Products').then((results) => {
//     //     res.setHeader('Content-Type', 'application/json');
//     //     res.status(200).send(JSON.stringify(results.data.value));
//     // })

//     //Mode 3 - Using Async/ Await
//     try {
//         const results = await axios_instance.get('/Products');
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).send(JSON.stringify(results.data.value));
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching data from NorthWind API');
//     }
//});

app.listen(PORT, console.log(`Listening to PORT: ${PORT} in ${process.env.NODE_ENV} mode`)); // starts the Express server and listens on the specified PORT. 