import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import './gamePerformance.css';

export default function AnalyticsGamePerformance(props) {
    let history = useHistory();
    
    return (
        <div id="analytics-game-performance-container">
            <span>Analytics Game Performance</span>
        </div>
    )
}
