import React from 'react';
import logo from './doggo.png';
import './App.css';
import Testing from './testing'
import{Route, Link, Redirect} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <Testing />
        </div>
      </header>
    </div>
  );
}

export default App;
