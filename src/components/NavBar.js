import React, { Component } from 'react';
import '../css/NavBar.css';

class NavBar extends Component {
  constructor(props){
	super(props);
	this.state = {
	  loginSelected : false,
	  createUserSelected : false,
	};
	this.userLogIn = this.userLogIn.bind(this);
	this.userLogOut = this.userLogOut.bind(this);
	this.userCreate = this.userCreate.bind(this);
  }

  userLogIn(){
  	if (!(this.state.createUserSelected)){
  		this.props.toggleActivate();
  	}
  	this.setState((prevState) => ({
  		loginSelected: !(prevState.loginSelected),
  		createUserSelected: false,
  	}))
  }

  userCreate(){
	if (!(this.state.loginSelected)) { 
		this.props.toggleActivate();
	}
  	this.setState((prevState) => ({
  		loginSelected: false,
  		createUserSelected: !(prevState.createUserSelected),
  	}))
  }

  userLogOut(){
  	this.props.logout();
  	this.setState({
  		loginSelected: false,
  		createUserSelected: false,
  	});
  }


  render(){
  	const {loginSelected, createUserSelected} = this.state;
  	let navForm = null;
  	if (loginSelected) {
  		navForm = <div id ="login-form" className = "nav-form"></div>
  	}
  	else if (createUserSelected) {
  		navForm = <div id ="create-user-form" className = "nav-form"></div>
  	}
	const {loggedIn, active} = this.props;
	const selectedLoginButton = (loginSelected && active) ? "selected" : "unselected"
	const selectedCreateButton = (createUserSelected && active) ? "selected" : "unselected"
	const newUserButton = loggedIn ? 
		(null) : (
		<button
		id = "create-user-button"
		className = {selectedCreateButton}
		onClick = {this.userCreate}>
			Create User
		</button>);
	const userButton = loggedIn ? (
		<button 
		id = "logout-button"
		onClick = {this.userLogOut}>
			Logout
		</button>)
		:
		(
		<button 
		id = "login-button"
		className = {selectedLoginButton}
		onClick = {this.userLogIn}>
			Login
		</button>);
		return(
			<div id = "navbar">
				<button
				id = "home-button"
				className = "unselected"
				>
					Foodie
				</button>
				<button
				id = "about-button"
				className = "unselected"
				>
					About
				</button>
				<div id = "space"></div>
				{navForm}
				{newUserButton}
				{userButton}
			</div>
		);
	}
}

export default NavBar;