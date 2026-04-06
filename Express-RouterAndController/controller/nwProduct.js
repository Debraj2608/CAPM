const instance = require('../Middleware/axiosinstance'); // imports the Axios instance that was created in the 'axiosinstance.js' file, 
// which is used to make HTTP requests to the NorthWind API

exports.getSupplierDetails = async (req, res) => {
    console.log('Fetching supplier details from NorthWind API...'); // logs a message to the console indicating that the function is fetching supplier details from the NorthWind API
    try {
        const results = await instance.get('/Products', {
            params: {
                '$expand': 'Supplier' // makes a GET request to the '/Products' endpoint of the NorthWind API, with a query parameter 
                // that expands the 'Supplier' entity. This means that the response will include details about the supplier for each 
                // product.
            }
        });
        res.setHeader('Content-Type', 'application/json'); // sets the Content-Type header of the response to 'application/json', indicating that the response will be in JSON format
        res.status(200).send(JSON.stringify(results.data.value)); // sends a response back to the client with the supplier details in JSON format. The JSON.stringify() method is used to convert the JavaScript object into a JSON string before sending it in the response.

    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from NorthWind API');
    }
}

exports.getProducts = async (req,res) => {
    console.log('Fetching product details from NorthWind API...'); // logs a message to the console indicating that the function is fetching product details from the NorthWind API
    try {
        const results = await instance.get('/Products');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(results.data.value));
    } catch(error) {
        console.log(error);
        res.status(500).send('Error fetching Products from Northwind API');
    }
}

exports.filterByProperty = async(req, res) => {
    console.log('Fetching product details from NorthWind API...');
    const id = req.params.id;
    console.log(id);
    const field = id.split('=')[0];
    console.log(field);
    const value = id.split('=')[1];
    console.log(value);

    try {
        const results = await instance.get('/Products',{
            params : {
                '$filter' : `${field} eq ${value}`
            }
        });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(results.data.value))
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching Products from Northwind API');
    }
}