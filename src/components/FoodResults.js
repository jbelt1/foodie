import React, { Component } from 'react';
import FoodResult from './FoodResult.js';
import '../css/FoodResults.css';

class FoodResults extends Component {
	constructor(props){
		super(props);
		const {budget, food, location} = this.props
		this.state = {
			isLoading: true,
			isFound: true,
			loggedIn: false,
			results: [],
			food: food,
      		location: location,
      		budget: budget,
      		favorites: {},
      		starColor: {},
		}
		this.resultStarToggle = this.resultStarToggle.bind(this);
		this.resultStarHover = this.resultStarHover.bind(this);
	}

	resultStarToggle(id) {
		const {favorites, starColor} = this.state
		if (favorites[id]){
			favorites[id] = false;
			starColor[id] = "grey";
		}
		else {
			favorites[id] = true;
			starColor[id] = "#EB7608";
		}
		this.setState({
			favorites: favorites,
			starColor: starColor,
		})
	}

	resultStarHover(id) {
		const {favorites, starColor, loggedIn} = this.state
		if (loggedIn && !favorites[id]){
			starColor[id] = starColor[id] === "grey" ? "silver" : "grey"
			this.setState({
				starColor: starColor
			})
		}
	}

	componentDidMount() {
		const {food, location, budget} = this.state;
		const requestUrl = "/api/results/?location=" + location + "&food=" + food + "&budget=" + budget;
		let favorites = {};
		let starColor = {};
		fetch(requestUrl, {
			method: "GET",
		})
      	.then((response) => {
        	return response.json();
      	})
      	.then((data) => {
			const isFound = data.isFound;
			const results = data.results;
			if (isFound){
				results.forEach(result => {
					starColor[result.id] = "silver";
					favorites[result.id] = false;
				});
				
				this.setState({
					results: results,
					isLoading: false,
					favorites: favorites, 
					starColor: starColor,
					loggedIn: localStorage.getItem('loggedIn') === "true", 
				}); 
			}
			else {
				this.setState({
					isLoading: false,
					isFound: false,
				})
			}
      	});
	}

	render(){
		const {isLoading, isFound, results, favorites, starColor, loggedIn} = this.state;
		let resultNum = 1;
		const found = isFound ? (
			<div id = "results-wrapper">
				{results.map((result) => {
				return (
					<FoodResult
					resultID = {result.id}
					key = {result.id}
					resultNum = {resultNum++}
					name = {result.name}
					phone = {result.display_phone}
					pictureUrl = {result.image_url}
					address = {result.address}
					price = {result.price}
					hours = {result.hours}
					resultStarToggle = {this.resultStarToggle}
					resultStarHover= {this.resultStarHover}
					loggedIn = {loggedIn}
					resultFavorited = {favorites[result.id]}
					starColor = {starColor[result.id]}
					/>
				)
			})}
			</div>
			) : (
				<div id = "no-results">
					No results :/ 
				</div>
			);
		const returns = isLoading ? (
			<div id = "loading">Foodie</div>
			) : (
				found
			);
		return(
			<div id = "food-results">
				{returns}
			</div>
			)
	}
}

export default FoodResults;