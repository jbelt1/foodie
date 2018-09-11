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
      loggedIn: sessionStorage.getItem('loggedIn') === "true"
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  login(){
    sessionStorage.setItem('loggedIn', true)
    localStorage.setItem('loggedIn', true)
    this.setState({
      loggedIn: true,
    })
    this.props.history.push('/');
  }

  logout(){
    sessionStorage.setItem('loggedIn', false)
    localStorage.setItem('loggedIn', false)
    this.setState({
      loggedIn: false,
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
          <Route exact path = "/login-register" render = {props => <LoginRegister {...props} login = {this.login} /> } />
          <Route path = "/favorites" render = {props => <Favorites {...props} />} />
          <Route path = "/results/:location([a-zA-Z-]+-[a-zA-Z-]+)/:food([a-zA-Z-]+)/:budget(\d+)" render = {props => <Results {...props} loggedIn = {loggedIn}/> } />
        {/*<Route path = "/" render {props => <NoPage }*/}
        </Switch>
      </div>
    );
  }
}

export default withRouter(FoodieApp);
