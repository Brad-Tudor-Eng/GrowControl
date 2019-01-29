import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { connect } from 'react-redux'


import actions from "../../Actions"

const CREATE_USER = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      email
    }
  }
`;


 class SignUp extends Component {

  state = {
    email: "",
    password: "",
    name: "",
    loading: false,
    data: null
  }

    loadingBtn = ({createUser}) =>{

      if(this.state.loading){
        return(
          <div className="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
      }else{
        return (
          <button className="btn_primary"
          onClick={ ()=>{
            this.setState({loading: true})
            createUser({ variables: { 
              data: {
                  email: this.state.email,
                  name: this.state.name,
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
                  <div id="login" className="authForm card">
                      <span 
                          className="authForm_close form_close"
                          onClick={()=>{this.props.setDisplay()}}
                      >X</span>
                      <h2 className="authForm_header H_secondary">Sign Up</h2>
                      
                      <input
                          id="email"
                          name="email"
                          className="form_input"
                          type="email"
                          value={this.state.email}
                          onChange={(event)=>{this.setState({email: event.target.value})}}
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
                      
                      <input
                          name="name_input"
                          className="form_input"
                          value={this.state.name}
                          onChange={(event)=>{this.setState({name: event.target.value})}}
                      ></input>
                      <label type="form_label" htmlFor="name_input">Name</label>
                      <Mutation 
                      mutation={CREATE_USER} 
                      update={(cache, { data })=>{
                        this.props.setUser(data)
                        this.props.history.push('/dashboard')
                      }}
                      >
                      {(createUser, { data }) => {              
                          return (
                          <div>
                            { this.loadingBtn({createUser}) }
                          </div>
                        )}
                        
                        }
                      </Mutation> 
              </div>
          </div>
    );
  }

};

const mapStateToProps=(state)=>{
  return {
    state
  }
}



export default connect(mapStateToProps,  actions )(withRouter(SignUp))