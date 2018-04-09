import React from 'react';

function Result(props){
	const {resultNum, name, phone, pictureUrl, address, price} = props;
	return(
		<div id = {"result-"+resultNum.toString()}>
			<img src = {pictureUrl} alt = "#"/>
			<div className = "result-main">
				<div className = "result-header">
					<div className = "result-rank">#{resultNum}</div>
					<div className = "result-name">{name}</div>
					<div className = "result-price">Price: {price} </div>
				</div>
				<div className = "result-body">
					<div className = "result-hours">Hours: TBA</div>
				</div>
				<div className = "result-footer">
					<div className = "result-address">Address: {address}</div>
					<div className = "result-phone">Phone: <a href={"tel:"+phone}>{phone}</a></div>
				</div>
			</div>
		</div>
	)
}

export default Result;