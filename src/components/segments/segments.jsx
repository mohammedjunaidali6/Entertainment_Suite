import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import './segments.css';

export default function Segments(props) {
    let history = useHistory();
    
    return (
        <div id="segments-container">
            <span>Segments Component</span>
        </div>
    )
}
