import React, {Component} from 'react';
import '../css/FoodFinder.css';


class FoodFinder extends Component {
  constructor(props) {
    super(props);
    let {food, location, budget} = this.props;
    budget = "$" + budget;
    this.state = ({
      food: food,
      location: location,
      budget: budget,
      sendable: false,
      sent: false,
    });
    this.checkSendable = this.checkSendable.bind(this);
    this.updateFood = this.updateFood.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFood);
    clearTimeout(this.timeOutLocation);
    clearTimeout(this.timeOutBudget);
  }

  checkSendable(){
    const {food, location, budget} = this.state;

    const foodRegex = /^[a-zA-Z\s]+$/;
    const incorrectFood = (food === "") || !(foodRegex.test(food));

    const locationRegex = /^[a-zA-Z\s]+, [a-zA-Z\s]+$/;
    const incorrectLocation = (location === "") || !(locationRegex.test(location));

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
      food: food,
    });
    this.timeOutFood = setTimeout(this.checkSendable, 100);
  }

  updateLocation(e){
    const location = e.target.value;
    this.setState({
      location: location,
    });
    this.timeOutLocation = setTimeout(this.checkSendable, 100);
  }

  updateBudget(e){
    let budget = e.target.value;
    if (!(budget.includes("$"))){
      budget = "$" + budget;
    }
    this.setState({
      budget: budget,
    });
    this.timeOutBudget = setTimeout(this.checkSendable, 100);
  }

  handleSearch(e){
    e.preventDefault();
    const {food, location, budget, sendable} = this.state;
    const {history} = this.props;
    if (sendable){
      const foodProcessed = food.replace(/ /g, "-");
      let locationProcessed = location.replace(/, /g, "-");
      locationProcessed = locationProcessed.replace(/ /g, "-");
      const budgetProcessed = budget.replace(/\$/g, "");

      const url = "/results/"+locationProcessed+"/"+foodProcessed+"/"+budgetProcessed; 
      console.log(url);

      history.push(url);
    }
  }

  render() {
    const {food, location, budget} = this.state;
    return (
      <div id = "food-finder" className = {this.props.position}>
        <form onSubmit = {this.handleSearch}>
          <div id = "food">
            <p>Food?</p>
            <input 
              id = "food-input"
              value = {food}
              placeholder = "e.g. Chicken..."
              onChange = {this.updateFood}
            >
            </input>
          </div>
          <div id = "location">
            <p>Location?</p>
            <input 
              id = "location-input"
              value = {location}
              placeholder = "e.g. Baltimore, Maryland..."
              onChange = {this.updateLocation}
            >
            </input>
          </div>
          <div id = "budget">
            <p>Budget?</p>
            <input 
              id = "budget-input"
              value = {budget}
              placeholder = "e.g. $8"
              onChange = {this.updateBudget}
            >
            </input>
          </div>
          <div id = "submit">
            <input 
              id = "search"
              type = "submit"
              onClick = {this.handleSearch}
              value = "Search"
            >
            </input>
          </div>
        </form>
      </div>
    );
  }
}


export default FoodFinder;