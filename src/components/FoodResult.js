import React from 'react';
import { Star, StarBorder} from '@material-ui/icons';


function FoodResult(props){
	const {resultNum, name, phone, pictureUrl, address, price, hours, resultStarToggle, resultStarHover, starColor, resultID, loggedIn} = props;
	const mapAddress = address.replace(/ /g, "+");
	let hourNum = 0;
	const star = loggedIn ? 
				<Star  
				style={{ fontSize: 25, cursor: "pointer", color: starColor}}
				onClick = {() => resultStarToggle(resultID)}
				onMouseEnter = {() => resultStarHover(resultID)}
				onMouseLeave = {() => resultStarHover(resultID)}
				/> :
				<StarBorder
				color = "disabled"
				className = {"star-outline"}
				style={{ fontSize: 25 }}
				/>
	return(
		<div id = {"result-"+resultNum.toString()}>
			<div className = "result-header">
				{star}
				<div className = "result-name">{name}</div>
				{/*<div className = "result-price">Price: {price} </div> */}
			</div>
			<div className = "result-main">
				<div className = "result-body">
					<div className = "main-one">
						<div className = "result-rank">#{resultNum}</div>
					</div>
					<div className = "main-two">
						<div className = "result-address">Address: <a href={"http://maps.google.com/maps?q=" + mapAddress} target="_blank">{address}</a></div>
						<div className = "result-phone">Phone: <a href={"tel:"+phone}>{phone}</a></div>
					</div>
					<div className = "main-three">
						<div className = "result-hours">
							<p>Hours</p> 
							<ul>
								{hours.map((hour) => {
									return (
										<li
										key = {name + "hour: " + hourNum++}>
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