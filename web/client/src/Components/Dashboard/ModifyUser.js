import React, {Component} from 'react'
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import actions from '../../Actions'
import { withRouter } from 'react-router-dom'
import Spinner from '../General/Spinner'

const UPDATE_USER = gql`
  mutation updateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($data: DeleteUserInput!) {
    deleteUser(data: $data) {
      id
    }
  }
`;

class ModifyUser extends Component {

    state = {
        email: "",
        password: "",
        loading: false,
        errorMsg: null,
      }


    
    updateBtn = (updateUser) =>{
        if(this.state.loading){
            return(<div> <Spinner /> </div>) 
        }else{
            return (
            <button className="btn_primary"
            onClick={ ()=>{
                this.setState({loading: true})
                updateUser({ variables: { 
                data: {
                    userId: this.props.user.id,
                    email: this.state.email,
                    password: this.state.password,
                    token: this.props.user.token
                    } 
                } 
                })
                
            }}
            
            >
            <span className="btn_primary-center">Update</span>
            </button>
            )
        }
    }



    deleteBtn = (deleteUser) => {


        if(this.state.loading){
            return(<div> <Spinner /> </div>) 
        }else{
            return (
            <button className="btn_primary btn_primary--del"
            onClick={ ()=>{

                //delete the cookie
                Cookies.remove("xAuthG")
                //remove the user from state
                this.props.logOut()
                 //send the delete mutation
                deleteUser({ variables: { 
                    data: {
                        userId: this.props.user.id
                    }} 
                })
                //send the user back to the login page
                this.props.history.push('/')
                
            }}
            
            >
            <span className="btn_primary-center btn_primary-center--del">Delete</span>
            </button>
            )
        }

     }

    render(){

        return(
            <div className="modifyUser">
            
                    <input
                        id="email"
                        name="email"
                        className="form_input"
                        value={this.state.email}
                        onChange={(event)=>{this.setState({email: event.target.value})}}
                        type="email"
                    ></input>
                    <label type="authForm label form_label" htmlFor="email">Email</label>
                
                    <input
                        id="password"
                        name="password"
                        className="form_input"
                        type="password"
                        value={this.state.password}
                        onChange={(event)=>{this.setState({password: event.target.value})}}
                    ></input>
                    <label type="authForm label form_label" htmlFor="password">Password</label>


                <div className="modifyUser_btns">

                    <Mutation 
                        mutation={UPDATE_USER} 
                        onCompleted={(data)=>{                             
                            this.setState({loading: false})
                            this.props.updateUser(data.updateUser)
                                //close the modal
                            this.props.closeModal()
                        }}
                        onError={()=>{
                        }}
                    >
                    {(updateUser, { data }) => (
                        <div>
                        { this.updateBtn(updateUser) }
                        </div>
                    )}
                    </Mutation> 
                        
                    <Mutation mutation={DELETE_USER} >
                        {(deleteUser, { data }) => (
                            <div>
                            { this.deleteBtn(deleteUser) }
                            </div>
                        )}
                    </Mutation> 
                </div>
                <p className="error">{this.state.errorMsg}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user 
    }
}

export default connect(mapStateToProps, actions)(withRouter(ModifyUser))
