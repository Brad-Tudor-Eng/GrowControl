import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import './Styles/App.css';
const User = () => (
  <Query
    query={gql`
      {
        user(data: {email: "abc@123.com"}){
              name
              id
            }
      }
    `}
  >
    {({data, loading, error}) => {
      if(loading){ return <div><p>loading...</p></div>}
      const {id, name} = data.user
      return  (
        <div>
          <p>{name}</p>
          <p>{id}</p>
        </div>
        );
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <User />
      </div>
    );
  }
}

export default App;
