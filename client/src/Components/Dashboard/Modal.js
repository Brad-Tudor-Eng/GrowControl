import React, {Component} from 'react'
import ModifyUser from './ModifyUser'
import DeviceMenu from './DeviceMenu'

class Modal extends Component {

    state = {

    }

    closeModal = () => {
        this.props.setModal()
    }

    renderForm = () => {
        switch (this.props.menu) {
            case "userAccount": return <div><ModifyUser /></div>
            case "deviceMenu": return <div><DeviceMenu /></div>
            default: return null
        }
    }

    renderTitle = () => {
        switch (this.props.menu) {
            case "userAccount": return "User Account"
            case "deviceMenu": return "Device Menu"
            default: return null
        }
    }

    render(){
        return (
            <div className="modal">
                <div className="modal_content card">
                    <p 
                    onClick={()=>{this.closeModal()}}
                    className="modal_close form_close">X</p>
                    <h2 className="modal_header H_secondary">{this.renderTitle()}</h2>
                    <div className="modal_body">
                        {this.renderForm()}
                    </div>
                </div>
            </div>
        )
    }

}

export default Modal