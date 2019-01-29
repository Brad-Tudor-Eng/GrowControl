import React, { Component } from 'react'

import LandingCenter    from './LandingCenter'


import '../Styles/pages/landing.scss'

class Landing extends Component {

    render(){
        return(
            <div className="landing" >
                    <LandingCenter />
            </div>
        )
    }
}

export default Landing