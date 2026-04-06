const express = require('express');
const app = express();
const env = require('dotenv');
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

app.listen(PORT, console.log(`Listening to PORT: ${PORT} in ${process.env.NODE_ENV} mode`)); // starts the Express server and listens on the specified PORT. 