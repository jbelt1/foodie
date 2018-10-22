import React from 'react';
import FoodFinder from './FoodFinder.js';

import '../css/Home.css';

function Home(props) {
	const {history, isLoading} = props;
	if(!isLoading) {
		return (
		<div id = "home">
			<div id = "header">
				<h1 id = "logo">Foodie</h1>
				<div id = "shadow"></div>
			</div>
			<FoodFinder 
			history = {history}
			position = ""
			isHome = {true}
			/>
		</div>
		);
	}
	else {
		return(<div id = "loading">Foodie</div>);
	}
}

export default Home