import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {

    render(){
        return(
            <div className="header">
                <Link className="header_link" to="/">Logo</Link>
                <Link className="header_link" to="/Dashboard">Login</Link>
                <Link className="header_link" to="/signUp">Sign Up</Link>
            </div>
        )
    }

}

export default Header