import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {Link} from 'react-router-dom'

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

export default () => {
  let input;

  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { type: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};








//         <div className="landing_center">

//         <h1 className="center-header">Grow Control</h1>
//                 <div className="authForm card">
//                     <span 
//                         className="authForm_close"
//                         onClick={()=>{this.setState({display: "default"})}}
//                     >X</span>
//                     <h2 className="authForm_header">{ header }</h2>
                    
//                     <input
//                         id="email"
//                         name="email"
//                         value={this.state.email}
//                         onChange={(event)=>{this.setState({email: event.target.value})}}
//                         type="email"
//                     ></input>
//                     <label htmlFor="email">Email</label>
                    
//                     <input
//                         id="password"
//                         name="password"
//                         type="password"
//                         value={this.state.password}
//                         onChange={(event)=>{this.setState({password: event.target.value})}}
//                     ></input>
//                     <label htmlFor="password">Password</label>
                    
//                     <input
//                         name="name_input"
//                         value={this.state.name}
//                         onChange={(event)=>{this.setState({name: event.target.value})}}
//                     ></input>
//                     <label htmlFor="name_input">Name</label>
//                 <Link to="/Dashboard"><button className="landing-btn"><span className="landing-btn-center">Submit</span></button></Link>
//                 </div>
//         </div>