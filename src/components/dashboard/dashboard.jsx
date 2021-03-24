import React, { Fragment } from 'react';
import LineChart from "../common/utils/lineChart";
import CustomerOverview from "./customerOverview/customerOverview";
import GamePlayingOverview from "./gamePlayingOverview/gamePlayingOverview";
import { lineChartData, lineChartSingleBlueData, lineChartSingleGreenData, 
        lineChartSinglePurpleData, lineChartSingleOrangeData } from "../../constants/globalMockdata";
import SalesOverviewBox from "./salesOverviewBox/salesOverviewBox";
import h_dots_src from "../../assets/img/dots-icon_horizontal.svg";
import calender_src from '../../assets/img/calender.svg';
import down_arrow_src from '../../assets/img/down_arrow.svg';
import './dashboard.css';

export default function Dashboard(props) {
    return (
        <Fragment>
            <div id="dashboard-container" className="p-2">
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix">
                        <div className="overview-heading float-left clearfix mt-2">Sales Overview</div>
                    </div>
                    <div className="w-50 float-left clearfix">
                        <div className="w-100 float-right clearfix mb-1">
                            <div className="float-right clearfix mb-1 f-c-box" >
                                <img src={calender_src} alt="Calender" className="mr-2" style={{width: '16px'}} />
                                <span className="d-dp-lbl pr-1">Current week</span>
                                <img src={down_arrow_src} alt="Down Arrow" />
                            </div>
                        </div>
                    </div>
                </div>
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
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix">
                        <div className="overview-heading float-left clearfix mt-2">Customer Overview</div>
                    </div>
                    <div className="w-50 float-left clearfix">
                        <div className="w-100 float-right clearfix mb-1">
                            <div className="float-right clearfix mb-1 f-c-box" >
                                <img src={calender_src} alt="Calender" className="mr-2" style={{width: '16px'}} />
                                <span className="d-dp-lbl pr-1">Current week</span>
                                <img src={down_arrow_src} alt="Down Arrow" />
                            </div>
                        </div>
                    </div>
                </div>
                <CustomerOverview></CustomerOverview>
                <GamePlayingOverview></GamePlayingOverview>
            </div>
        </Fragment>
    )
}
