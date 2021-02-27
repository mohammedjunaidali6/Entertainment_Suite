import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import './report.css';

export default function AnalyticsReport(props) {
    let history = useHistory();
    
    return (
        <div id="analytics-report-container">
            <span>Analytics Report Component</span>
        </div>
    )
}
