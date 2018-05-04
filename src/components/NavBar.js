import React from 'react';
import '../css/NavBar.css';
import {Link} from 'react-router-dom';

function NavBar(props) {
	const {loggedIn} = props;
	const userButton = loggedIn ? (
		<button 
		id = "logout-button"
		//onClick = {this.userLogOut}
		className = "link"
		>
			Logout
		</button>)
		:
		(
		<Link
		to = "/login-register"
		id = "login-register-link"
		className = "link"
		>
			Login / Register
		</Link>);
	return (
		<div id = "navbar">
			<Link 
			to = "/"
			id = "home-link"
			className = "link"
			>
				Foodie
			</Link>
			<Link
			to = "/about"
			id = "about-link"
			className = "link"
			>
				About
			</Link>
			<div id = "space"></div>
			{userButton}
		</div>
	);
}

export default NavBar;