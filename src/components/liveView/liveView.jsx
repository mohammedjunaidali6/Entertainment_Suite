import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";

import LineChart from "../common/utils/lineChart";
import BarChart from "../common/utils/barChart";
import CampaignBox from "../common/campaignBox/campaignBox";
import { lineChartData, LiveViewCampaignMockData } from "../../constants/globalMockdata";
import './liveView.css';

export default function LiveView(props) {
    let history = useHistory();
    const [campaigndata, setCampaigndata] = useState(LiveViewCampaignMockData);
    
    return (
        <div id="liveview-container">
            <div>
                <span className="l-v-h">Sales Overview</span>
                <span className="l-v-f float-right"></span>
            </div>
            <div className="w-100 float-left clearfix l-v-s-o">
                <div className="w-25 float-left clearfix l-v-s-o-box-outer">
                    <div className="l-v-s-o-box"></div>
                </div>
                <div className="w-25 float-left clearfix l-v-s-o-box-outer">
                    <div className="l-v-s-o-box"></div>
                </div>
                <div className="w-25 float-left clearfix l-v-s-o-box-outer">
                    <div className="l-v-s-o-box"></div>
                </div>
                <div className="w-25 float-left clearfix l-v-s-o-box-outer">
                    <div className="l-v-s-o-box"></div>
                </div>
            </div>

            <div className="w-100 float-left clearfix l-v-charts">
                <div className="w-50 float-left clearfix l-v-chart-box-outer">
                    <div className="l-v-chart-box">
                        <LineChart data={lineChartData}
                                    chartTitle="Sales Chart">
                        </LineChart>
                    </div>
                </div>
                <div className="w-50 float-left clearfix l-v-chart-box-outer">
                    <div className="l-v-chart-box">
                        <BarChart data={lineChartData}
                                    chartTitle="Sales Chart">
                        </BarChart>
                    </div>
                </div>
                <div className="w-50 float-left clearfix l-v-chart-box-outer">
                    <div className="l-v-chart-box"></div>
                </div>
                <div className="w-50 float-left clearfix l-v-chart-box-outer">
                    <div className="l-v-chart-box"></div>
                </div>
            </div>

            <div className="w-100 float-left clearfix">
                <div className="l-v-i-t-h">Instant Targeting</div>
            </div>
            <div className="w-100 float-left clearfix l-v-i-t">
                <div className="w-25 float-left clearfix l-v-i-t-box-outer">
                    <div className="l-v-i-t-box"></div>
                </div>
                <div className="w-25 float-left clearfix l-v-i-t-box-outer">
                    <div className="l-v-i-t-box"></div>
                </div>
                <div className="w-25 float-left clearfix l-v-i-t-box-outer">
                    <div className="l-v-i-t-box"></div>
                </div>
                <div className="w-25 float-left clearfix l-v-i-t-box-outer">
                    <div className="l-v-i-t-box"></div>
                </div>
            </div>

            <div className="w-100 float-left clearfix">
                <div className="l-v-a-c-h">Active Campaigns</div>
            </div>
            <div className="w-100 float-left clearfix l-v-a-c">
                {campaigndata && campaigndata.length > 0 ? (
                    <CampaignBox campaigndata={campaigndata}></CampaignBox>
                ) : <div className="e-s-heading ml-4">No campaigns found!</div>}
            </div>
        </div>
    )
}
