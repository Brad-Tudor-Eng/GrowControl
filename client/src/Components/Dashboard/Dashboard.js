import React, { Component } from 'react'
import {  connect } from 'react-redux'
import actions from '../../Actions'



class Dashboard extends Component {
    render(){
        console.log(this.state)
        return(
            <div className="dashboard" >
             <p>It's the Mother fucking dashboard</p>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return (
        state
    )
}

export default connect(mapStateToProps, actions)(Dashboard)