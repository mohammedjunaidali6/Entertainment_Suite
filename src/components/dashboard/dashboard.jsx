import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LineChart from "../common/utils/lineChart";
import LineCanvasGraph from '../common/graphs/lineCanvasGraph';
import CustomerOverview from "./customerOverview/customerOverview";
import GamePlayingOverview from "./gamePlayingOverview/gamePlayingOverview";
import {
    lineChartData, lineChartSingleBlueData, lineChartSingleGreenData,
    lineChartSinglePurpleData, lineChartSingleOrangeData
} from "../../constants/globalMockdata";
import SalesOverviewBox from "./salesOverviewBox/salesOverviewBox";
import './dashboard.css';
import { postAuthAndData } from '../../api/ApiHelper';
import {
    REPT_PROD_HOST_URI,
    CONSOLIDATION_SUMMARY_BY_FILTER,
    DAY_WISE_SALES_BY_FILTER,
    DAY_WISE_ACTIVE_ENGAGED_USERS,
    MONTH_WISE_ACTIVE_ENGAGED_USERS,
    DAYS_7,
    CUSTOMER_OVERVIEW_DETAILS
} from '../../api/apiConstants';


export default function Dashboard(props) {
    console.log('***', props);
    const [filterDurataion, setFilterDuration] = useState(7);


    const handleLoader = (showBool) => {
        props.routeActionHandler.dispatchLoaderData(showBool);
    }

    const getSummaryTotalsOnDateFilterClick = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        setFilterDuration(durationDays);
        postAuthAndData(`${REPT_PROD_HOST_URI}${CONSOLIDATION_SUMMARY_BY_FILTER}`, postObj, props.history)
            .then(data => {
                // console.log('**', data);
                props.dashboardActionHandler.dispatchSummaryTotalsData(data);
                handleLoader(false);
            })
    }
    const getSalesOnDateFilterClick = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        postAuthAndData(`${REPT_PROD_HOST_URI}${DAY_WISE_SALES_BY_FILTER}`, postObj, props.history)
            .then(data => {
                // console.log('**', data);
                var lineCanvasData = [];
                var salesObj =
                {
                    id: 'Sales',
                    color: "hsl(147, 100%, 30%)",
                    data: []
                };
                lineCanvasData.push(salesObj);
                Array.isArray(data?.DayWiseSales) && data.DayWiseSales.forEach(sale => {
                    let obj = {
                        "x": sale.StartDateTime.substring(0, 10),
                        "y": sale.Total
                    }
                    lineCanvasData[0].data.push(obj);
                })

                var engagementsCreatedDatesObj =
                {
                    id: 'Engagements',
                    color: "hsl(204, 100%, 50%)",
                    data: []
                };
                lineCanvasData.push(engagementsCreatedDatesObj);
                Array.isArray(data?.EngagementsCreatedOn) && data.EngagementsCreatedOn.forEach(engt => {
                    let obj = {
                        "x": engt.CreatedDateTime.substring(0, 10),
                        "y": 0
                    }
                    lineCanvasData[1].data.push(obj);
                })
                props.dashboardActionHandler.dispatchLineCanvasSalesData(lineCanvasData);
                handleLoader(false);

            });
    }
    const getDailyActiveUsersAndEngagedCustomers = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        postAuthAndData(`${REPT_PROD_HOST_URI}${DAY_WISE_ACTIVE_ENGAGED_USERS}`, postObj, props.history)
            .then(data => {
                // console.log('**', data);
                var lineCanvasData = [];
                var usersObj =
                {
                    id: 'Active',
                    color: "hsl(138, 100%, 50%)",
                    data: []
                };
                lineCanvasData.push(usersObj);
                Array.isArray(data) && data.forEach(user => {
                    let obj = {
                        "x": user.SnapShotDate.substring(0, 10),
                        "y": user.ActiveUsers
                    }
                    lineCanvasData[0].data.push(obj);
                })
                var usersObj =
                {
                    id: 'Engaged',
                    color: "hsl(29, 100%, 50%)",
                    data: []
                };
                lineCanvasData.push(usersObj);
                Array.isArray(data) && data.forEach(user => {
                    let obj = {
                        "x": user.SnapShotDate.substring(0, 10),
                        "y": user.EngagedUsers
                    }
                    lineCanvasData[1].data.push(obj);
                })
                props.dashboardActionHandler.dispatchLineCanvasDayWiseActiveEngagedUsersData(lineCanvasData);
                handleLoader(false);
            });
    }
    const getMonthlyActiveUsersAndEngagedCustomers = (durationMonths) => {
        var postObj = {
            NumberOfMonths: durationMonths,
        }
        handleLoader(true);
        postAuthAndData(`${REPT_PROD_HOST_URI}${MONTH_WISE_ACTIVE_ENGAGED_USERS}`, postObj, props.history)
            .then(data => {
                // console.log('**', data);
                var lineCanvasData = [];
                var usersObj =
                {
                    id: 'Active',
                    color: "hsl(138, 100%, 50%)",
                    data: []
                };
                lineCanvasData.push(usersObj);
                Array.isArray(data) && data.forEach(user => {
                    let obj = {
                        "x": user.SnapShotDate.substring(0, 10),
                        "y": user.ActiveUsers
                    }
                    lineCanvasData[0].data.push(obj);
                })
                var usersObj =
                {
                    id: 'Engaged',
                    color: "hsl(29, 100%, 50%)",
                    data: []
                };
                lineCanvasData.push(usersObj);
                Array.isArray(data) && data.forEach(user => {
                    let obj = {
                        "x": user.SnapShotDate.substring(0, 10),
                        "y": user.EngagedUsers
                    }
                    lineCanvasData[1].data.push(obj);
                })
                props.dashboardActionHandler.dispatchLineCanvasMonthWiseActiveEngagedUsersData(lineCanvasData);
                handleLoader(false);
            });
    }
    const getCustomerOverviewDetails = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        postAuthAndData(`${REPT_PROD_HOST_URI}${CUSTOMER_OVERVIEW_DETAILS}`, postObj, props.history)
            .then(data => {
                console.log('**', data);
                props.dashboardActionHandler.dispatchCustomerOverviewTotalsData(data);
            })
    }

    useEffect(() => {
        if (!props.summaryTotals) {
            getSummaryTotalsOnDateFilterClick(7);
        }
        getSalesOnDateFilterClick(7);
        getDailyActiveUsersAndEngagedCustomers(7);
        getMonthlyActiveUsersAndEngagedCustomers(3);
        getCustomerOverviewDetails(7)
    }, []);

    return (
        <Fragment>
            <div id="dashboard-container" className="p-2">
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix">
                        <div className="overview-heading float-left clearfix mt-2">Sales Overview</div>
                    </div>
                    <div className="w-50 float-left clearfix">
                        <div className="w-100 float-right clearfix mb-1">
                            <Button variant="outlined"
                                className="float-right mb-1 mr-3 f-c-box"
                                style={{ backgroundColor: filterDurataion == 7 ? '#60b3f7' : '' }}
                                onClick={() => getSummaryTotalsOnDateFilterClick(7)}>
                                Last 7 Days
                            </Button>
                            <Button variant="outlined"
                                className="float-right mb-1 f-c-box"
                                style={{ backgroundColor: filterDurataion == 30 ? '#60b3f7' : '' }}
                                onClick={() => getSummaryTotalsOnDateFilterClick(30)}>
                                Last 30 Days
                            </Button>
                            <Button variant="outlined"
                                className="float-right mb-1 f-c-box"
                                style={{ backgroundColor: filterDurataion == 90 ? '#60b3f7' : '' }}
                                onClick={() => getSummaryTotalsOnDateFilterClick(90)}>
                                Last 90 Days
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-100 float-left clearfix mb-4 sales-overview">
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox
                                opt={lineChartSingleBlueData}
                                header='Active Customers'
                                count={props.summaryTotals?.FormattedTotalActiveUsers}
                                perc={props.summaryTotals?.PercentageChangeInActiveUsers}>
                            </SalesOverviewBox>
                        </div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox
                                opt={lineChartSingleGreenData}
                                header='Total Sales'
                                count={props.summaryTotals?.FormattedTotalSales}
                                perc={props.summaryTotals?.PercentageChangeInSales}>
                            </SalesOverviewBox>
                        </div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox
                                opt={lineChartSinglePurpleData}
                                header='Paying Customers'
                                count={props.summaryTotals?.FormattedTotalPayingCustomers}
                                perc={props.summaryTotals?.PercentageChangeInPayingCustomers}>
                            </SalesOverviewBox>
                        </div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox
                                opt={lineChartSingleOrangeData}
                                header='Game Plays'
                                count={props.summaryTotals?.FormattedTotalGamePlays}
                                perc={props.summaryTotals?.PercentageChangeInGamePlays}>
                            </SalesOverviewBox>
                        </div>
                    </div>
                </div>
                <div className="w-100 float-left clearfix mb-2">
                    <div className="overview-heading float-left clearfix mt-2">Sales & Revenue</div>
                </div>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <LineCanvasGraph
                        data={props.lineCanvasSalesData}
                        yName={'Total Sales'}>
                    </LineCanvasGraph>
                </div>
                <div className="w-100 float-left clearfix mb-2">
                    <div className="overview-heading float-left clearfix mt-2">Engagement & Entertainment</div>
                </div>
                <div className="w-50 float-left clearfix p-4 mb-4 chart-container">
                    <div>Daily Active and Engaged Customers Chart</div>
                    <LineCanvasGraph
                        data={props.lineCanvasDayWiseActiveAndEngagedCustomers}
                        yName={'Customers'}>
                    </LineCanvasGraph>
                </div>
                <div className="w-50 float-left clearfix p-4 mb-4 chart-container">
                    <div>Monthly Active and Engaged Customers Chart</div>
                    <LineCanvasGraph
                        data={props.lineCanvasDayWiseActiveAndEngagedCustomers}
                        yName={'Customers'}>
                    </LineCanvasGraph>
                </div>
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix">
                        <div className="overview-heading float-left clearfix mt-2">Customer Overview</div>
                    </div>
                    <div className="w-50 float-left clearfix">
                        <div className="w-100 float-right clearfix mb-1">
                            <Button variant="outlined"
                                className="float-right mb-1 mr-3 f-c-box"
                                style={{ backgroundColor: filterDurataion == 7 ? '#60b3f7' : '' }}>
                                Last 7 Days
                            </Button>
                            <Button variant="outlined"
                                className="float-right mb-1 f-c-box"
                                style={{ backgroundColor: filterDurataion == 30 ? '#60b3f7' : '' }}>
                                Last 30 Days
                            </Button>
                            <Button variant="outlined"
                                className="float-right mb-1 f-c-box"
                                style={{ backgroundColor: filterDurataion == 90 ? '#60b3f7' : '' }}>
                                Last 90 Days
                            </Button>
                        </div>
                    </div>
                </div>
                <CustomerOverview data={props.customerOverviewTotals}></CustomerOverview>
                <GamePlayingOverview></GamePlayingOverview>
            </div>
        </Fragment>
    )
}
