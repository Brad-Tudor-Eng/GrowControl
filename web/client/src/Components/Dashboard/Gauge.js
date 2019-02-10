import React from 'react'

export default ( {measurement, val}) => (
    <div>
        <div  className={`card gauge ${measurement}`}>
                <div className="gauge_data">{val}</div>
        </div>
        <div className="gauge_label">{measurement}</div>
    </div>
)