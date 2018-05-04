import React from 'react';
import StarIcon from 'mdi-react/StarIcon';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';

function FoodResult(props){
	const {resultNum, name, phone, pictureUrl, address, price, hours, resultStarToggle, resultStarHover, starClass, resultID} = props;
	const mapAddress = address.replace(/ /g, "+");
	return(
		<div id = {"result-"+resultNum.toString()}>
			<div className = "result-header">
				<StarIcon 
				color = "#EB7608" 
				className = {starClass} 
				size = "23" 
				onClick = {() => resultStarToggle(resultID)}
				onMouseEnter = {() => resultStarHover(resultID, "enter")}
				onMouseLeave = {() => resultStarHover(resultID, "leave")}
				/>
				<div className = "result-name">{name}</div>
				{/*<div className = "result-price">Price: {price} </div> */}
			</div>
			<div className = "result-main">
				<div className = "result-body">
					<div className = "main-one">
						<div className = "result-rank">#{resultNum}</div>
					</div>
					<div className = "main-two">
						<div className = "result-address">Address: <a href = {"http://maps.google.com/maps?q=" + mapAddress}>{address}</a></div>
						<div className = "result-phone">Phone: <a href={"tel:"+phone}>{phone}</a></div>
					</div>
					<div className = "main-three">
						<div className = "result-hours">
							<p>Hours</p> 
							<ul>
								{hours.map((hour) => {
									return (
										<li
										key = {name+hour}>
										{hour}
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
				<img src = {pictureUrl} alt = "#"/>
			</div>
		</div>
	)
}

export default FoodResult;