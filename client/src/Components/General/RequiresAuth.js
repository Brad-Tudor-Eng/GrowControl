import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'


export default (WrappedComponent)=>{
    class RequiresAuth extends Component{

        componentDidMount(){
            if(!Cookies.get('xAuthG')){
                this.props.history.push('/')
            }
        }


        componentWillUpdate(nextProps){
            if(!Cookies.get('xAuthG')){
                console.log(nextProps)
                this.props.history.push('/')
            }
        }


        render(){
            return <WrappedComponent {...this.props}/>
        }
    }
    return withRouter(RequiresAuth)
}

//turn this into a query component for the user