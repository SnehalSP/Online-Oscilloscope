Step 1:Install Node.js for your platform (MacOS, Windows or Linux)

    The link to download and install is: https://nodejs.org/en/download/

    Node.js is a JavaScript free and open source cross-platform for server-side programming that allows users to build network applications quickly.


Step 2:Make directory for your project
   (I have created NodeJS as my directory)
   Open a command prompt and type:   
                                  mkdir NodeJS
                                  cd NodeJS

								  
Step 3: Initialize your project and link it to npm
    Npm is short for node package manager. This is where all node packages live. 
    Packages can be viewed as bundles of code, like modules, which carry out a specific function.
    Running this command initializes your project:
                                                  npm init

    This creates a package.json file in your NodeJS folder. The file contains references for all npm packages you have downloaded to your project. 
    The command will prompt you to enter a number of things. 
    You can enter your way through all of them EXCEPT this one:
                                                               entry point: (index.js) 

    You will want to change this to "server.js" (i.e name of your app file).
     
                                                 												 
Step 4: Install Express in the NodeJS directory.
		
    To install run the following command:
                                         npm install express --save	 
												 
    The install command will go ahead and find the package you wish to install, and install it to your project. 
    You will now be able to see a node_modules folder get created in the root of your project. 	
    It gives you a set of robust and easy to use tools to get your web application up and running. 
	

Step 5: Start your text editor of choice and create a file named server.js. 
     ( NOTE: This step is just to start the project from scratch. The zip folder already has all the files along with server.js below code snippet is just for           explanation purpose)

    
     Below is the small snippet of the example code:
	 
	 var express = require('express');
     var app = express();

     app.get('/', function (req, res) {
      res.send('Hello World!');
     });

     app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
     });

	 
    It is at this point that we will use the package installed in the previous steps.
    The first line declares a variable which will contain the module called express, grabbing it from the node_modules folder.
    The listen method starts a server and listens on port 3000 for connections.
    It responds with “Hello World!” for get requests to the root URL (/). For every other path, it will respond with a 404 Not Found.

Step 6: Run the APP:

     Type the command:
                      node server.js	 
	 
     The console window should prompt : "Server is listening on port 3000!"
	 
	 
Step 7:
     Open the web browser and type :
                                    http://localhost:3000/	 
	 
     This should open the browser window with the graph.


	