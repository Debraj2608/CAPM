const express = require('express');
const env = require('dotenv');
const app = express();
const Products_local = require('./data/Products.json');

env.config({
    path : './config/config.env'
});

const PORT = process.env.PORT || 3000;

const { json } = require('express');
app.use(json());

app.put('/api/v1/Products/:id', (req,res) => {
    const id = req.params.id;
    const field = id.split("=")[0];
    const reqID = id.split("=")[1];
    const body = req.body;
    
    for(let i=0;i<Products_local.Products.length;i++){
        if(Products_local.Products[i][field] == reqID){
            Products_local.Products[i] = body;
            break;
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(Products_local));
})

app.listen(PORT, console.log(`Server is listening at ${PORT} in environment ${process.env.NODE_ENV}`));