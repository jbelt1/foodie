import React from 'react';
import '../css/NavBar.css';

function NavBar(props) {
	const {logout, login, loggedIn} = props;
	const newUserButton = loggedIn ? 
		(null) : (
		<button
		id = "create-user-button">
			Create User
		</button>);
	const userButton = loggedIn ? (
		<button 
		id = "logout-button"
		onClick = {logout}>
			Logout
		</button>)
		:
		(
		<button 
		id = "login-button"
		onClick = {login}>
			Login
		</button>);
	return(
		<div id = "navbar">
			{newUserButton}
			{userButton}
		</div>
	);
}

export default NavBar;