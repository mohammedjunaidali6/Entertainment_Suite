import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import LineChart from "../../common/utils/lineChart";
import BarChart from "../../common/utils/barChart";
import SearchBar from "../../common/searchBar/searchBar";
import DoughnutChart from '../../common/utils/doughnutChart';
import Table from "../../common/reactTable/table";
import { lineChartData, barChartData,
    doughnutChartData } from "../../../constants/globalMockdata";
import { AnalyticsMockData, AnalyticsTableColumns } from "../../../constants/globalMockdata";
import './report.css';

export default function AnalyticsReport(props) {
    let history = useHistory();
    
    return (
        <div id="analytics-report-container">
            <div className="a-r-table-sec">
                <Table columns={AnalyticsTableColumns} 
                    data={ AnalyticsMockData } 
                    pagination={true}
                    subHeaderComponent={
                        <SearchBar fromAnalyticsReport={true} />
                    } 
                    subHeader={true} 
                />
            </div>
            <div className="w-100 float-left clearfix l-v-charts a-r-table-sec">
                <div className="w-50 float-left clearfix l-v-chart-box-outer">
                    <div className="l-v-chart-box">
                        <LineChart data={lineChartData}
                                chartTitle="Sales Chart"
                                showAction={true} >
                        </LineChart>
                    </div>
                </div>
                <div className="w-50 float-left clearfix l-v-chart-box-outer">
                    <div className="l-v-chart-box">
                        <BarChart data={lineChartData}
                                chartTitle="Sales Chart" 
                                showAction={true}
                                showInfo={true}
                                showRefresh={true} >
                        </BarChart>
                    </div>
                </div>
                <div className="w-50 float-left clearfix l-v-chart-box-outer">
                    <div className="l-v-chart-box">
                        <BarChart data={barChartData}
                                showLines={false}
                                chartTitle="Coupons Redeemed"
                                showAction={true}
                                noXLine={true} >
                        </BarChart>
                    </div>
                </div>
                <div className="w-50 float-left clearfix l-v-chart-box-outer">
                    <div className="l-v-chart-box">
                        <DoughnutChart data={doughnutChartData}
                                    chartTitle="Top performing Games" 
                                    showAction={true}
                                    showInfo={true}
                                    showRefresh={true} >
                        </DoughnutChart>
                    </div>
                </div>
            </div>
        </div>
    )
}
