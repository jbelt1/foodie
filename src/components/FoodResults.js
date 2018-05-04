import React, { Component } from 'react';
import FoodResult from './FoodResult.js';
import '../css/FoodResults.css';

class FoodResults extends Component {
	constructor(props){
		super(props);
		const {budget, food, location} = this.props
		this.state = {
			isLoading: true,
			results: [],
			food: food,
      		location: location,
      		budget: budget,
      		favorites: {},
      		starClass: {},
		}
		this.resultStarToggle = this.resultStarToggle.bind(this);
		this.resultStarHover = this.resultStarHover.bind(this);
	}

	resultStarToggle(id) {
		const {favorites, starClass} = this.state
		if (favorites[id]){
			favorites[id] = false;
			starClass[id] = "";
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

	resultStarHover(id, type) {
		const {favorites, starClass} = this.state
		if (!(favorites[id])){
			if (type === "enter"){
				starClass[id] = "active";
			}
			else {
				starClass[id] = "";
			}
			this.setState({
				favorites: favorites,
				starClass: starClass,
			})
		}
	}

	componentDidMount() {
		const {food, location, budget} = this.state;
		const requestUrl = "http://localhost:8080/?location=" + location + "&food=" + food + "&budget=" + budget;
		let favorites = {};
		let starClass = {};
		fetch(requestUrl)
      	.then((response) => {
        	return response.json();
      	})
      	.then((data) => {
	        data.forEach(result => {
	        	starClass[result.id] = "";
	        	favorites[result.id] = false;
	        });
	        
	        this.setState({
	          results: data,
	          isLoading: false,
	          favorites: favorites, 
	          starClass: starClass, 
	        }); 
      	});
	}

	render(){
		const {isLoading, results, favorites, starClass} = this.state;
		let resultNum = 1;
		const returns = isLoading ? (
			<div id = "loading">Foodie</div>
			) : (
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
					resultStarHover = {this.resultStarHover}
					resultFavorited = {favorites[result.id]}
					starClass = {starClass[result.id]}
					/>
				)
				})}
			</div>
			);
		return(
			<div id = "food-results">
				{returns}
			</div>
			)
	}
}

export default FoodResults;