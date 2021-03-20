import React, { Fragment } from "react";
import CustomerOverviewBox from "../customerOverviewBox/customerOverviewBox";
import { lineChartData } from "../../../constants/globalMockdata";
import LineChart from "../../common/utils/lineChart";
import './gamePlayingOverview.css';

const data = [
    { id: 1, title: 'Total Coupon Scratch', count: 2345, countDesc: 'NUM', percentage: "+40%", status: "this week" },
    { id: 2, title: 'Repeat Players', count: 2345, countDesc: 'NUM', percentage: "+40%", status: "this week" },
    { id: 3, title: 'Avg Engagement Rate', count: 2345, countDesc: 'NUM', percentage: "+40%", status: "this week" }
];

export default function GamePlayingOverview(props) {

    return (
        <div id="g-p-o-sec" className="w-100 float-left clearfix">
            <div className="g-p-o-h">Game Playing Overview</div>
            {data && data.length > 0 ? (
                <Fragment>
                    {data.map((obj) => (
                        <CustomerOverviewBox data={obj} fromGamePlayingOverview={true}></CustomerOverviewBox>
                    ))}
                </Fragment>
            ) : null}
            <LineChart data={lineChartData} chartTitle=" " ></LineChart>
        </div>
    )
}