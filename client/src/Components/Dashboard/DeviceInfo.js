import React, {Component} from 'react'

//This component displays the current device info

class DeviceInfo extends Component {



    render(){
        return (
            <div className="deviceInfo card">

                <span className="dev_info_header dev_info_header-light">light</span>
                <span className="dev_info_header dev_info_header-temp">temp</span>
                <span className="dev_info_header dev_info_header-humidity">humidity</span>
                <span className="dev_info_header dev_info_header-moisture">moisture</span>

                <span className="dev_info_label dev_info_label-average">Avg</span>
                <span className="dev_info_label dev_info_label-tolerance">Tol</span>

                <input 
                className="P dev_info dev_info_name"
                placeholder={`Device Name: ${"Green Apple 1"}`} />

                <input placeholder={300} className="P dev_info-avg dev_info-avg-light" />
                <input placeholder={`+/- ${5}`} className="P dev_info-tol dev_info-tol-light" />

                <input placeholder={75} className="P dev_info-avg dev_info-avg-temp" />
                <input placeholder={`+/- ${5}`} className="P dev_info-tol dev_info-tol-temp" />

                <input placeholder={90} className="P dev_info-avg dev_info-avg-humidity" />
                <input placeholder={`+/- ${5}%`} className="P dev_info-tol dev_info-tol-humidity" />

                <input placeholder={60} className="P dev_info-avg dev_info-avg-moisture" />
                <input placeholder={`+/- ${5}%`} className="P dev_info-tol dev_info-tol-moisture" />

                <button className="dev_info_btn btn_primary"><span className="btn_primary-center">Submit</span></button>
                
            </div>
        )
    }
}

export default DeviceInfo