const http = require('http'); // imports the http module to create a server, http is a built-in module in Node.js that allows us to create a server and handle HTTP requests and responses

const server = http.createServer((req, res) => { // creates a server and listens for incoming requests
    // req is the request object that contains information about the incoming request, such as the URL, headers, and method
    // res is the response object that allows us to send a response back to the client

    // Inspect the request details
    const { headers, url, method } = req; // destructures the request object to get the header, url, and method properties
    console.log(headers, url, method); // logs the header, url, and method to the console for debugging purposes

    // Posting records
    if (req.method === 'POST') {
        let data = [];
        req.on('data', (chunk) => { // listens for the 'data' event on the request object, which is emitted when a chunk of data is received in the request body. The chunk of data is pushed into the data array.
            data.push(chunk); // The chunk of data is pushed into the data array.
        }).on('end', () => {
            const parsedData = Buffer.concat(data).toString(); // listens for the 'end' event on the request object, which is emitted when all the data has been received. The data array is concatenated into a single buffer using Buffer.concat() and then converted to a string using the toString() method.
            // console.log(parsedData); // logs the parsed data to the console for debugging purposes
            // res.end(JSON.stringify(parsedData)); // sends a response back to the client with the parsed data in JSON format.
            res.end(JSON.stringify(JSON.parse(parsedData))); // sends a response back to the client with the parsed data in JSON format. The JSON.parse() method is used to convert the parsed data from a JSON string back into a JavaScript object, and then the JSON.stringify() method is used to convert it back into a JSON string before sending it in the response. This allows the client to receive the data in a structured format that can be easily parsed and used on the client side.
            // The JSON.stringify() method is used to convert the parsed data into a JSON string before sending it in the response.
        });
    } else {
        res.end('Welcome to my POST Echo Server'); // sends a response back to the client with the message "Welcome to my POST Echo Server" if the request method is not POST
    }
});

server.listen(3000, () => {
    console.log('POST Echo Server is running on port 3000'); // starts the server and listens on port 3000
});