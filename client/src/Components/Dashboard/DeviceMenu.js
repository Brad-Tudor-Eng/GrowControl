import React, {Component} from 'react'

class DeviceMenu extends Component {

    state={
        inputselectedDevice: null,
        inputDeviceId: null,
        inputDeleteDevice: null

    }

    render(){
        return(
            <div className="deviceMenu">
                <div><label>Select Device To Display: </label><div>Device Dropdown</div></div>
                <h2>OR</h2>
                <div><label>Device ID:</label><input/><button><span>Add a New Device</span></button></div>
                <div><div>Device Dropdown</div><input/><button><span>Delete a Device</span></button></div>
            </div>
        )
    }
}

export default DeviceMenu