import React from 'react';
import '../css/NavBar.css';
import {Link} from 'react-router-dom';

function NavBar(props) {
	const {loggedIn, logout} = props;
	const userButton = loggedIn ? (
		<button 
		id = "logout-button"
		onClick = {logout}
		className = "link"
		name = "Logout"
		>
			Logout
		</button>
		)
		:
		(
		<Link
		to = "/login-register"
		id = "login-register-link"
		className = "link"
		>
			Login / Register
		</Link>);
	const favorites = loggedIn ? (
		<Link 
		to = "/favorites"
		id = "favorites-link"
		className = "link">
			Favorites
		</Link>) : null
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
			{favorites}
			{userButton}
		</div>
	);
}

export default NavBar;