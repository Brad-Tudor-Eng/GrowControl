import React, { Component } from 'react'



import '../Styles/layout/mushroom.scss'
import '../Styles/layout/landing_center.scss'


import Login from './Login'
import SignUp from './SignUp';





class LandingCenter extends Component{

    state={
        display: "default",
        name: "",
        password: "",
        email: "",
    }

    def = () => (
        <div className="landing_center">
        <h1 className="center-header">Grow Control</h1>
        <div className="logo">
            <div className="mushroom"></div>
        </div>
        
        <button 
        onClick={()=>this.setState({display: "signUp"})}    
        className="center-signup-btn landing-btn"    
        ><span className="landing-btn-center">Sign-Up</span></button> 
        
        <button 
        onClick={()=>this.setState({display: "login"})}    
        className="center-login-btn landing-btn"
        ><span className="landing-btn-center">Login</span></button>
        </div>
    )

    
    
    authForm = ({form}) => {

        return form === "signUp" ? <SignUp /> : <Login />;

    }

    renderCenter = () => {
        const display = this.state.display
        switch (display){
            case "login": {
                return this.authForm({form: "login"});
            }

            case "signUp": {
                return this.authForm({form: "signUp"});
            }
            default: {
                return this.def();
            }
        }
    }

    render(){
        return(
            <div>
                {this.renderCenter()}
            </div>
        )
    }


}



export default LandingCenter