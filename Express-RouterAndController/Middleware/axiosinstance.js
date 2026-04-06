const axios = require('axios'); // imports the Axios library, which is used for making HTTP requests
const axios_instance = axios.create({
     baseURL: 'https://services.odata.org/v4/northwind/northwind.svc',
 })
// //Access NorthWind Products Service

module.exports = axios_instance; // exports the Axios instance so that it can be used in other parts of the application,