import React, { Component } from 'react';
import FoodFinder from './FoodFinder.js';
import FoodResults from './FoodResults.js';
import '../css/foodieApp.css';

class FoodieApp extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectedFood: "",
      selectedLocation: "",
      budget: "",
      sendable: false,
      appState: "FoodFinder",
      results: null,
      isLoading: false,
    };
    this.checkSendable = this.checkSendable.bind(this);
  }

  checkSendable(){
    const {selectedFood, selectedLocation, budget} = this.state;

    const foodRegex = /^[a-zA-Z\s]+$/;
    const incorrectFood = (selectedFood === "") || !(foodRegex.test(selectedFood));

    const locationRegex = /^[a-zA-Z\s]+, [a-zA-Z\s]+$/;
    const incorrectLocation = (selectedLocation === "") || !(locationRegex.test(selectedLocation));

    const budgetRegex = /^\$\d+$/;
    const incorrectBudget = (budget === "") || !(budgetRegex.test(budget));


    const sendable = !(incorrectBudget || incorrectLocation || incorrectFood);
    this.setState({
      sendable: sendable,
    });
  }

  updateFood(e){
    const food = e.target.value;
    this.setState({
      selectedFood: food,
    });
    setTimeout(this.checkSendable, 500);
  }

  updateLocation(e){
    const location = e.target.value;
    this.setState({
      selectedLocation: location,
    });
    setTimeout(this.checkSendable, 500);
  }

  updateBudget(e){
    let budget = e.target.value;
    if (!(budget.includes("$"))){
      budget = "$" + budget;
    }
    this.setState({
      budget: budget,
    });
    setTimeout(this.checkSendable, 500);
  }

  handleSearch(e){
    e.preventDefault();
    const {selectedFood, selectedLocation, budget, sendable} = this.state;
    if (sendable){
      this.setState({
          isLoading: true
      });
      const foodProcessed = selectedFood.replace(/ /g, "_");
      const locationProcessed = selectedLocation.replace(/ /g, "_");
      const budgetProcessed = budget.replace(/\$/g, "");
      console.log(foodProcessed);
      console.log(locationProcessed);
      console.log(budgetProcessed);
      const url = "http://localhost:8080/?location="+locationProcessed+"&food="+foodProcessed+"&budget="+budgetProcessed; 
      console.log(url);
      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          appState: "FoodResults",
          results: data,
          isLoading: false
        });
      });
    }
  }

  render() {
    const state = this.state.appState;
    let currState = (state === "FoodResults") ? 
         (<FoodResults 
          results = {this.state.results}
          />
        ) : null;
    return (
      <div id = "appContainer">
        <FoodFinder
          currValues = {
            {
              budget: this.state.budget,
              location: this.state.selectedLocation,
              food: this.state.selectedFood,
            }
          }
          updateFood = {(e) => 
            this.updateFood(e)}
          updateLocation = {(e) => 
            this.updateLocation(e)}
          updateBudget = {(e) => 
            this.updateBudget(e)}
          onSubmit = {(e) => 
            this.handleSearch(e)}
        />
        {currState}
      </div>
    );
  }
}

export default FoodieApp;
