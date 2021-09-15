import React, { Fragment, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
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
    DAY_WISE_BRAND_HEALTH_DATA,
    SOMETHING_WENT_WRONG,
} from '../../api/apiConstants';
import  DateFilter from '../common/dateFilter';
import createNotification from '../common/reactNotification';
import { NotificationContainer } from 'react-notifications';


export default function Dashboard(props) {
    // console.log('***', props);
    const [salesOverviewFilter, setSalesOverviewFilter] = useState(7);
    const [salesRevenueFilter, setSalesRevenueFilter] = useState(7);
    const [dayEngagementFilter, setDayEngagementFilter] = useState(7);
    const [monthEngagementFilter, setMonthEngagementFilter] = useState(1);
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
            .then(res => {
                if (handleResponseCode(res)) {
                    props.dashboardActionHandler.dispatchSummaryTotalsData(res.data);
                }
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
            .then(res => {
                if (handleResponseCode(res)) {
                    var lineCanvasData = [];
                    var salesObj =
                    {
                        id: 'Sales',
                        color: "hsl(147, 100%, 30%)",
                        data: []
                    };
                    lineCanvasData.push(salesObj);
                    Array.isArray(res.data?.DayWiseSales) && res.data.DayWiseSales.forEach(sale => {
                        let obj = {
                            "x": sale.FormattedDate,
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
                    Array.isArray(res.data?.EngagementsCreatedOn) && res.data.EngagementsCreatedOn.forEach(engt => {
                        let obj = {
                            "x": engt.FormattedDate,
                            "y": 0
                        }
                        lineCanvasData[1].data.push(obj);
                    })
                    props.dashboardActionHandler.dispatchLineCanvasSalesData(lineCanvasData);
                }
                handleLoader(false);
            });
    }
    const getDailyActiveUsersAndEngagedCustomers = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        setDayEngagementFilter(durationDays);
        postAuthAndData(`${REPT_PROD_HOST_URI}${DAY_WISE_ACTIVE_ENGAGED_USERS}`, postObj, props.history)
            .then(res => {
                if (handleResponseCode(res)) {
                    var lineCanvasData = [];
                    var usersObj =
                    {
                        id: 'Active',
                        color: "hsl(138, 100%, 50%)",
                        data: []
                    };
                    lineCanvasData.push(usersObj);
                    Array.isArray(res.data) && res.data.forEach(user => {
                        let obj = {
                            "x": user.FormattedDate,
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
                    Array.isArray(res.data) && res.data.forEach(user => {
                        let obj = {
                            "x": user.FormattedDate,
                            "y": user.EngagedUsers
                        }
                        lineCanvasData[1].data.push(obj);
                    })
                    props.dashboardActionHandler.dispatchLineCanvasDayWiseActiveEngagedUsersData(lineCanvasData);
                }
                handleLoader(false);
            });
    }
    const getMonthlyActiveUsersAndEngagedCustomers = (durationMonths) => {
        var postObj = {
            NumberOfMonths: durationMonths,
        }
        handleLoader(true);
        setMonthEngagementFilter(durationMonths);
        postAuthAndData(`${REPT_PROD_HOST_URI}${MONTH_WISE_ACTIVE_ENGAGED_USERS}`, postObj, props.history)
            .then(res => {
                if (handleResponseCode(res)) {
                    var lineCanvasData = [];
                    var usersObj =
                    {
                        id: 'Active',
                        color: "hsl(138, 100%, 50%)",
                        data: []
                    };
                    lineCanvasData.push(usersObj);
                    Array.isArray(res.data) && res.data.forEach(user => {
                        let obj = {
                            "x": user.FormattedDate,
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
                    Array.isArray(res.data) && res.data.forEach(user => {
                        let obj = {
                            "x": user.FormattedDate,
                            "y": user.EngagedUsers
                        }
                        lineCanvasData[1].data.push(obj);
                    })
                    props.dashboardActionHandler.dispatchLineCanvasMonthWiseActiveEngagedUsersData(lineCanvasData);
                }
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
            .then(res => {
                if (handleResponseCode(res)) {
                    props.dashboardActionHandler.dispatchIncrementalSalesTotalsData(res.data);
                }
                handleLoader(false);
            });
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
            .then(res => {
                if (handleResponseCode(res)) {
                    props.dashboardActionHandler.dispatchBrandHealthData(res.data);
                }
                handleLoader(false);
            });
    }
    const getDayWiseBrandHealthData = (durationDays) => {
        var postObj = {
            NumberOfDays: durationDays,
        }
        handleLoader(true);
        postAuthAndData(`${REPT_PROD_HOST_URI}${DAY_WISE_BRAND_HEALTH_DATA}`, postObj, props.history)
            .then(res => {
                if (handleResponseCode(res)) {
                    var barCanvasData = [];
                    Array.isArray(res.data) && res.data.forEach(obj => {
                        var obj = {
                            date: obj.FormattedDate,
                            'Social Shares': obj.SocialShares,
                            socialSharesColor: "hsl(213, 70%, 50%)",
                            'Customer Reviews': obj.CustomerReviews,
                            customerReviewsColor: "hsl(138, 100%, 50%)",
                            'Customer Referrals': obj.CustomerReferrals,
                            customerReferralsColor: "hsl(43, 70%, 50%)",
                        };
                        barCanvasData.push(obj);
                    })
                    props.dashboardActionHandler.dispatchBarCanvasBrandHealthData(barCanvasData);
                }
                handleLoader(false);
            });
    }

    useEffect(() => {
        if (!props.summaryTotals) {
            getSummaryTotalsOnDateFilterClick(DEFAULT_FILTER_DAYS);
        }
        getSalesOnDateFilterClick(DEFAULT_FILTER_DAYS);
        getDailyActiveUsersAndEngagedCustomers(DEFAULT_FILTER_DAYS);
        getMonthlyActiveUsersAndEngagedCustomers(DEFAULT_FILTER_MONTHS);
        getIncrementalSalesTotals(DEFAULT_FILTER_DAYS);
        getBrandHealthData(DEFAULT_FILTER_DAYS);
    }, []);

    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG +' in Dashboard');
            return false;
        }else{
            return true;
        }
    }


    return (
        <Fragment>
            <NotificationContainer/>
            <div id="dashboard-container" className="p-2">
                {/* Sales Overview */} 
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix mb-2">
                        <div className="overview-heading float-left clearfix mt-2">Sales Overview</div>
                    </div>
                    <DateFilter onFilterClick={(days)=>getSummaryTotalsOnDateFilterClick(days)} selected={salesOverviewFilter}/>
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
                    <DateFilter onFilterClick={(days)=>getSalesOnDateFilterClick(days)} selected={salesRevenueFilter}/>
                </div>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <LineCanvasGraph
                        data={props.lineCanvasSalesData}
                        pointsEnabled={true}
                        yName={'Total Sales'}>
                    </LineCanvasGraph>
                </div>
                {/* Engagement and Entertainment */}
                <div className="w-100 float-left clearfix">
                    <div className="w-100 float-left clearfix mb-2">
                        <div className="overview-heading float-left clearfix mt-2">Engagement & Entertainment</div>
                    </div>
                    <DateFilter onFilterClick={(days)=>getDailyActiveUsersAndEngagedCustomers(days)} selected={dayEngagementFilter}/>
                    <div className="w-50 float-left clearfix mb-1">
                        <Link href="#"
                            className="float-right mb-1 mr-4"
                            onClick={()=>getMonthlyActiveUsersAndEngagedCustomers(6)}
                            style={{ color: monthEngagementFilter == 6 ? '#60b3f7' : '',fontSize:'12px'  }}>
                            Last 6 Months
                        </Link>
                        <Link href="#"
                            className="float-right mb-1 mr-3"
                            onClick={()=>getMonthlyActiveUsersAndEngagedCustomers(4)}
                            style={{ color: monthEngagementFilter == 4 ? '#60b3f7' : '',fontSize:'12px'  }}>
                            Last 4 Months
                        </Link>
                        <Link href="#"
                            className="float-right mb-1 mr-3"
                            onClick={()=>getMonthlyActiveUsersAndEngagedCustomers(2)}
                            style={{ color: monthEngagementFilter == 2 ? '#60b3f7' : '',fontSize:'12px'  }}>
                            Last 2 Months
                        </Link>
                    </div>
                </div>
                <div className="w-50 float-left clearfix p-4 mb-4 chart-container">
                    <div className='section-sub-heading'>Daily Active and Engaged Customers</div>
                    <LineCanvasGraph
                        data={props.lineCanvasDayWiseActiveAndEngagedCustomers}
                        pointsEnabled={false}
                        yName={'Customers'}>
                    </LineCanvasGraph>
                </div>
                <div className="w-50 float-left clearfix p-4 mb-4 chart-container">
                    <div className='section-sub-heading'>Monthly Active and Engaged Customers</div>
                    <LineCanvasGraph
                        data={props.lineCanvasMonthWiseActiveAndEngagedCustomers}
                        pointsEnabled={false}
                        yName={'Customers'}>
                    </LineCanvasGraph>
                </div>
                {/* Incremental Sales */}
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix">
                        <div className="overview-heading float-left clearfix mt-2">Incremental Sales</div>
                    </div>
                    <DateFilter onFilterClick={(days)=>getIncrementalSalesTotals(days)} selected={incrementalSalesFilter}/>
                </div>
                <CustomerOverview data={props.incrementalSalesTotals}></CustomerOverview>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <FunnelGraph data={props.incrementalSalesTotals}>  </FunnelGraph>
                </div>
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix mb-2">
                        <div className="overview-heading float-left clearfix mt-2">Brand Health</div>
                    </div>
                    <DateFilter onFilterClick={(days)=>getBrandHealthData(days)} selected={brandHealthFilter}/>
                </div>
                <BrandHealthOverview data={props.brandHealthTotals}></BrandHealthOverview>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <BarCanvasGraph
                        data={props.barCanvasDayWiseBrandHealthData}
                        keys={[
                            'Social Shares',
                            'Customer Reviews',
                            'Customer Referrals',
                        ]}>
                    </BarCanvasGraph>
                </div>
            </div>
        </Fragment>
    )
}
