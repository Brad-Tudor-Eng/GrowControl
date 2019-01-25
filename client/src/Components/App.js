import React, {Component} from 'react'
import {  BrowserRouter, Route } from 'react-router-dom'

import Header       from './Header'
import Landing      from './Landing'
import Dashboard    from './Dashboard'

class App extends Component {



    render(){
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/" exact component={Landing}/>
                        <Route path="/Dashboard" exact component={Dashboard}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App