const express = require('express');
const app = express();
const env = require('dotenv');
const Products_local = require('./data/Products.json');

env.config({
    path: './config/config.env'
});

const PORT = process.env.PORT || 3000;

app.delete('/api/v1/Products/:id', (req,res) => {
    const ID = req.params.id;
    const field = ID.split('=')[0];
    const reqID = ID.split('=')[1];
    console.log(field);
    console.log(reqID);
    
    const filteredData = Products_local.Products.filter(product => product[field] != reqID);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(filteredData));

})

//Test API - http://localhost:4000/api/v1/Products/ProductID=1 - create a DELETE request to the above URL to delete the 
// product with ProductID 1 from the local products data.

app.listen(PORT, console.log(`Server is running on ${PORT}`));