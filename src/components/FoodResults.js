import React from 'react';
import Result from './Result.js';

function FoodResults(props) {
	let resultNum = 1;
	return(
		<div id = "results-wrapper">
			{props.results.map((result) => {
				return (
					<Result
					key = {result.id}
					resultNum = {resultNum++}
					name = {result.name}
					phone = {result.display_phone}
					pictureUrl = {result.image_url}
					address = {result.location.address1}
					price = {result.price}
					/>
				)
			})}
		</div>
	)
}

export default FoodResults;