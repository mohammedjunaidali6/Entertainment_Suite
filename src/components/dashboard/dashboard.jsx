import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import LineChart from "../common/utils/lineChart";
import CustomerOverview from "./customerOverview/customerOverview";
import GamePlayingOverview from "./gamePlayingOverview/gamePlayingOverview";
import {
    lineChartData, lineChartSingleBlueData, lineChartSingleGreenData,
    lineChartSinglePurpleData, lineChartSingleOrangeData
} from "../../constants/globalMockdata";
import SalesOverviewBox from "./salesOverviewBox/salesOverviewBox";
import calender_src from '../../assets/img/calender.svg';
import down_arrow_src from '../../assets/img/down_arrow.svg';
import './dashboard.css';
import { postAuthAndData } from '../../api/ApiHelper';
import {
    REPT_PROD_HOST_URI,
    CONSOLIDATION_SUMMARY_BY_FILTER,
    DAYS_7
} from '../../api/apiConstants';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function Dashboard(props) {
    console.log('***', props);
    const [soFilterVal, setSOFilterVal] = useState('Last Week');
    const [coFilterVal, setCOFilterVal] = useState('Last Week');
    const classes = useStyles();

    const [soFilterEl, setsoFilterEl] = useState(null);
    const soFilterOpen = Boolean(soFilterEl);
    const soFilterId = soFilterOpen ? 'so-filter-popover' : undefined;
    const soFilterOpenClick = (event) => {
        setsoFilterEl(event.currentTarget);
    };
    function setSOFilterClick(val) {
        setSOFilterVal(val);
        setsoFilterEl(null);
    };

    const [coFilterEl, setcoFilterEl] = useState(null);
    const coFilterOpen = Boolean(coFilterEl);
    const coFilterId = coFilterOpen ? 'co-filter-popover' : undefined;
    const coFilterOpenClick = (event) => {
        setcoFilterEl(event.currentTarget);
    };
    function setCOFilterClick(val) {
        setCOFilterVal(val);
        setcoFilterEl(null);
    };

    const handleClose = () => {
        setsoFilterEl(null);
        setcoFilterEl(null);
    };
    const handleLoader = (showBool) => {
        props.routeActionHandler.dispatchLoaderData(showBool);
    }
    useEffect(() => {
        console.log('***', props);
        var postObj = {
            NumberOfDays:
                soFilterVal == 'Last Week' ? 7 :
                    soFilterVal == 'Last Month' ? 30 :
                        soFilterVal == 'Last Quarter' ? 90 : 0,
        }
        console.log('**', postObj);
        postAuthAndData(`${REPT_PROD_HOST_URI}${CONSOLIDATION_SUMMARY_BY_FILTER}`, postObj, props.history)
            .then(data => {
                console.log('**', data);
                props.dashboardActionHandler.dispatchSummaryTotalsData(data);
            })

    }, [soFilterVal]);

    return (
        <Fragment>
            <div id="dashboard-container" className="p-2">
                <div className="w-100 float-left clearfix">
                    <div className="w-50 float-left clearfix">
                        <div className="overview-heading float-left clearfix mt-2">Sales Overview</div>
                    </div>
                    <div className="w-50 float-left clearfix">
                        <div className="w-100 float-right clearfix mb-1">
                            <div className="float-right clearfix mb-1 f-c-box" onClick={soFilterOpenClick} >
                                <img src={calender_src} alt="Calender" className="mr-2" style={{ width: '16px' }} />
                                <span className="d-dp-lbl pr-1">
                                    {soFilterVal}
                                </span>
                                <img src={down_arrow_src} alt="Down Arrow" />
                            </div>
                            <Popover
                                id={soFilterId}
                                open={soFilterOpen}
                                anchorEl={soFilterEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Typography className={classes.typography}>
                                    <div className="s-o-f-options p-0">
                                        <div className="s-o-f-option" onClick={() => setSOFilterClick('Last Week')}>
                                            Last Week
                                        </div>
                                        <div className="s-o-f-option" onClick={() => setSOFilterClick('Last Month')}>
                                            Last Month
                                        </div>
                                        <div className="s-o-f-option" onClick={() => setSOFilterClick('Last Quarter')}>
                                            Last Quarter
                                        </div>
                                    </div>
                                </Typography>
                            </Popover>
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
                                header='Repeat Purchases'
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
                            <div className="float-right clearfix mb-1 f-c-box" onClick={coFilterOpenClick}>
                                <img src={calender_src} alt="Calender" className="mr-2" style={{ width: '16px' }} />
                                <span className="d-dp-lbl pr-1">{coFilterVal}</span>
                                <img src={down_arrow_src} alt="Down Arrow" />
                            </div>
                            <Popover
                                id={coFilterId}
                                open={coFilterOpen}
                                anchorEl={coFilterEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Typography className={classes.typography}>
                                    <div className="s-o-f-options p-0">
                                        <div className="s-o-f-option" onClick={() => setCOFilterClick('Last Week')}>
                                            Last Week
                                        </div>
                                        <div className="s-o-f-option" onClick={() => setCOFilterClick('Last Month')}>
                                            Last Month
                                        </div>
                                        <div className="s-o-f-option" onClick={() => setCOFilterClick('Last Quarter')}>
                                            Last Quarter
                                        </div>
                                    </div>
                                </Typography>
                            </Popover>
                        </div>
                    </div>
                </div>
                <CustomerOverview></CustomerOverview>
                <GamePlayingOverview></GamePlayingOverview>
            </div>
        </Fragment>
    )
}
