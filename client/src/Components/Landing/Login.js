import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const LOGIN_USER = gql`
  mutation loginUser($data: LoginUserInput!) {
    loginUser(data: $data) {
      id
      name
      email
    }
  }
`;


 class Login extends Component {

  state = {
    email: "",
    password: "",
    loading: false
  }

  loadingBtn = ({loginUser}) =>{

    if(this.state.loading){
      return(
        <div className="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      )
    }else{
      return (
        <button className="btn_primary"
        onClick={ ()=>{
          this.setState({loading: true})
          loginUser({ variables: { 
            data: {
                email: this.state.email,
                password: this.state.password
              } 
            } 
          })
          
        }}
        
      >
        <span className="btn_primary-center">Submit</span>
      </button>
      )
    }
  }

    render(){
        return (
          <div className="landing_center">

                <h1 className="center_header H_primary">Grow Control</h1>
                  <div className="authForm card">
                      <span 
                          className="authForm_close form_close"
                          onClick={()=>{this.props.setDisplay()}}
                      >X</span>
                      <h2 className="authForm_header H_secondary">Sign Up</h2>
                      
                      <input
                          id="email"
                          name="email"
                          className="form_input"
                          value={this.state.email}
                          onChange={(event)=>{this.setState({email: event.target.value})}}
                          type="email"
                      ></input>
                      <label type="form_label" htmlFor="email">Email</label>
                      
                      <input
                          id="password"
                          name="password"
                          className="form_input"
                          type="password"
                          value={this.state.password}
                          onChange={(event)=>{this.setState({password: event.target.value})}}
                      ></input>
                      <label type="form_label" htmlFor="password">Password</label>
                      
                      <Mutation mutation={LOGIN_USER} >
                      {(loginUser, { data }) => (
                          <div>
                          
                            { this.loadingBtn(loginUser) }

                          </div>
                        )}
                      </Mutation> 
              </div>
          </div>
    );
  }

};

export default withRouter(Login)
