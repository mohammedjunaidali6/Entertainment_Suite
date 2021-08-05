import React, { Fragment, useState } from 'react';
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
import h_dots_src from "../../assets/img/dots-icon_horizontal.svg";
import calender_src from '../../assets/img/calender.svg';
import down_arrow_src from '../../assets/img/down_arrow.svg';
import './dashboard.css';
import { useEffect } from 'react';
import { JWT_TOKEN } from '../../api/apiConstants';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function Dashboard(props) {

    const [soFilterVal, setSOFilterVal] = useState('Current Week');
    const [coFilterVal, setCOFilterVal] = useState('Current Week');
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
                                <span className="d-dp-lbl pr-1">{soFilterVal}</span>
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
                                        <div className="s-o-f-option" onClick={() => setSOFilterClick('Last Week')}>Last Week</div>
                                        <div className="s-o-f-option" onClick={() => setSOFilterClick('Last 1 Month')}>Last 1 Month</div>
                                        <div className="s-o-f-option" onClick={() => setSOFilterClick('Last 1 Year')}>Last 1 Year</div>
                                        <div className="s-o-f-option" onClick={() => setSOFilterClick('Current Week')}>Current Week</div>
                                    </div>
                                </Typography>
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className="w-100 float-left clearfix mb-4 sales-overview">
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox opt={lineChartSingleBlueData} header='Active Customers' count={'2,763'} perc='67%'>
                            </SalesOverviewBox>
                        </div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox opt={lineChartSingleGreenData} header='Total Sales' count={'3,922'} perc='42%'>
                            </SalesOverviewBox>
                        </div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox opt={lineChartSinglePurpleData} header='Repeat Purchases' count={'1,012'} perc='58%'>
                            </SalesOverviewBox>
                        </div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box">
                            <SalesOverviewBox opt={lineChartSingleOrangeData} header='Game Plays' count={'1,802'} perc='61%'>
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
                                        <div className="s-o-f-option" onClick={() => setCOFilterClick('Last Week')}>Last Week</div>
                                        <div className="s-o-f-option" onClick={() => setCOFilterClick('Last 1 Month')}>Last 1 Month</div>
                                        <div className="s-o-f-option" onClick={() => setCOFilterClick('Last 1 Year')}>Last 1 Year</div>
                                        <div className="s-o-f-option" onClick={() => setCOFilterClick('Current Week')}>Current Week</div>
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
