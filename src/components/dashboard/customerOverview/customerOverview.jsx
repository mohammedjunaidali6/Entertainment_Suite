import React, { Fragment, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import './customerOverview.css';

const data = [
    { id: 1, title: 'Customers Engaged', count: 2345, countDesc: 'NUM', percentage: "+40%", status: "this week" },
    { id: 2, title: 'Customer Retention', count: 2345, countDesc: 'NUM', percentage: "+40%", status: "this week" },
    { id: 3, title: 'Customer Brought Back', count: 2345, countDesc: 'NUM', percentage: "+40%", status: "this week" }
];

export default function CustomerOverview(props) {

    return (
        <div id="customer-overview-container" className="w-100 float-left clearfix mb-4 customer-overview">
            {data && data.length > 0 ? (
                <Fragment>
                    {data.map((obj) => (
                        <div key={obj.id} className="w-33 float-left clearfix  customer-overview-box-outer">
                            <div className="customer-overview-box">
                                <div className="customer-overview-action text-right">
                                    <BsThreeDots></BsThreeDots>
                                </div>
                                <div className="customer-overview-heading text-left mb-1">{obj.title}</div>
                                <div>
                                    <div className="w-50 float-left clearfix text-left">
                                        <span className="customer-overview-left-count">{obj.count}</span>
                                        <span className="customer-overview-left-desc v-a-t-top pl-2">{obj.countDesc}</span>
                                    </div>
                                    <div className="w-50 float-left clearfix">
                                        <div className="customer-overview-right-count text-right">{obj.percentage}</div>
                                        <div className="customer-overview-right-desc">{obj.status}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Fragment>
            ) : null}
        </div>
    )
}
