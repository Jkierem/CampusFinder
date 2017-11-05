import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { /*getBuildings ,*/ testBuildings } from './resources/Buildings'
import { BrowserRouter } from 'react-router-dom'
import './semantic/dist/semantic.min.css';

//var buildingsData = getBuildings();
var buildingsData = testBuildings;

ReactDOM.render(
  <BrowserRouter>
    <App buildings={buildingsData} />
  </BrowserRouter>,
  document.getElementById('root')
);
