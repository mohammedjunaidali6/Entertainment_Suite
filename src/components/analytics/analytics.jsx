import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import './analytics.css';
import AnalyticsReportContatiner from "../../containers/analytics/report/reportContainer";
import AnalyticsTrendsContatiner from "../../containers/analytics/trends/trendsContainer";
import AnalyticsGamePerformanceContatiner from "../../containers/analytics/gamePerformance/gamePerformanceContainer";

export default function Analytics(props) {
    let history = useHistory();
    
    return (
        <div id="analytics-container">
            <span>Analytics Component</span>
            {history.location.pathname === '/analytics/report' ? (
                <AnalyticsReportContatiner />
            ) : null}
            {history.location.pathname === '/analytics/trends' ? (
                <AnalyticsTrendsContatiner />
            ) : null}
            {history.location.pathname === '/analytics/gamePerformance' ? (
                <AnalyticsGamePerformanceContatiner />
            ) : null}
        </div>
    )
}
