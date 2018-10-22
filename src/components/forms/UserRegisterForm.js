import React, {Component} from 'react';

class UserRegisterForm extends Component {
	constructor(props){
		super(props);
		this.state = ({
			username: "",
			email: "",
			password: "",
		});
		this.handleChange = this.handleChange.bind(this);
		this.handleRegistration = this.handleRegistration.bind(this);
	}

	handleChange(e){
		const change = e.target.value;
		const type = e.target.name;
		this.setState({
			[type]: change,
		});
	}

	handleRegistration(e){
		e.preventDefault()
		const register = this.props.register
		const body = this.state
		const url = "http://localhost:3000/api/user/register";
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
			console.log(data.message);
			register();
		});
	}

	render(){
		const {username, email, password} = this.state;
		return( 
			<div id = "user-register" >
				<form className = "form" onSubmit = {this.handleRegistration}> 
					<h3>Register</h3>
					<div className = "input-container username">
						<label>Username</label>
						<input 
						name = "username"
						className = "input-box" 
						value = {username} 
						placeholder = "Username"
						onChange = {this.handleChange}
						autoComplete = "off"
						required
						/>
					</div>
					<div className = "input-container email">
						<label>Email</label>
						<input 
						name = "email"
						className = "input-box" 
						value = {email}
						onChange = {this.handleChange}
						placeholder = "Email"
						autoComplete = "off"
						required
						/>
 					</div>
					<div className = "input-container password">
						<label>Password</label>
						<input 
						name = "password"
						type = "password"
						className = "input-box" 
						value = {password}
						onChange = {this.handleChange}
						placeholder = "Password"
						autoComplete = "off"
						required
						/>
 					</div>
 					<input
 					className = "input-submit"
 					type = "submit"
 					value = "Submit"
 					/>
				</form>
			</div>
		)
	}
}

export default UserRegisterForm;