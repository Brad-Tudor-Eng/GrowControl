
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import Spinner from '../General/Spinner'

import actions from "../../Actions"

const LOGIN_USER = gql`
  mutation loginUser($data: LoginUserInput!) {
    loginUser(data: $data) {
      id
      email
      token
    }
  }
`;

 class Login extends Component {

  state = {
    email: "",
    password: "",
    loading: false,
    errorMsg: null
  }


    handleClick = (loginUser)=>{
      const{email, password, loading} = this.state
      
      //check to see if the inputs exist
      if(email!=="" && password!=="" && !loading){
        this.setState({loading: true})

        loginUser({ variables: { 
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


    loadingBtn = ({loginUser}) =>{
      if(this.state.loading){
        return( <Spinner /> )
      }else{
        return (
          <div>
            <button className="btn_primary" 
              onClick={ ()=>{ this.handleClick(loginUser) }} >
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
                      <h2 className="authForm_header H_secondary">Login</h2>
                      
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
                      
                      <Mutation 
                      mutation={LOGIN_USER}
                      onError={(error)=>{
                        this.setError(error)
                      }}
                      onCompleted={(data)=>{
                        //if authenticated
                        if(data.loginUser.token){
                          const token = data.loginUser.token
                          Cookies.set("xAuthG", token)
                          this.props.login(data.loginUser)
                          this.props.history.push('/dashboard')
                          this.setState({loading: false,})
                        }else{
                          //set error message
                          this.setState({loading: false,})
                        }

                      }} 
                      >
                      {(loginUser, { data }) => {  
                        
                          return (
                          <div>
                            { this.loadingBtn({loginUser}) }
                          </div>
                        )}
                        
                        }
                      </Mutation> 
              </div>
          </div>
    );
  }

};


export default connect(null,  actions )(withRouter(Login))