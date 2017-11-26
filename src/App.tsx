import * as React from 'react';
import './App.css';
// import { connect } from 'react-redux';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Model } from './Models/Model';
const logo = require('./logo.svg');
import 'reflect-metadata';
import { ModelState } from './RickyValidation/ModelState';

class App extends React.Component {

  onClick() {
    let a: Model = new Model();
    let q = new ModelState(Model);
    a.name = 'ds';
    console.log(q.isValid(a));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <button onClick={this.onClick}> Validation </button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
