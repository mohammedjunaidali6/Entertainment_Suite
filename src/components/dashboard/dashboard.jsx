import React, { Fragment } from 'react';
import LineChart from "../common/utils/lineChart";
import CustomerOverview from "./customerOverview/customerOverview";
import { lineChartData } from "../../constants/globalMockdata";
import './dashboard.css';

export default function Dashboard(props) {
    return (
        <Fragment>
            <div id="dashboard-container" className="p-2">
                <div className="overview-heading float-left clearfix mb-2">Sales Overview</div>
                <div className="w-100 float-left clearfix mb-4 sales-overview">
                    <div className="w-50 float-left clearfix  sales-overview-box-outer">
                        <div className="sales-overview-box"></div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box"></div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box"></div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box"></div>
                    </div>
                </div>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <LineChart data={lineChartData}
                                chartTitle="Sales Chart">
                    </LineChart>
                </div>
                <div className="overview-heading float-left clearfix mb-2">Customer Overview</div>
                <CustomerOverview></CustomerOverview>
            </div>
        </Fragment>
    )
}
