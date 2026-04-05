const http = require('http'); // imports the http module to create a server, http is a built-in module in Node.js that allows us to create a server and handle HTTP requests and responses

const server = http.createServer((req, res) => { // creates a server and listens for incoming requests
    // req is the request object that contains information about the incoming request, such as the URL, headers, and method
    // res is the response object that allows us to send a response back to the client

    // Inspect the request details
    const { headers, url, method } = req; // destructures the request object to get the header, url, and method properties
    console.log(headers, url, method); // logs the header, url, and method to the console for debugging purposes

    // Sending response in JSON format
    res.setHeader('Content-Type', 'application/json'); // sets the Content-Type header of the response to 'application/json', indicating that the response will be in JSON format
    res.end(JSON.stringify({
        'My message': 'Hello World' // sends a response back to the client with a JSON object that contains a key "My message" and a value "Hello World". The JSON.stringify() method is used to convert the JavaScript object into a JSON string before sending it in the response.
    }));
});

server.listen(3000, () => {
    console.log('JSON Server is running on port 3000'); // starts the server and listens on port 3000
});