import React, { Component } from 'react';
import FoodFinder from './FoodFinder.js'
import '../css/foodieApp.css';



class FoodieApp extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectedFood: "",
      selectedLocation: "",
      budget: "",
      sendable: false,
    };
    this.checkSendable = this.checkSendable.bind(this);
  }

  checkSendable(){
    const {selectedFood, selectedLocation, budget} = this.state;

    const foodRegex = /^[a-zA-Z\s]+$/;
    const incorrectFood = (selectedFood === "") || !(foodRegex.test(selectedFood));

    const locationRegex = /^[a-zA-Z\s]+, [a-zA-Z\s]+$/;
    const incorrectLocation = (selectedLocation === "") || !(locationRegex.test(selectedLocation));

    const budgetRegex = /^\d+$/;
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
    const budget = e.target.value;
    this.setState({
      budget: budget,
    });
    setTimeout(this.checkSendable, 500);
  }

  handleSearch(){
    const {selectedFood, selectedLocation, budget, sendable} = this.state;
    if (sendable){
      const foodProcessed = selectedFood.replace(/ /g, "_");
      const locationProcessed = selectedLocation.replace(/ /g, "_");
      console.log(foodProcessed);
      console.log(locationProcessed);
      console.log(budget);
      const url = "/?location="+locationProcessed+"&food="+foodProcessed+"&budget="+budget; 
      console.log(url);
      fetch(url)
      .then(results => {
        console.log(results);
      });
    }
  }

  render() {
    return (
      <div id = "foodFinder">
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
          onClick = {() => 
            this.handleSearch()}
        />
      </div>
    );
  }
}

export default FoodieApp;
