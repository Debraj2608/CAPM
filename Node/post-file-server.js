const http = require('http'); // imports the http module to create a server, http is a built-in module in Node.js that allows us to create a server and handle HTTP requests and responses
const fs = require('fs'); // imports the fs module to work with the file system, fs is a built-in module in Node.js that allows us to interact with the file system, such as reading and writing files
const path = require('path'); // imports the path module to work with file and directory paths, path is a built-in module in Node.js that provides utilities for working with file and directory paths, such as joining paths and resolving absolute paths

const server = http.createServer((req, res) => { // creates a server and listens for incoming requests
    // req is the request object that contains information about the incoming request, such as the URL, headers, and method
    // res is the response object that allows us to send a response back to the client

    // Inspect the request details
    const { headers, url, method } = req; // destructures the request object to get the header, url, and method properties
    console.log(headers, url, method); // logs the header, url, and method to the console for debugging purposes

    // Store incoming payload in a file
    if (req.method === 'POST') {
        let data = [];
        req.on('data', (chunk) => {
            data.push(chunk);
        }).on('end', () => {
            const bodyString = Buffer.concat(data).toString(); // gives the data in string
            const bodyJoin = JSON.parse(bodyString); // gives the JSON format of the same string

            const { employees, fileID } = bodyJoin;

            const fpath = path.join(__dirname, 'Files', `${fileID}.txt`); // constructs the file path by joining the current directory (__dirname), a 'Files' directory, and a filename that is derived from the fileID property of the parsed data. The resulting file path will be something like 'current_directory/Files/fileID.txt'.
            let fileContent = 'FirstName' + '\t' + 'LastName' + '\t' + 'Email'; // initializes a string variable fileContent with the column headers "FirstName", "LastName", and "Email" separated by tabs (\t) and followed by a newline character (\n). This will serve as the initial content of the file.

            employees.map((emp) => { // iterates over the employees array using the map() method.
                // For each employee object (emp) in the array, it appends a new line to the fileContent string with the employee's
                // first name, last name, and email, separated by tabs. The resulting fileContent string will contain the column headers
                // followed by the employee data in a tab-separated format.
                fileContent = fileContent + '\n' + emp.FirstName + '\t' + emp.LastName + '\t' + emp.Email;
            });

            if (fs.existsSync(fpath)) { // checks if a file already exists at the specified file path (fpath) using the fs.existsSync() method. If the file exists, it sends a response back to the client with a JSON object containing a message "File already Exists". If the file does not exist, it proceeds to write the content to the file.
                res.end(JSON.stringify({ // sends a response back to the client with a JSON object containing a message "File already Exists"
                    "message": "File already Exists"
                }));
            } else {
                fs.writeFileSync(fpath, fileContent); // writes the fileContent string to a new file at the specified file path (fpath) using the fs.writeFileSync() method. This creates a new file with the employee data in a tab-separated format.
                res.end(JSON.stringify({ // sends a response back to the client with a JSON object containing a message "File created successfully"
                    "message": "File created successfully"
                }));
            }
        });
    } else {
        res.end('Welcome to my POST File Storage Server'); // sends a response back to the client with the message "Welcome to my POST File Storage Server" if the request method is not POST
    }
});

server.listen(3000, () => {
    console.log('POST File Storage Server is running on port 3000'); // starts the server and listens on port 3000
});