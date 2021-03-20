import React from "react";
import { BsThreeDots } from "react-icons/bs";
import './customerOverviewBox.css';

export default function CustomerOverviewBox(props) {
    
    return (
        <div key={props.data.id} className="w-33 float-left clearfix customer-overview-box-outer">
            <div className={`customer-overview-box ${props.fromGamePlayingOverview ? `c-o-b-greyBg` : ``}`}>
                <div className="customer-overview-action text-right">
                    <BsThreeDots></BsThreeDots>
                </div>
                <div className="customer-overview-heading text-left mb-1">{props.data.title}</div>
                <div>
                    <div className="w-50 float-left clearfix text-left">
                        <span className="customer-overview-left-count">{props.data.count}</span>
                        <span className="customer-overview-left-desc v-a-t-top pl-2">{props.data.countDesc}</span>
                    </div>
                    <div className="w-50 float-left clearfix">
                        <div className="customer-overview-right-count text-right">{props.data.percentage}</div>
                        <div className="customer-overview-right-desc">{props.data.status}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}