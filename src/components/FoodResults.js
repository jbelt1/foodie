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
      		starClass: {},
		}
		this.resultStarToggle = this.resultStarToggle.bind(this);
	}

	resultStarToggle(id) {
		const {favorites, starClass} = this.state
		if (favorites[id]){
			favorites[id] = false;
			starClass[id] = "inactive";
		}
		else {
			favorites[id] = true;
			starClass[id] = "active";
		}
		this.setState({
			favorites: favorites,
			starClass: starClass,
		})
	}

	componentDidMount() {
		const {food, location, budget} = this.state;
		const requestUrl = "http://localhost:3000/api/results/?location=" + location + "&food=" + food + "&budget=" + budget;
		let favorites = {};
		let starClass = {};
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
					starClass[result.id] = "inactive";
					favorites[result.id] = false;
				});
				
				this.setState({
					results: results,
					isLoading: false,
					favorites: favorites, 
					starClass: starClass,
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
		const {isLoading, isFound, results, favorites, starClass, loggedIn} = this.state;
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
					loggedIn = {loggedIn}
					resultFavorited = {favorites[result.id]}
					starClass = {starClass[result.id]}
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