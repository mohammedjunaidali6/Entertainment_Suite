import React, { Fragment } from 'react';
import LineChart from "../common/utils/lineChart";
import CustomerOverview from "./customerOverview/customerOverview";
import GamePlayingOverview from "./gamePlayingOverview/gamePlayingOverview";
import { lineChartData, lineChartSingleBlueData, lineChartSingleGreenData, 
        lineChartSinglePurpleData, lineChartSingleOrangeData } from "../../constants/globalMockdata";
import SalesOverviewBox from "./salesOverviewBox/salesOverviewBox";
import h_dots_src from "../../assets/img/dots-icon_horizontal.svg";
import './dashboard.css';

export default function Dashboard(props) {
    return (
        <Fragment>
            <div id="dashboard-container" className="p-2">
                <div className="overview-heading float-left clearfix mb-2">Sales Overview</div>
                <div className="w-100 float-left clearfix mb-4 sales-overview">
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox opt={lineChartSingleBlueData}></SalesOverviewBox>
                        </div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox opt={lineChartSingleGreenData}></SalesOverviewBox>
                        </div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox opt={lineChartSinglePurpleData}></SalesOverviewBox>
                        </div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox opt={lineChartSingleOrangeData}></SalesOverviewBox>
                        </div>
                    </div>
                </div>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <LineChart data={lineChartData}
                                chartTitle="Sales Chart"
                                showAction={true} >
                    </LineChart>
                </div>
                <div className="overview-heading float-left clearfix mb-2">Customer Overview</div>
                <CustomerOverview></CustomerOverview>
                <GamePlayingOverview></GamePlayingOverview>
            </div>
        </Fragment>
    )
}
