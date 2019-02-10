import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import Spinner from '../General/Spinner'

import actions from "../../Actions"

const CREATE_USER = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      email
      token
    }
  }
`;


 class SignUp extends Component {

  state = {
    email: "",
    password: "",
    loading: false,
    errorMsg: null
  }


    handleClick = (createUser)=>{
      const{email, password, loading} = this.state
      
      //check to see if the inputs exist
      if(email!=="" && password!=="" && !loading){
        this.setState({loading: true})

        createUser({ variables: { 
          data: {
              email: this.state.email,
              password: this.state.password
            } 
          } 
        })
      
      }else{
        this.setState({errorMsg: "please check inputs"})
      }
    }


    loadingBtn = ({createUser}) =>{
      if(this.state.loading){
        return( <Spinner /> )
      }else{
        return (
          <div>
            <button className="btn_primary" 
              onClick={ ()=>{ this.handleClick(createUser) }} >
              <span className="btn_primary-center">Submit</span>
            </button>
            <p className="error">{this.state.errorMsg}</p>
          </div>
        )
      }
    }

    setError = (error) => {
      const msg = error.message.slice(error.message.indexOf(":")+2)
      Cookies.remove("xAuthG")
      this.setState({errorMsg: msg, loading: false, email: "", password: ""})
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
                          type="email"
                          value={this.state.email}
                          onChange={(event)=>{this.setState({email: event.target.value})}}
                      ></input>
                      <label>Email</label>
                      
                      <input
                          type="password"
                          value={this.state.password}
                          onChange={(event)=>{this.setState({password: event.target.value})}}
                      ></input>
                      <label>Password</label>
                      
                      <Mutation 
                      mutation={CREATE_USER}
                      onError={(error)=>{
                        this.setError(error)
                      }}
                      onCompleted={(data)=>{
                        //if authenticated
                        if(data.createUser.token){
                          const token = data.createUser.token
                          Cookies.set("xAuthG", token)
                          this.props.signUp(data.createUser)
                          this.props.history.push('/dashboard')
                        }else{
                          //set error message
                          this.setState({loading: false,})
                        }

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


export default connect(null,  actions )(withRouter(SignUp))