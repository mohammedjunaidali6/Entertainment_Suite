import React, { Fragment } from "react";

import LineChart from "../../common/utils/lineChart";
import { lineChartSingleBlueData } from "../../../constants/globalMockdata";
import h_dots_src from "../../../assets/img/dots-icon_horizontal.svg";

export default function SalesOverviewBox(props) {
    
    return (
        <Fragment>
            <div className="l-v-s-o-box-t">
                <div className="text-right">
                    <img src={h_dots_src} alt="Action" />
                </div>
                <div className="l-v-s-o-box-t-h f-16">Active Customer</div>
                <div className="mt-3">
                    <span className="l-v-s-o-box-t-c f-40">2,560.50</span>
                    <span className="l-v-s-o-box-t-c-lbl f-12 pl-2">INR</span>
                    <div className="disp-inline-b float-right pr-1">
                        <div className="l-v-s-o-box-t-c-per f-22">+40%</div>
                        <div className="l-v-s-o-box-t-c-per-lbl">this week</div>
                    </div>
                </div>
            </div>
            <div className="l-v-s-o-box-b">
                <LineChart data={props.opt ? props.opt : lineChartSingleBlueData}
                        hideAxis={true}
                        hideHeader={true} >
                </LineChart>
            </div>
        </Fragment>
    )
}