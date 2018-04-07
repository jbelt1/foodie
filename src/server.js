var express = require('express');
var app = express();
const yelp = require('yelp-fusion');
const url = require('url'); 
const querystring = require('querystring'); 

const apiKey = 'NEuYDf8DITFJd77D9sVOsZDNNoQLC7YK4F3v1o_ZLTqIbB7RAcelzPsoycXetJOig1A125Cjrns0edw03oTSxcUEImaj_6qAuq4pyRfKm9SxrreVEqn8yJTDNEbIWnYx';

const client = yelp.client(apiKey);

const prices = {"$": 1, "$$": 2, "$$$": 3, "$$$$": 4};

const undefinedJSON = {
	isFound: false,
	errorMessage: "There are no results that meet your criteria"
}

app.get('/', function(req, res){
	var areaUnderscores = req.query.location;
	var food = req.query.food;
	var inputBudget = req.query.budget;
	var budget;
	var found = false;

	food = food.replace(/_/g, " ");
	var area = areaUnderscores.replace(/_/g, " ");
	budget = parseInt(inputBudget);

	var searchRequest = {
		term: food,
		location: area
	};

	console.log(food);
	console.log(area);

	if (budget < 8) {
		budget = 1;
	} else if (budget < 12) {
		budget = 2;
	} else if (budget < 16) {
		budget = 3;
	} else {
		budget = 4;
	}

	console.log(budget);

	client.search(searchRequest).then(response => {
		  var i = 0;
		  var currentBusiness;
		  var businesses = response.jsonBody.businesses;
		  var Result = [];
		  
		  while (!found && i < businesses.length) {
		  	currentBusiness = businesses[i];
		  	if (prices[currentBusiness.price] < budget) {
		  		currentBusiness["isFound"] = true;
		  		currentBusiness["errorMessage"] = null;
		  		Result.push(currentBusiness);
		  	}
		  	if (Result.length === 3) {
		  		found = true;
		  	}
		  	i++;
		  }

		  if (!found) {
		  	res.send(undefinedJSON);
		  } else {
		  	res.send(Result);
		  }

		}).catch(e => {
		  res.send(undefinedJSON);
		});

});

app.listen(8080);