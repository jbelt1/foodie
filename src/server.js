var express = require('express');
var app = express();
const https = require('https');
const yelp = require('yelp-fusion');
const url = require('url'); 
const querystring = require('querystring'); 

const apiKey = 'NEuYDf8DITFJd77D9sVOsZDNNoQLC7YK4F3v1o_ZLTqIbB7RAcelzPsoycXetJOig1A125Cjrns0edw03oTSxcUEImaj_6qAuq4pyRfKm9SxrreVEqn8yJTDNEbIWnYx';

const client = yelp.client(apiKey);

const prices = {"$": 1, "$$": 2, "$$$": 3, "$$$$": 4};
const priceIndentifiers = {1: "Low", 2: "Medium", 3: "High", 4: "Very High"};
const days = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"};

const undefinedJSON = {
	isFound: false,
	errorMessage: "There are no results that meet your criteria"
}

app.get('/', function(req, res){
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	var area = req.query.location;
	var food = req.query.food;
	var budget = req.query.budget;
	var found = false;
	var result = [];
	var finalBusinesses = [];
	var currentBusiness;

	food = food.replace(/_/g, " ");
	area = area.replace(/_/g, " ");
	budget = parseInt(budget);

	var searchRequest = {
		term: food,
		location: area
	};

	if (budget < 8) {
		budget = 1;
	} else if (budget < 12) {
		budget = 2;
	} else if (budget < 16) {
		budget = 3;
	} else {
		budget = 4;
	}

	client.search(searchRequest).then(response => {
		  var i = 0;
		  var businesses = response.jsonBody.businesses;
		  var business;
		  
		  // Querying initial parameters and finding 3 best results
		  while (!found && i < businesses.length) {
		  	currentBusiness = businesses[i];
		  	if (prices[currentBusiness.price] < budget) {
		  		result.push({
		  			rating: currentBusiness["rating"],
		  			id: currentBusiness["id"],
		  			image_url: currentBusiness["image_url"],
		  			name: currentBusiness["name"],
		  			isFound: true,
		  			errorMessage: null,
		  			price: priceIndentifiers[prices[currentBusiness["price"]]]
		  		});
		  	}
		  	if (result.length === 3) {
		  		found = true;
		  	}
		  	i++;
		  }

		  var businessProcessed = 0;

		  // Querying each result of the first search for more specific details
		  result.forEach(currentBusiness => {
		  	client.business(currentBusiness["id"]).then(response => {
			  		business = response.jsonBody;
			  		var hours = [];
			  		var hour_string;

			  		j = 0;
			  		while (j < business.hours[0].open.length) {
			  			hour_string = days[j] + ": " + toTwelveClock(business.hours[0].open[j].start) + "-" + toTwelveClock(business.hours[0].open[j].end);
			  			hours.push(hour_string);
			  			j++;
			  		}

				  currentBusiness["display_phone"] = business.display_phone;
				  currentBusiness["latitude"] = business.coordinates.latitude;
				  currentBusiness["longitude"] = business.coordinates.longitude;
				  currentBusiness["address"] = business.location.display_address[0] + ", " + business.location.display_address[1];
				  currentBusiness["hours"] = hours;
				  finalBusinesses.push(currentBusiness);
				  businessProcessed++;
				  if (businessProcessed === (result.length)) {
				  	if (result.length === 0) {
				  		res.send(undefinedJSON);
				  	} else {
				  		finalBusinesses = sort(finalBusinesses);
				  		res.send(finalBusinesses);
				  	}
				  }
				}).catch(e => {
				  console.log(e);
				});
		  });

		}).catch(e => {	
		  res.send(undefinedJSON);
		});
});

function toTwelveClock(time) {
	var PM = false;
	var stringTime;
	var finalString;
	var twelveTime = time;
	if (twelveTime >= 1200) {
		twelveTime -= 1200;
		PM = true;
	}

	if (twelveTime < 100) {
		twelveTime += 1200;
	}

	stringTime = twelveTime.toString();
	if (stringTime.length === 3) {
		finalString = stringTime.charAt(0) + ":" + stringTime.charAt(1) + stringTime.charAt(2);
	} else {
		finalString = stringTime.charAt(0) +  stringTime.charAt(1) + ":" + stringTime.charAt(2) + stringTime.charAt(3);
	}

	if (PM) {
		stringTime = finalString + "PM";
	} else {
		stringTime = finalString + "AM";
	}

	return stringTime;
}

function sort(arr) {
	var temp;
	for(var i = 0; i < arr.length; i++) {
    	for(var j = 1; j < arr.length; j++) {
      		if(arr[j - 1]["rating"] < arr[j]["rating"]) {
      			temp = arr[j - 1];
      			arr[j - 1] = arr[j];
      			arr[j] = temp;
      		}
    	}
  	}
  return arr;
}

app.listen(8080);