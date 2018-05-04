import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import NavBar from './NavBar.js'
import Home from './Home.js'
import About from './About.js'
import Results from './Results.js'
import LoginRegister from './LoginRegister.js'


import '../css/FoodieApp.css'

class FoodieApp extends Component {
  constructor(props){
    super(props);
    this.state ={
      loggedIn: false,
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout(){
    this.setState({
      loggedIn: false,
    });
  }

  login(){
    this.setState({
      loggedIn: true,
    });
  }

  componentDidMount(){
  }

  render() {
    const {loggedIn} = this.state;
    return (
      <div id = "appContainer">
        <NavBar
        loggedIn = {loggedIn}
        />
        <Switch>
          <Route exact path = "/" render = {props => <Home {...props} />} />
          <Route path = "/about" render = {props => <About {...props} /> } />
          <Route path = "/login-register" render = {props => <LoginRegister {...props} /> } />
          <Route path = "/results/:location([a-zA-Z-]+-[a-zA-Z-]+)/:food([a-zA-Z-]+)/:budget(\d+)" render = {props => <Results {...props} loggedIn = {loggedIn}/> } />
        </Switch>
      </div>
    );
  }
}

export default FoodieApp;
