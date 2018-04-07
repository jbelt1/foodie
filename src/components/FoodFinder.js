import React, { Component } from 'react';

function FoodFinder(props){
  const {budget, location, food} = props.currValues;
  return(
    <div id = "finder-wrapper">
      <textarea
        id = "food-input"
        value = {food}
        placeholder = "Food?"
        onChange = {props.updateFood}
      >
      </textarea>
      <textarea 
        id = "location-input"
        value = {location}
        placeholder = "City, State"
        onChange = {props.updateLocation}
      >
      </textarea>
      <textarea 
        id = "budget-input"
        value = {budget}
        placeholder = "Budget?"
        onChange = {props.updateBudget}
      >
      </textarea>
      <button 
      id = "search"
      onClick = {props.onClick}
      >
      Search
      </button>
    </div>
  );
}

export default FoodFinder;