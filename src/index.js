import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import FoodieApp from './components/FoodieApp';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
	<Router>
		<FoodieApp />
	</Router>, 
	document.getElementById('root'));
registerServiceWorker();
