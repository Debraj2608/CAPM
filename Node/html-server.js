const http = require('http'); // imports the http module to create a server, http is a built-in module in Node.js that allows us to create a server and handle HTTP requests and responses

const server = http.createServer((req, res) => { // creates a server and listens for incoming requests
    // req is the request object that contains information about the incoming request, such as the URL, headers, and method
    // res is the response object that allows us to send a response back to the client

    // Inspect the request details
    const { headers, url, method } = req; // destructures the request object to get the header, url, and method properties
    console.log(headers, url, method); // logs the header, url, and method to the console for debugging purposes

    // Sending response in HTML format
    res.setHeader('Content-Type', 'text/html'); // sets the Content-Type header of the response to 'text/html', indicating that the response will be HTML
    res.end('<h1>Hello World</h1>'); // sends a response back to the client with the message "Hello World" wrapped in an <h1> tag, which will be rendered as a heading in HTML
});

server.listen(3000, () => {
    console.log('HTML Server is running on port 3000'); // starts the server and listens on port 3000
});