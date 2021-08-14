import React, { Fragment, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Loader from '../common/Spinner/spinner';
import LineChart from "../common/utils/lineChart";
import LineCanvasGraph from '../common/graphs/lineCanvasGraph';
import FunnelGraph from '../common/graphs/funnelGraph';
import BarCanvasGraph from '../common/graphs/barCanvasGraph';
import CustomerOverview from "./customerOverview/customerOverview";
import BrandHealthOverview from "./brandHealthOverview/brandHealthOverview";
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
    DEFAULT_FILTER_DAYS,
    DEFAULT_FILTER_MONTHS,
    CONSOLIDATED_INCREMENTAL_SALES,
    CONSOLIDATED_BRAND_HEALTH,
    DAY_WISE_BRAND_HEALTH_DATA
} from '../../api/apiConstants';


export default function Dashboard(props) {
    console.log('***', props);
    const [salesOverviewFilter, setSalesOverviewFilter] = useState(7);
    const [salesRevenueFilter, setSalesRevenueFilter] = useState(7);
    const [engagementFilter, setEngagementFilter] = useState(7);
    const [incrementalSalesFilter, setIncrementalSalesFilter] = useState(7);
    const [brandHealthFilter, setBrandHealthFilter] = useState(7);


    const handleLoader = (showBool) => {
        props.routeActionHandler.dispatchLoaderData(showBool);
    }

    const getSummaryTotalsOnDateFilterClick = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        setSalesOverviewFilter(durationDays);
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
        setSalesRevenueFilter(durationDays);
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
        setEngagementFilter(durationDays);
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
    const getIncrementalSalesTotals = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        setIncrementalSalesFilter(durationDays);
        postAuthAndData(`${REPT_PROD_HOST_URI}${CONSOLIDATED_INCREMENTAL_SALES}`, postObj, props.history)
            .then(data => {
                // console.log('**', data);
                props.dashboardActionHandler.dispatchIncrementalSalesTotalsData(data);
            })
    }

    const getBrandHealthData=(durationDays)=>{
        setBrandHealthFilter(durationDays);
        getBrandHealthDetails(durationDays);
        getDayWiseBrandHealthData(durationDays);
    }
    const getBrandHealthDetails = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        postAuthAndData(`${REPT_PROD_HOST_URI}${CONSOLIDATED_BRAND_HEALTH}`, postObj, props.history)
            .then(brandHealthData => {
                // console.log('**', brandHealthData);
                props.dashboardActionHandler.dispatchBrandHealthData(brandHealthData);
                handleLoader(false);
            });
    }
    const getDayWiseBrandHealthData = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        postAuthAndData(`${REPT_PROD_HOST_URI}${DAY_WISE_BRAND_HEALTH_DATA}`, postObj, props.history)
            .then(data => {
                console.log('**', data);
                var barCanvasData = [];
                Array.isArray(data) && data.forEach(obj => {
                    var obj = {
                        date: obj.StartDate,
                        socialShares: obj.SocialShares,
                        socialSharesColor: "hsl(213, 70%, 50%)",
                        customerReviews: obj.CustomerReviews,
                        customerReviewsColor: "hsl(138, 100%, 50%)",
                        customerReferrals: obj.CustomerReferrals,
                        customerReferralsColor: "hsl(43, 70%, 50%)",
                    };
                    barCanvasData.push(obj);
                })
                props.dashboardActionHandler.dispatchBarCanvasBrandHealthData(barCanvasData);
                handleLoader(false);
            });
    }

    useEffect(() => {
        if (!props.summaryTotals) {
            getSummaryTotalsOnDateFilterClick(DEFAULT_FILTER_DAYS);
        }
        getSalesOnDateFilterClick(DEFAULT_FILTER_DAYS);
        getDailyActiveUsersAndEngagedCustomers(DEFAULT_FILTER_DAYS);
        // getMonthlyActiveUsersAndEngagedCustomers(DEFAULT_FILTER_MONTHS);
        getIncrementalSalesTotals(DEFAULT_FILTER_DAYS);
        getBrandHealthData(DEFAULT_FILTER_DAYS);
    }, []);


    return (
        <Fragment>
            <div id="dashboard-container" className="p-2">
                {/* Sales Overview */} 
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix">
                        <div className="overview-heading float-left clearfix mt-2">Sales Overview</div>
                    </div>
                    <div className="w-50 float-left clearfix mb-1">
                        <Button variant="outlined"
                            className="float-right mb-1 mr-3 f-c-box"
                            onClick={()=>getSummaryTotalsOnDateFilterClick(90)}
                            style={{ backgroundColor: salesOverviewFilter == 90 ? '#60b3f7' : '' }}>
                            Last 90 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getSummaryTotalsOnDateFilterClick(30)}
                            style={{ backgroundColor: salesOverviewFilter == 30 ? '#60b3f7' : '' }}>
                            Last 30 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getSummaryTotalsOnDateFilterClick(7)}
                            style={{ backgroundColor: salesOverviewFilter == 7 ? '#60b3f7' : '' }}>
                            Last 7 Days
                        </Button>
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
                {/* Sales and Revenue */}
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix mb-2">
                        <div className="overview-heading float-left clearfix mt-2">Sales & Revenue</div>
                    </div>
                    <div className="w-50 float-left clearfix mb-1">
                        <Button variant="outlined"
                            className="float-right mb-1 mr-3 f-c-box"
                            onClick={()=>getSalesOnDateFilterClick(90)}
                            style={{ backgroundColor: salesRevenueFilter == 90 ? '#60b3f7' : '' }}>
                            Last 90 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getSalesOnDateFilterClick(30)}
                            style={{ backgroundColor: salesRevenueFilter == 30 ? '#60b3f7' : '' }}>
                            Last 30 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getSalesOnDateFilterClick(7)}
                            style={{ backgroundColor: salesRevenueFilter == 7 ? '#60b3f7' : '' }}>
                            Last 7 Days
                        </Button>
                    </div>
                </div>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <LineCanvasGraph
                        data={props.lineCanvasSalesData}
                        yName={'Total Sales'}>
                    </LineCanvasGraph>
                </div>
                {/* Engagement and Entertainment */}
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix mb-2">
                        <div className="overview-heading float-left clearfix mt-2">Engagement & Entertainment</div>
                    </div>
                    <div className="w-50 float-left clearfix mb-1">
                        <Button variant="outlined"
                            className="float-right mb-1 mr-3 f-c-box"
                            onClick={()=>getDailyActiveUsersAndEngagedCustomers(90)}
                            style={{ backgroundColor: engagementFilter == 90 ? '#60b3f7' : '' }}>
                            Last 90 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getDailyActiveUsersAndEngagedCustomers(30)}
                            style={{ backgroundColor: engagementFilter == 30 ? '#60b3f7' : '' }}>
                            Last 30 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getDailyActiveUsersAndEngagedCustomers(7)}
                            style={{ backgroundColor: engagementFilter == 7 ? '#60b3f7' : '' }}>
                            Last 7 Days
                        </Button>
                    </div>
                </div>
                <div className="w-50 float-left clearfix p-4 mb-4 chart-container">
                    <div className='section-sub-heading'>Daily Active and Engaged Customers</div>
                    <LineCanvasGraph
                        data={props.lineCanvasDayWiseActiveAndEngagedCustomers}
                        yName={'Customers'}>
                    </LineCanvasGraph>
                </div>
                <div className="w-50 float-left clearfix p-4 mb-4 chart-container">
                    <div className='section-sub-heading'>Monthly Active and Engaged Customers</div>
                    <LineCanvasGraph
                        data={props.lineCanvasMonthWiseActiveAndEngagedCustomers}
                        yName={'Customers'}>
                    </LineCanvasGraph>
                </div>
                {/* Incremental Sales */}
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix">
                        <div className="overview-heading float-left clearfix mt-2">Incremental Sales</div>
                    </div>
                    <div className="w-50 float-left clearfix mb-1">
                        <Button variant="outlined"
                            className="float-right mr-3 mb-1 f-c-box"
                            onClick={()=>getIncrementalSalesTotals(90)}
                            style={{ backgroundColor: incrementalSalesFilter == 90 ? '#60b3f7' : '' }}>
                            Last 90 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getIncrementalSalesTotals(30)}
                            style={{ backgroundColor: incrementalSalesFilter == 30 ? '#60b3f7' : '' }}>
                            Last 30 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getIncrementalSalesTotals(7)}
                            style={{ backgroundColor: incrementalSalesFilter == 7 ? '#60b3f7' : '' }}>
                            Last 7 Days
                        </Button>
                    </div>
                </div>
                <CustomerOverview data={props.incrementalSalesTotals}></CustomerOverview>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <FunnelGraph data={props.incrementalSalesTotals}>  </FunnelGraph>
                </div>
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix mb-2">
                        <div className="overview-heading float-left clearfix mt-2">Brand Health</div>
                    </div>
                    <div className="w-50 float-left clearfix mb-1">
                        <Button variant="outlined"
                            className="float-right mr-3 mb-1 f-c-box"
                            onClick={()=>getBrandHealthData(90)}
                            style={{ backgroundColor: brandHealthFilter == 90 ? '#60b3f7' : '' }}>
                            Last 90 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getBrandHealthData(30)}
                            style={{ backgroundColor: brandHealthFilter == 30 ? '#60b3f7' : '' }}>
                            Last 30 Days
                        </Button>
                        <Button variant="outlined"
                            className="float-right mb-1 mr-1 f-c-box"
                            onClick={()=>getBrandHealthData(7)}
                            style={{ backgroundColor: brandHealthFilter == 7 ? '#60b3f7' : '' }}>
                            Last 7 Days
                        </Button>
                    </div>
                </div>
                <BrandHealthOverview data={props.brandHealthTotals}></BrandHealthOverview>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <BarCanvasGraph
                        data={props.barCanvasDayWiseBrandHealthData}
                        keys={[
                            'socialShares',
                            'customerReviews',
                            'customerReferrals',
                        ]}>
                    </BarCanvasGraph>
                </div>
            </div>
        </Fragment>
    )
}
