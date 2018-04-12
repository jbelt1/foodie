import React from 'react';
import Result from './Result.js';

function FoodResults(props) {
	let resultNum = 1;
	let results = props.results;
	return(
		<div id = "results-wrapper">
			{results.map((result) => {
				return (
					<Result
					key = {result.id}
					resultNum = {resultNum++}
					name = {result.name}
					phone = {result.display_phone}
					pictureUrl = {result.image_url}
					address = {result.address}
					price = {result.price}
					hours = {result.hours}
					/>
				)
			})}
		</div>
	)
}

export default FoodResults;