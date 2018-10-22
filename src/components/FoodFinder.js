import React, {Component} from 'react';
import Search from "@material-ui/icons/Search";
import '../css/FoodFinder.css';


class FoodFinder extends Component {
  constructor(props) {
    super(props);
    const {isHome} = this.props 
    let params = {food: "", location: "", budget: ""}
    if ((sessionStorage.getItem('search')) && !isHome) {
      params = JSON.parse(sessionStorage.getItem('search'))
    }
    this.state = ({
      ...params,
      sendable: false,
    });
    this.checkSendable = this.checkSendable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutChange);
    clearTimeout(this.timeOutBudget);
  }

  componentDidMount(){
    this.checkSendable();
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

  handleChange(e){
    const change = e.target.value;
    const type = e.target.name;
    this.setState({
      [type]: change,
    });
    this.timeOutChange = setTimeout(this.checkSendable, 100);
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
      const search = {
        location: location,
        food: food,
        budget: budget,
      }
      sessionStorage.setItem('search', JSON.stringify(search));
      const foodProcessed = food.replace(/ /g, "-");
      let locationProcessed = location.replace(/, /g, "-");
      locationProcessed = locationProcessed.replace(/ /g, "-");
      const budgetProcessed = budget.replace(/\$/g, "");

      const url = "/results/"+locationProcessed+"/"+foodProcessed+"/"+budgetProcessed; 

      history.push(url);
    }
  }

  render() {
    const searchStyle = {
      color: "#68686C",
      margin: "auto",
      paddingLeft: "5px"
    }
    const {food, location, budget} = this.state;
    return (
      <div id = "food-finder" className = {this.props.position}>
        <form onSubmit = {this.handleSearch}>
          <Search style = {searchStyle}/>
          <div id = "food">
            <label>Food?</label>
            <input 
              name = "food"
              id = "food-input"
              value = {food}
              placeholder = "e.g. Chicken..."
              onChange = {this.handleChange}
              autoComplete = "off"
            >
            </input>
          </div>
          <div id = "location">
            <label>Location?</label>
            <input 
              name = "location"
              id = "location-input"
              value = {location}
              placeholder = "e.g. Baltimore, Maryland..."
              onChange = {this.handleChange}
              autoComplete = "off"
            >
            </input>
          </div>
          <div id = "budget">
            <label>Budget?</label>
            <input 
              name = "budget"
              id = "budget-input"
              value = {budget}
              placeholder = "e.g. $8"
              onChange = {this.updateBudget}
              autoComplete = "off"
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