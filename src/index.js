import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { /*getBuildings ,*/ testBuildings } from './resources/Buildings'
import './semantic/dist/semantic.min.css';

//var buildingsData = getBuildings();
var buildingsData = testBuildings;

ReactDOM.render(
  <App buildings={buildingsData} />,
  document.getElementById('root')
);
