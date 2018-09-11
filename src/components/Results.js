import React from 'react'
import FoodFinder from './FoodFinder.js'
import FoodResults from './FoodResults.js'
import '../css/Results.css';

function Results(props) {
	const {match, loggedIn, history} = props
	return(
		<div id = "results">
			<FoodFinder 
			isHome = {false}
			history = {history}
			position = "top"
			/>
			<FoodResults
			{...match.params}
			key = {match.url}
			loggedIn = {loggedIn}
			/>
		</div>
	)
}

export default Results;