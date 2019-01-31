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

  displayMenu = (menu) => {
    this.props.setMenu(menu)
    this.props.setModal()
  }


    render(){

        

            return (


                <div onClick={this.compress} className= {`menu ${this.state.expanded}`}>
                    <div className={`menu_links ${this.state.expanded}`}>
                        <p onClick={()=>{this.displayMenu("deviceMenu")}}>Logout</p>
                        <p onClick={()=>{this.displayMenu("deviceMenu")}}>Device Menu</p>
                        <p onClick={()=>{this.displayMenu("userAccount")}}>User Account</p>
                    </div>
                    <div 
                    className={`menu_btn ${this.state.expanded}`}
                    >
                        <div  className="menu_bar-1"></div>
                        <div  className="menu_bar-2"></div>
                        <div  className="menu_bar-3"></div>
                    </div>
                </div>

        )
    }
}

export default Menu