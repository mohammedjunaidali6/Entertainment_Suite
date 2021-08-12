import React from "react";
import { BsThreeDots } from "react-icons/bs";
import './customerOverviewBox.css';

export default function CustomerOverviewBox({ data, fromBrandHealthOverview }) {

    return (
        <div key={data.id} className="w-33 float-left clearfix customer-overview-box-outer">
            <div className={`customer-overview-box ${fromBrandHealthOverview ? `c-o-b-greyBg` : ``}`}>
                <div className="customer-overview-action text-right">
                    <BsThreeDots></BsThreeDots>
                </div>
                <div className="customer-overview-heading text-left mb-1">{data.title}</div>
                <div>
                    <div className="w-50 float-left clearfix text-left">
                        <span className="customer-overview-left-count">{data.count}</span>
                        {/* <span className="customer-overview-left-desc v-a-t-top pl-2">{props.data.countDesc}</span> */}
                    </div>
                    <div className="w-50 float-left clearfix">
                        <div className="customer-overview-right-count text-right">
                            {data.perc && data.perc.includes('-') ? '+' : '-'}{data.perc && data.perc.replace('-', '')}%
                        </div>
                        {/* <div className="customer-overview-right-desc">{props.data.status}</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}