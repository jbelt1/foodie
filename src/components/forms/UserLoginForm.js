import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
	colorSwitchBase: {
	  color: "#EB7608",
	  '&$colorChecked': {
		color: "#EB7608",
		'& + $colorBar': {
		  backgroundColor: "#EB7608",
		  opacity: .5
		},
	  },
	},
	colorBar: {},
	colorChecked: {},
  });

class UserLoginForm extends Component {
	constructor(props){
		super(props);
		this.state = ({
			username: "",
			password: "",
			remember: false,
		});
		this.handleChange = this.handleChange.bind(this);
		this.userLogin = this.userLogin.bind(this);
	}

	userLogin(e){
		e.preventDefault();
		const login = this.props.login;
		const body = this.state
		const url = "/api/user/login";
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
			console.log(data);
			localStorage.setItem('token', data.token);
			const user = {
				email: data.email,
				username: body.username,
			}
			login(user);
		});
	}

	handleChange(e){
		
		const type = e.target.name;
		const change = type === "remember" ? e.target.checked :e.target.value;
		this.setState({
			[type]: change,
		});
	}

	render(){

		const {username, password, rememberChecked} = this.state;
		const {classes} = this.props;
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
					<FormControlLabel
					control={
						<Switch
						classes={{
							switchBase: classes.colorSwitchBase,
							checked: classes.colorChecked,
							bar: classes.colorBar,
						}}
						name="remember"
						checked={this.state.remember}
						onChange={this.handleChange}
						value="remember"
						/>
					}
					label="Remember me"
					/>
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

export default withStyles(styles)(UserLoginForm);