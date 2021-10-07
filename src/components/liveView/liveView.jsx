import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import LineChart from "../common/utils/lineChart";
import BarChart from "../common/utils/barChart";
import DoughnutChart from '../common/utils/doughnutChart';
import CampaignBox from "../common/campaignBox/campaignBox";
import {
    lineChartData, barChartData, LiveViewCampaignMockData,
    doughnutChartData, smallBarChartData, lineChartSingleBlueData,
    lineChartSingleGreenData, lineChartSinglePurpleData, lineChartSingleOrangeData,
    slimBarChartData
} from "../../constants/globalMockdata";
import h_dots_src from "../../assets/img/dots-icon_horizontal.svg";
import calender_src from '../../assets/img/calender.svg';
import down_arrow_src from '../../assets/img/down_arrow.svg';
import './liveView.css';
import { useEffect } from 'react';
import { ENGAGEMENTS_BY_FILTERS } from '../../api/apiConstants';
import { getData } from '../../api/ApiHelper';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function LiveView(props) {
    let history = useHistory();
    const classes = useStyles();
    const [lvFilterVal, setLVFilterVal] = useState('Current Week');
    const [campaigndata, setCampaignData] = useState(LiveViewCampaignMockData);
    const [lvfEl, setlvfEl] = useState(null);
    const lvfOpen = Boolean(lvfEl);
    const lvfId = lvfOpen ? 'lvf-filter' : undefined;
    const handleClose = () => {
        setlvfEl(null);
    };
    const lvFilterOpenClick = (event) => {
        setlvfEl(event.currentTarget);
    };
    function setLVFilterClick(val) {
        setLVFilterVal(val);
        setlvfEl(null);
    };

    useEffect(() => {
        // getData(ENGAGEMENTS_BY_FILTERS)
        //     .then(engagementsData => {
        //         if (engagementsData && Array.isArray(engagementsData)) {
        //             setCampaignData(engagementsData);
        //         }
        //     })
    }, [])

    return (
        <div id="liveview-container">
            <div className="w-100 float-left clearfix">
                <div className="w-50 float-left clearfix">
                    <div className="overview-heading float-left clearfix mt-2 l-v-h">Sales Overview</div>
                </div>
                <div className="w-50 float-left clearfix">
                    <div className="w-100 float-right clearfix mb-1">
                        <div className="float-right clearfix mb-1 f-c-box" onClick={lvFilterOpenClick} >
                            <img src={calender_src} alt="Calender" className="mr-2" style={{ width: '16px' }} />
                            <span className="d-dp-lbl pr-1">{lvFilterVal}</span>
                            <img src={down_arrow_src} alt="Down Arrow" />
                        </div>
                        <Popover
                            id={lvfId}
                            open={lvfOpen}
                            anchorEl={lvfEl}
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
                                    <div className="s-o-f-option" onClick={() => setLVFilterClick('Last Week')}>Last Week</div>
                                    <div className="s-o-f-option" onClick={() => setLVFilterClick('Last 1 Month')}>Last 1 Month</div>
                                    <div className="s-o-f-option" onClick={() => setLVFilterClick('Last 1 Year')}>Last 1 Year</div>
                                    <div className="s-o-f-option" onClick={() => setLVFilterClick('Current Week')}>Current Week</div>
                                </div>
                            </Typography>
                        </Popover>
                    </div>
                </div>
            </div>
            {/* <div className="mb-3">
                <span className="l-v-h">Sales Overview</span>
                <span className="l-v-f float-right"></span>
            </div> */}
            <div className="w-100 float-left clearfix l-v-s-o">
                <div className="w-25 float-left clearfix l-v-s-o-box-outer">
                    <div className="l-v-s-o-box">
                        <div className="l-v-s-o-box-t">
                            <div className="text-right">
                                <img src={h_dots_src} alt="Action" />
                            </div>
                            <div className="l-v-s-o-box-t-h">Active Customer</div>
                            <div>
                                <span className="l-v-s-o-box-t-c">1,345</span>
                                <span className="l-v-s-o-box-t-c-lbl">Customers</span>
                                <div className="disp-inline-b float-right pr-3">
                                    <div className="l-v-s-o-box-t-c-per">+40%</div>
                                    <div className="l-v-s-o-box-t-c-per-lbl">this week</div>
                                </div>
                            </div>
                        </div>
                        <div className="l-v-s-o-box-b">
                            <LineChart data={lineChartSingleBlueData}
                                hideAxis={true}
                                hideHeader={true} >
                            </LineChart>
                        </div>
                    </div>
                </div>
                <div className="w-25 float-left clearfix l-v-s-o-box-outer">
                    <div className="l-v-s-o-box">
                        <div className="l-v-s-o-box-t">
                            <div className="text-right">
                                <img src={h_dots_src} alt="" />
                            </div>
                            <div className="l-v-s-o-box-t-h">Playing Customers</div>
                            <div>
                                <span className="l-v-s-o-box-t-c">260</span>
                                <span className="l-v-s-o-box-t-c-lbl">Customers</span>
                                <div className="disp-inline-b float-right pr-3">
                                    <div className="l-v-s-o-box-t-c-per c-orange">-15%</div>
                                    <div className="l-v-s-o-box-t-c-per-lbl">this week</div>
                                </div>
                            </div>
                        </div>
                        <div className="l-v-s-o-box-b">
                            <LineChart data={lineChartSingleGreenData}
                                hideAxis={true}
                                hideHeader={true} >
                            </LineChart>
                        </div>
                    </div>
                </div>
                <div className="w-25 float-left clearfix l-v-s-o-box-outer">
                    <div className="l-v-s-o-box">
                        <div className="l-v-s-o-box-t">
                            <div className="text-right">
                                <img src={h_dots_src} alt="" />
                            </div>
                            <div className="l-v-s-o-box-t-h">Coupon Redeemed</div>
                            <div>
                                <span className="l-v-s-o-box-t-c">240</span>
                                <span className="l-v-s-o-box-t-c-lbl">Customers</span>
                                <div className="disp-inline-b float-right pr-3">
                                    <div className="l-v-s-o-box-t-c-per">+250%</div>
                                    <div className="l-v-s-o-box-t-c-per-lbl">this week</div>
                                </div>
                            </div>
                        </div>
                        <div className="l-v-s-o-box-b">
                            <LineChart data={lineChartSinglePurpleData}
                                hideAxis={true}
                                hideHeader={true} >
                            </LineChart>
                        </div>
                    </div>
                </div>
                <div className="w-25 float-left clearfix l-v-s-o-box-outer">
                    <div className="l-v-s-o-box">
                        <div className="l-v-s-o-box-t">
                            <div className="text-right">
                                <img src={h_dots_src} alt="" />
                            </div>
                            <div className="l-v-s-o-box-t-h">Sales as of Now</div>
                            <div>
                                <span className="l-v-s-o-box-t-c">67,635</span>
                                {/* <span className="l-v-s-o-box-t-c-lbl">Customers</span> */}
                                <div className="disp-inline-b float-right pr-3">
                                    <div className="l-v-s-o-box-t-c-per">+250%</div>
                                    <div className="l-v-s-o-box-t-c-per-lbl">this week</div>
                                </div>
                            </div>
                        </div>
                        <div className="l-v-s-o-box-b">
                            <LineChart data={lineChartSingleOrangeData}
                                hideAxis={true}
                                hideHeader={true} >
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100 float-left clearfix l-v-charts">
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
                        <BarChart data={slimBarChartData}
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

            <div className="w-100 float-left clearfix">
                <div className="l-v-i-t-h">Instant Targeting</div>
            </div>
            <div className="w-100 float-left clearfix l-v-i-t">
                <div className="w-25 float-left clearfix l-v-i-t-box-outer">
                    <div className="l-v-i-t-box">
                        <div className="l-v-i-t-box-t">
                            <div className="w-50 float-left clearfix h-100 c-center f-d-c">
                                <div className="text-center">
                                    <span className="l-v-i-t-box-t-h">234</span>
                                    <span className="l-v-i-t-box-t-h-c">+40%</span>
                                </div>
                                <div className="l-v-i-t-box-t-desc">Pending Cart</div>
                            </div>
                            <div className="w-50 float-left clearfix l-v-i-t-box-t-c">
                                <BarChart data={smallBarChartData}
                                    showLines={false}
                                    hideAxis={true}
                                    hideHeader={true} >
                                </BarChart>
                            </div>
                        </div>
                        <div className="l-v-i-t-box-b">
                            <div className="l-v-i-t-box-b-btn">Engage Now</div>
                        </div>
                    </div>
                </div>
                <div className="w-25 float-left clearfix l-v-i-t-box-outer">
                    <div className="l-v-i-t-box">
                        <div className="l-v-i-t-box-t">
                            <div className="w-50 float-left clearfix h-100 c-center f-d-c">
                                <div className="text-center">
                                    <span className="l-v-i-t-box-t-h">131</span>
                                    <span className="l-v-i-t-box-t-h-c c-orange">-5%</span>
                                </div>
                                <div className="l-v-i-t-box-t-desc">Inactive Customers</div>
                            </div>
                            <div className="w-50 float-left clearfix l-v-i-t-box-t-c">
                                <BarChart data={smallBarChartData}
                                    showLines={false}
                                    hideAxis={true}
                                    hideHeader={true} >
                                </BarChart>
                            </div>
                        </div>
                        <div className="l-v-i-t-box-b">
                            <div className="l-v-i-t-box-b-btn">Engage Now</div>
                        </div>
                    </div>
                </div>
                <div className="w-25 float-left clearfix l-v-i-t-box-outer">
                    <div className="l-v-i-t-box">
                        <div className="l-v-i-t-box-t">
                            <div className="w-50 float-left clearfix h-100 c-center f-d-c">
                                <div className="text-center">
                                    <span className="l-v-i-t-box-t-h">1,254</span>
                                    <span className="l-v-i-t-box-t-h-c">+54%</span>
                                </div>
                                <div className="l-v-i-t-box-t-desc">High Value Customers</div>
                            </div>
                            <div className="w-50 float-left clearfix l-v-i-t-box-t-c">
                                <BarChart data={smallBarChartData}
                                    showLines={false}
                                    hideAxis={true}
                                    hideHeader={true} >
                                </BarChart>
                            </div>
                        </div>
                        <div className="l-v-i-t-box-b">
                            <div className="l-v-i-t-box-b-btn">Engage Now</div>
                        </div>
                    </div>
                </div>
                <div className="w-25 float-left clearfix l-v-i-t-box-outer">
                    <div className="l-v-i-t-box">
                        <div className="l-v-i-t-box-t">
                            <div className="w-50 float-left clearfix h-100 c-center f-d-c">
                                <div className="text-center">
                                    <span className="l-v-i-t-box-t-h">423</span>
                                    <span className="l-v-i-t-box-t-h-c">+23%</span>
                                </div>
                                <div className="l-v-i-t-box-t-desc">New Customers</div>
                            </div>
                            <div className="w-50 float-left clearfix l-v-i-t-box-t-c">
                                <BarChart data={smallBarChartData}
                                    showLines={false}
                                    hideAxis={true}
                                    hideHeader={true} >
                                </BarChart>
                            </div>
                        </div>
                        <div className="l-v-i-t-box-b">
                            <div className="l-v-i-t-box-b-btn">Engage Now</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100 float-left clearfix">
                <div className="l-v-a-c-h">Active Campaigns</div>
            </div>
            <div className="w-100 float-left clearfix l-v-a-c">
                {/* {campaigndata && campaigndata.length > 0 ? (
                    <CampaignBox campaigndata={campaigndata}></CampaignBox>
                ) : <div className="e-s-heading ml-4">No campaigns found!</div>} */}
            </div>
        </div>
    )
}
