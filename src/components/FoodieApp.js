import React, { Component } from 'react'
import { Route, Switch, withRouter} from "react-router-dom"
import NavBar from './NavBar.js'
import Home from './Home.js'
import About from './About.js'
import Results from './Results.js'
import Favorites from './Favorites.js'
import LoginRegister from './LoginRegister.js'


import '../css/FoodieApp.css'

class FoodieApp extends Component {
  constructor(props){
    super(props);
    this.state ={
      loggedIn: false,
      user: {},
      isLoading: false,
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login(user){
    sessionStorage.setItem('loggedIn', true);
    this.setState({
      loggedIn: true,
      user: user,
      isLoading: false,
    })
    this.props.history.push('/');
  }

  register(){
    this.props.history.push('/');
  }

  logout(){
    sessionStorage.setItem('loggedIn', false);
    localStorage.setItem('token', null);
    this.setState({
      loggedIn: false,
      user: {},
    });
    this.props.history.push('/');
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    if (!(token === "null")) {
      this.setState({
        isLoading: true,
      })
      const url = "/api/user/autologin";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'x-access-token': token
        },
      })
      .then((response) => {
        return response.json()}
      )
      .then((data) =>{
        this.login(data);
      });
    }
  }

  render() {
    const {loggedIn, isLoading} = this.state;
    return (
      <div id = "appContainer">
        <NavBar
        loggedIn = {loggedIn}
        logout = {this.logout}
        />
        <Switch>
          <Route exact path = "/" render = {props => <Home {...props} isLoading = {isLoading} />} />
          <Route exact path = "/about" render = {props => <About {...props} /> } />
          <Route exact path = "/login-register" render = {props => <LoginRegister {...props} login = {this.login} register = {this.register} /> } />
          <Route path = "/favorites" render = {props => <Favorites {...props} />} />
          <Route path = "/results/:location([a-zA-Z-]+-[a-zA-Z-]+)/:food([a-zA-Z-]+)/:budget(\d+)" render = {props => <Results {...props} loggedIn = {loggedIn}/> } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(FoodieApp);
