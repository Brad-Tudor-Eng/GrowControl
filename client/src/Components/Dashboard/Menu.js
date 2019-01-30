import React, {Component} from 'react'


//This component executes the mutation for updating
//The device settings

class Menu extends Component {

    state={
        expanded: null
    }

  compress = (e) => {
    if(!this.state.expanded){
        this.setState({expanded: "expanded"})
    }else{
        this.setState({expanded: null})
    }
    
  }
    render(){
            return (


                <div className= {`menu ${this.state.expanded}`}>
                    <div className={`menu_links ${this.state.expanded}`}>
                        <p>Device Menu</p>
                        <p>User Account</p>
                    </div>
                    <div 
                    className={`menu_btn ${this.state.expanded}`}
                    onClick={this.compress}>
                        <div onClick={this.compress} className="menu_bar-1"></div>
                        <div onClick={this.compress} className="menu_bar-2"></div>
                        <div onClick={this.compress} className="menu_bar-3"></div>
                    </div>
                </div>

        )
    }
}

export default Menu