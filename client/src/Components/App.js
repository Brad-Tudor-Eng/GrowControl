import React, { Component } from 'react';
import {User} from './GQL/Queries/User'

import './Styles/App.css';


class App extends Component {



  
  render() {
    return (
      <div className="App">
        <User email="abc@123.com"/>
      </div>
    );
  }
}

export default App;
