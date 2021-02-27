import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import './liveView.css';

export default function LiveView(props) {
    let history = useHistory();
    
    return (
        <div id="liveview-container">
            <span>LiveView Component</span>
        </div>
    )
}
