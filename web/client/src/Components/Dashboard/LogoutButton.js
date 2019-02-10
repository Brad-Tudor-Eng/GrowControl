import React, {Component} from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import actions from '../../Actions'
import { withRouter } from 'react-router-dom'

const LOGOUT = gql`
  mutation logout($data: LogoutUserInput!) {
    logout(data: $data) {
        id
    }
  }
`;

class Logout extends Component {


logoutUser = (logout) => {
    //delete the cookie
    Cookies.remove("xAuthG")
    //remove the user from state
    this.props.logOut()
    //send the logout mutation
    logout({ variables: { 
        data: {
            userId: this.props.user.id
          } 
        } 
      })
    //send the user back to the login page
    this.props.history.push('/')
 }

render(){
    return (
        <Mutation 
            mutation={LOGOUT}
            onError={(error)=>{}}
            onCompleted={(data)=>{}} 
            >
            {(logout, { data }) => {  
            
                return (
                <div>
                <p onClick={()=>{ this.logoutUser(logout) }}>Logout</p>
                </div>
            )}}
            </Mutation> 
      );
}

};

const mapStateToProps = (state) => {
    
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, actions)(withRouter(Logout))




