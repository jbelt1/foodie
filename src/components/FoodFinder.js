import React from 'react';
import '../css/FoodFinder.css';

function FoodFinder(props){
  const {budget, location, food} = props.currValues;
  return(
    <div id = "finder-wrapper" className = {props.position}>
      <form onSubmit = {props.onSubmit}>
        <div id = "food">
          <p>Food?</p>
          <input 
            id = "food-input"
            value = {food}
            placeholder = "e.g. Chicken..."
            onChange = {props.updateFood}

          >
          </input>
        </div>
        <div id = "location">
          <p>Location?</p>
          <input 
            id = "location-input"
            value = {location}
            placeholder = "e.g. Baltimore, Maryland..."
            onChange = {props.updateLocation}
          >
          </input>
        </div>
        <div id = "budget">
          <p>Budget?</p>
          <input 
            id = "budget-input"
            value = {budget}
            placeholder = "e.g. $8"
            onChange = {props.updateBudget}
          >
          </input>
        </div>
        <div id = "submit">
          <input 
            id = "search"
            type = "submit"
            onClick = {props.onSubmit}
            value = "Search"
          >
          </input>
        </div>
      </form>
    </div>
  );
}

export default FoodFinder;