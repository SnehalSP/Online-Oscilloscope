var express = require('express');
var app = express();
var path = require('path');

app.use('/', express.static(__dirname));


//to fetch index.html
app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname +'/index.html'));

});



//to fetch /data when called by the client
//this function reads the file in response to the request creates a json string which is send to the client as a json response
app.get('/data', function (req, res) {
	
	
	var fs = require('fs');

	var fileContent = fs.readFileSync('message.txt', 'utf8'); //local file containing the data to be plotted
	var obj = JSON.parse(fileContent);
	console.log("startTime:"+ obj.startTime); 
	
	var width = req.query.width;
	var sample = Number(req.query.sample); //memdepth value fetched from the browser from the url parameter
	var offset= Number(req.query.offset); //offset value fetched from the browser from the url parameter
	var xstart= Math.round(Number(req.query.xstart));  //window start value fetched from the browser from the url parameter
	var xend= Math.round(Number(req.query.xend)); //window end value fetched from the browser from the url parameter
	var flag= Number(req.query.flag); //flag value fetched from the browser from the url parameter
	//console.log("xstart "+ xstart + " xend " +xend +" flag is " +flag);
	
	//console.log("offset os"+ offset);
	
	if(sample=="NaN")
	{console.log("Encountered NaN, setting default sample value to 600");
     sample= 600;}
	var string= "width of the screen "+ width +" sample points requested " + sample;
	console.log(string);
	if(sample<600)
	{sample=700;}

    console.log("sample is"+sample);
	var ratio= sample/width;
	if(ratio<1)
	{ratio=1;}
	console.log("Ratio is " + ratio);
	var nearest= Math.floor(ratio);
	var x= highestPowerof2(nearest);
	
	console.log("Rounded ratio is " + nearest);
	console.log("Nearest value in terms of power of 2 is " + x);
	var power = Math.log(x)/Math.LN2;
	console.log("It is 2 raise to power of :  " + power);
	var points= sample/x;
	
	//console.log("Points is  " + points);
	
	var graphData = {};//json array for graph data to be send as a json response
	var x2 = -10;
	var x1 = 10;
    var xs = 1.0 * (x2 - x1)/600; 
	var seconds = new Date().getTime() / 100;
    graphData["startTime"] = seconds;
    graphData["totalPoints"]=obj.data.length;
	
	var data = [];
	var count=0;
	var SamplesforXtemp=[];
	var SamplesforX=[];
	for (var i= 0; i<obj.data.length;i++)
	{
		SamplesforXtemp.push(parseInt(i));
		
	}
	
	graphData["SamplesforX"]=SamplesforX;
	var total=offset + points;
	console.log("length of the message text: " + obj.data.length);
	console.log("offset is" +offset+ "and offset+pouint is" +total);
	
	
	//if flag=0 the server sends total point specified in memdepth which is equal to obj.data.length coming from the file
	if(flag==0)
	{
	    console.log("Flag is set to 0 ");
       for( var j=0;j<obj.data.length;j++)
	   {
		
		count++;
		data.push(parseInt(obj.data[j+2]));
		SamplesforX.push(parseInt(SamplesforXtemp[j]));
	   }
       //console.log("array length is: "+data.length);
	   //console.log("countia"+count);
       graphData["data"] = data;//pushing the data array containing the points in the json array 
	   graphData["SamplesforX"] = SamplesforX //x axis array containing number of samples
	
	}
	
	
	//if flag =1 then the server send only those samples specified by the offset and the window size
	if (flag==1)
	{
		console.log("Flag is set to 1 ");
	    //xstart is the offset while xend is the last element in the selected window
	    for( var j=xstart;j<xend;j++)
		{
         data.push(parseInt(obj.data[j]));
		 SamplesforX.push(parseInt(SamplesforXtemp[j]));
		}
	     graphData["data"] = data;
	     graphData["SamplesforX"] = SamplesforX
	
    }
	
	var json = JSON.stringify(graphData); //create the string of the entire json array containing the data points
	res.send(json); //sends the response to the web server
  
});




//initial function when the server is made to start using node server.js in the terminal
app.listen(3000, function () {
  
  console.log('Server is listening on port 3000!');
});




/**********************************Function to return Highest power of 2***********/

function highestPowerof2(nearest) 
   { 
     var res = 0; 
	 var i;
     for ( i = nearest; i >= 1; i--) 
        { 
         // If i is a power of 2 
          if ((i & (i - 1)) == 0) 
             { 
                  res = i; 
                break; 
             } 
        } 
     return res; 
   } 