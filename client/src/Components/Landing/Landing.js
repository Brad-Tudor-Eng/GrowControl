import React, { Component } from 'react'

import LandingAbout     from './LandingAbout'
import LandingCenter    from './LandingCenter'
import LandingKits      from './LandingKits'

import '../Styles/pages/landing.scss'

class Landing extends Component {

    render(){
        return(
            <div className="landing" >
                <LandingAbout />
                    <LandingCenter />
                <LandingKits />
            </div>
        )
    }
}

export default Landing