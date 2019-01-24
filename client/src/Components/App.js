import React, { Component } from 'react';
import {User} from './GQL/Queries/User'
import RecordAll from './GQL/Queries/Record'
import RecordSubscription from './GQL/Queries/RecordSubscription'
import {DataListWithData} from './GQL/Queries/STMRecord'

import './Styles/App.css';
// <RecordAll 
// deviceId={"5c3f88501a89ca3a9c26c16d"}  
// />

//<User email={"abc@123.com"}/>
//<RecordSubscription deviceId={"5c3f88501a89ca3a9c26c16d"}  userId={"5c3f82b8866a413040dc5ffd"}  />


class App extends Component {



  
  render() {
    return (
      <div className="App">
        <DataListWithData deviceId={"5c3f88501a89ca3a9c26c16d"}  userId={"5c3f82b8866a413040dc5ffd"}/>
      </div>
    );
  }
}

export default App;
