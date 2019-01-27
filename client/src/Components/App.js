import React, {Component} from 'react'
import {  BrowserRouter, Route } from 'react-router-dom'

import './Styles/Index.scss'

import Landing      from './Landing/Landing'
import Dashboard    from './Dashboard/Dashboard'

class App extends Component {



    render(){
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="/" exact component={Landing}/>
                        <Route path="/Dashboard" exact component={Dashboard}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App