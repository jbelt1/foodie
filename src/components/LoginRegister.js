import React from 'react';
import UserRegisterForm from './forms/UserRegisterForm';
import UserLoginForm from './forms/UserLoginForm';
import '../css/LoginRegister.css';

function LoginRegister(props){
	const login = props.login
	return (
		<div id = "login-register">
			<UserLoginForm login = {login}/>
			<UserRegisterForm/>
		</div>
	);
}

export default LoginRegister