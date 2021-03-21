import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import './trends.css';

export default function AnalyticsTrends(props) {
    let history = useHistory();
    
    return (
        <div id="analytics-trends-container">
            <span>Analytics Trends</span>
        </div>
    )
}
