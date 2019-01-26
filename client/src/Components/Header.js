import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {

    render(){
        return(
            <div className="header">
                <Link className="header_link header_link-logo link-font" to="/">Logo</Link>
                <Link className="header_link link-font" to="/Dashboard">Login</Link>
                <Link className="header_link link-font" to="/signUp">Sign Up</Link>
            </div>
        )
    }

}

export default Header