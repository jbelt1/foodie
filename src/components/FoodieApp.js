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
    const user = localStorage.user;
    this.state ={
      loggedIn: localStorage.getItem('loggedIn') === "true",
      user: user ? JSON.parse(user) : {},
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login(user){
    localStorage.setItem('loggedIn', true)
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({
      loggedIn: true,
      user: user,
    })
    this.props.history.push('/');
  }

  register(){
    this.props.history.push('/');
  }

  logout(){
    localStorage.setItem('loggedIn', false)
    localStorage.setItem('user', "{}");
    this.setState({
      loggedIn: false,
      user: {},
    });
    this.props.history.push('/');
  }

  componentDidMount(){
  }

  render() {
    const {loggedIn} = this.state;
    return (
      <div id = "appContainer">
        <NavBar
        loggedIn = {loggedIn}
        logout = {this.logout}
        />
        <Switch>
          <Route exact path = "/" render = {props => <Home {...props} />} />
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
