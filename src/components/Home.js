import React from 'react';
import FoodFinder from './FoodFinder.js';

import '../css/Home.css';

function Home(props) {
	const {history, match} = props;

	const currUrl = match.url;
	return (
		<div id = "home">
			<FoodFinder 
			food = "" 
			location = ""
			budget = ""
			history = {history}
			currUrl = {currUrl}
			position = ""
			/>
		</div>
	);
}

export default Home