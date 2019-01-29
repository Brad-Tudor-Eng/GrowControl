import React, {Component} from 'react'

import SignUp from './SignUp'
import Login from './Login'

class Landing extends Component{

    state={
        display: "landing"
    }

    landing = () => (

        <div className="landing_center">
                <h1 className="center_header H_primary">Grow Control</h1>

            <div className="center_logo">
                <div className=" mushroom_landing_center mushroom"></div>
            </div>
            
            <button 
            onClick={()=>this.setState({display: "signUp"})}    
            className="center_signUp btn_primary"    
            ><span className="btn_primary btn_primary-center">Sign-Up</span></button> 
            
            <button 
            onClick={()=>this.setState({display: "login"})}    
            className="center_login btn_primary"
            ><span className="btn_primary btn_primary-center">Login</span></button>
        </div>

    )

    setDisplay = () => {
        this.setState({display: "landing"})
    }

    renderCenter = () => {
        const display = this.state.display;
        switch(display){
            case "login": {
                return  <Login setDisplay={this.setDisplay}/>;
            }

            case "signUp": {
                return <SignUp setDisplay={this.setDisplay}/>;
            }
            default: {
                return this.landing();
            }
        }
    }

    render(){
        return(
            <div className="landing">
                {this.renderCenter()}
            </div>
        )
    }

}

export default Landing