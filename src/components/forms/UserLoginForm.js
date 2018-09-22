import React, {Component} from 'react';

class UserLoginForm extends Component {
	constructor(props){
		super(props);
		this.state = ({
			username: "",
			password: "",
		});
		this.handleChange = this.handleChange.bind(this);
		this.userLogin = this.userLogin.bind(this);
	}

	userLogin(e){
		e.preventDefault();
		const login = this.props.login;
		const body = this.state
		const url = "http://localhost:3000/api/user/login";
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(body)
		})
		.then((response) => {
			return response.json()}
		)
		.then((data) =>{
			if (data.success) {
				login(data.user);
			}
			else {
				console.log("Wrong password");
			} 
		});
	}

	handleChange(e){
		const change = e.target.value;
		const type = e.target.name;
		this.setState({
			[type]: change,
		});
	}

	render(){
		const {username, password} = this.state;
		return(
			<div id = "user-login">
				<form className = "form" onSubmit = {this.userLogin}>
					<h3>Login</h3>
					<div className = "input-container username">
						<label>Username</label>
						<input 
						name = "username"
						className = "input-box" 
						value = {username}
						onChange = {this.handleChange}
						placeholder = "Username"
						autoComplete = "off"
						required
						/>
					</div>
					<div className = "input-container password">
						<label>Password</label>
						<input
						type = "password"
						name = "password" 
						className = "input-box" 
						value = {password}
						onChange = {this.handleChange}
						placeholder = "Password"
						autoComplete = "off"
						required
						/>
 					</div>
 					<div id = "remember-me">
 						<input
 						name = "remember"
 						type = "checkbox"
 						/>
 						<label>
 							Remember me?
 						</label>
 					</div>
 					<input
 					className = "input-submit"
 					type = "submit"
 					value = "Login"
 					/>
				</form>
			</div>
		)
	}
}

export default UserLoginForm;