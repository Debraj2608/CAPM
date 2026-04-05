const http = require('http'); // imports the http module to create a server, http is a built-in module in Node.js that allows us to create a server and handle HTTP requests and responses
const fs = require('fs'); // imports the fs module to work with the file system, fs is a built-in module in Node.js that allows us to interact with the file system, such as reading and writing files
const path = require('path'); // imports the path module to work with file and directory paths, path is a built-in module in Node.js that provides utilities for working with file and directory paths, such as joining paths and resolving absolute paths


const server = http.createServer((req,res) => { // creates a server and listens for incoming requests
    // req is the request object that contains information about the incoming request, such as the URL, headers, and method
    // res is the response object that allows us to send a response back to the client

    //Inspect the request details
    const {headers,url,method} = req; // destructures the request object to get the header, url, and method properties
    console.log(headers, url, method); // logs the header, url, and method to the console for debugging purposes

    //Uncomment either of below setHeader and end method while testing the server, as the methods are mutually exclusive and cannot be used
    // together in the same response.

    //Sending response either as plain text
    res.setHeader('Content-Type', 'text/plain'); // sets the Content-Type header of the response to 'text/plain', indicating that the response will be plain text
    res.end('Hello World'); // sends a response back to the client with the message "Hello World"

    //Sending response in HTML format
    res.setHeader('Content-Type', 'text/html'); // sets the Content-Type header of the response to 'text/html', indicating that the response will be HTML
    res.end('<h1>Hello World</h1>'); // sends a response back to the client with the message "Hello World" wrapped in an <h1> tag, which will be rendered as a heading in HTML
    
    //Sending response in JSON format
    res.setHeader('Content-Type', 'application/json'); // sets the Content-Type header of the response to 'application/json', indicating that the response will be in JSON format
    res.end(JSON.stringify({
        'My message': 'Hello World' // sends a response back to the client with a JSON object that contains a key "My message" and a value "Hello World". The JSON.stringify() method is used to convert the JavaScript object into a JSON string before sending it in the response.
    }));

    //Posting records
    if(req.method =='POST'){
        var data = [];
        req.on('data',(chunk) =>{ // listens for the 'data' event on the request object, which is emitted when a chunk of data is received in the request body. The chunk of data is pushed into the data array.
            data.push(chunk); // The chunk of data is pushed into the data array.
        }).on('end',()=>{
            const parsedData = Buffer.concat(data).toString(); // listens for the 'end' event on the request object, which is emitted when all the data has been received. The data array is concatenated into a single buffer using Buffer.concat() and then converted to a string using the toString() method.
            //console.log(parsedData); // logs the parsed data to the console for debugging purposes
            //res.end(JSON.stringify(parsedData)); // sends a response back to the client with the parsed data in JSON format. 
            res.end(JSON.stringify(JSON.parse(parsedData)));// sends a response back to the client with the parsed data in JSON format. The JSON.parse() method is used to convert the parsed data from a JSON string back into a JavaScript object, and then the JSON.stringify() method is used to convert it back into a JSON string before sending it in the response. This allows the client to receive the data in a structured format that can be easily parsed and used on the client side.
            // The JSON.stringify() method is used to convert the parsed data into a JSON string before sending it in the response.
        })
    }

    //Store incoming payload in a file
    if(req.method =='POST'){
        let data = [];
        req.on('data', (chunk) =>{
            data.push(chunk);
        }).on('end',()=>{
            const bodyString = Buffer.concat(data).toString(); //gives the data in string
            const bodyJoin = JSON.parse(bodyString); // gives the JSON format of the same string

            const {employees, fileID} = bodyJoin;

            const fpath = path.join(__dirname, 'Files', `${fileID}.txt`); // constructs the file path by joining the current directory (__dirname), a 'data' directory, and a filename that is derived from the fileID property of the parsed data. The resulting file path will be something like 'current_directory/data/fileID.json'.
            let fileContent = 'FirstName' + '\t' + 'LastName' + '\t' + 'Email';// initializes a string variable fileContent with the column headers "FirstName", "LastName", and "Email" separated by tabs (\t) and followed by a newline character (\n). This will serve as the initial content of the file.

            employees.map((emp) =>{ // iterates over the employees array using the map() method. 
            // For each employee object (emp) in the array, it appends a new line to the fileContent string with the employee's 
            // first name, last name, and email, separated by tabs. The resulting fileContent string will contain the column headers 
            // followed by the employee data in a tab-separated format.
                fileContent = fileContent + '\n' + emp.FirstName + '\t' + emp.LastName + '\t' + emp.Email;
            })

            if(fs.existsSync(fpath)){ // checks if a file already exists at the specified file path (fpath) using the fs.existsSync() method. If the file exists, it sends a response back to the client with a JSON object containing a message "File already Exists". If the file does not exist, it proceeds to write the content to the file.
                res.end(JSON.stringify({ // sends a response back to the client with a JSON object containing a message "File already Exists"
                    "message" : "File already Exists"
                }));
            } else {
                fs.writeFile(fpath, fileContent, 'utf-8', (err,succ) =>{
                    if (err) throw err;
                    else {
                        res.end(JSON.stringify({ // sends a response back to the client with a JSON object containing a message "File created successfully"
                            "message" : "File created successfully"
                        }));
                    }
                })
            }

        })
    } else {
        res.end('Welcome to my server'); // sends a response back to the client with the message "Welcome to my server" if the request method is not POST   
    }


    //To test above code, you can use the test.http file in the same directory, which contains an HTTP POST request with a JSON payload. 
    // You can send this request to the server using an HTTP client like Postman or by using the REST Client extension in 
    // Visual Studio Code. When you send the request, the server will receive the data, parse it, and send it back in the
    // response as a JSON string. You can then verify that the response contains the expected data.

});
server.listen(3000, () => {
    console.log('Server is running on port 3000'); //starts the server and listens on port 3000
})

//READMe - 

//do npm init -y ->
// To create a package.json file, which is necessary for managing dependencies and scripts in a Node.js project. 
// This command initializes a new Node.js project with default settings, creating a package.json file in the current directory.

//npm install nodemon --save-dev OR npm install nodemon -D ->
// To install the nodemon package as a development dependency. Nodemon is a utility that automatically restarts the server whenever 
// changes are made to the code, making development easier and more efficient. The --save-dev flag indicates that this package is only 
// needed for development purposes and should not be included in the production dependencies.

//package-lock.json ->
// This file is automatically generated when you run npm install. It contains a detailed description of the exact version of each 
// installed package and its dependencies. This ensures that when other developers or production environments install the dependencies, 
// they will get the same versions, preventing potential issues caused by version mismatches.

//"start": "nodemon server.js" ->
// This is a script defined in the package.json file that allows you to start the server using nodemon. 
// When you run npm start, it will execute the command nodemon server.js, which will start the server and automatically restart it 
// whenever changes are made to the server.js file. This is useful for development, as it eliminates the need to manually stop and 
// restart the server every time you make changes to the code.

// Change Made - I have manually added a new script "start-dev": "nodemon server.js" to the package.json file, which allows you to start the server in 
// development mode using nodemon.
// To run the server, you can use the command "npm start-dev" in the terminal. This will execute the start script defined in the package.json 
// file.