import React from 'react';
import './App.css';
import Form from './components/Form.js'
import { Link, Route, BrowserRouter } from "react-router-dom";
import Pizza from './components/Pizza'


function App() {
  return (
    <BrowserRouter>
    <Link to="/">
    <h1 id="center">Home Page</h1>
    </Link>
    <Link to="/pizza">
      <div id="center">Pizza?</div>
    </Link>
    <Route exact path ="/pizza" component={Pizza} />
    </BrowserRouter>
    
    
  );
}

export default App;
