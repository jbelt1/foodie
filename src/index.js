import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import FoodieApp from './components/FoodieApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FoodieApp />, document.getElementById('root'));
registerServiceWorker();
