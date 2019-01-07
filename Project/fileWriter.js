const fs = require('fs');

async function writeFile() {
	while(true) {
		writeRandom();
		await sleep(5000);
	}
}

function writeRandom() {
	var graphData = {};

	var seconds = new Date().getTime() / 1000;
	graphData["startTime"] = seconds;
	
	var data = [];
	/*for (var i = 4096; i >= 0; i--) {
		data.push(Math.floor(Math.random() * Math.floor(65535)));
	}*/
	var temp;
	var temp1;
	for( var j=0;j<20000;j++){
		//var frequency = x1+j*xs;
		if(j<=700){
		var frequency = 0.0333*j;
		}
		else if(j<1400)
		{
			var frequency = 0.333*j;}
		else{
			var frequency = 0.6*j;
		}	
			
		graphData["startTime"] = frequency;
		temp= data.push(Math.sin(frequency));
		/*temp= (Math.sin(frequency));
		
		temp1=(temp).toString(2)
		while(temp1.length < 16) {
             temp1 = "0" + temp1;
            }
		data.push((temp1));*/
	}
	

	graphData["data"] = data;
	var json = JSON.stringify(graphData);

	fs.writeFile('message.txt', json, (err) => {
	if (err) throw err;
	console.log('The file has been saved!');
	});
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

writeFile();

