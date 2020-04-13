

import React from 'react';
import './App.css';


import {Home} from './components/Home'
import {Customer} from './components/Customer/Customer'
import {Product} from './components/Product/Product'
import{Store}from './components/Store/Store'
import{Sales} from './components/Sales/Sales'
import{Navigation} from './components/Navigation'

import {BrowserRouter,Route,Switch} from 'react-router-dom' 

/*1.This renders the view of the home page and also implement the routing functionality through importing
 browser router tag to invoke the corresponding class.
 2. Adding navigation menu from navigation component page */
 
function App() {
  return (
    <BrowserRouter>    
    <div className="container">

      <h3 className="m-3 d-flex justify-content-center">
      OnBoarding Task-Talent</h3>

      <Navigation/>

     <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/Customer' component={Customer}/>
      <Route path='/Product' component={Product}/>
      <Route path='/Store' component={Store}/>
      <Route path='/Sales' component={Sales}/>

      </Switch>
    </div> 
    </BrowserRouter>
  );
  
}

export default App;
