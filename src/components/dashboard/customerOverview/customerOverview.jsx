import React, { Fragment, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import CustomerOverviewBox from "../customerOverviewBox/customerOverviewBox";
import './customerOverview.css';

const data = [
    { id: 1, title: 'Customers Engaged', count: '2,345', countDesc: 'NUM', percentage: "+51%", status: "this week" },
    { id: 2, title: 'Customer Retention', count: '349', countDesc: 'NUM', percentage: "+9%", status: "this week" },
    { id: 3, title: 'Customer Brought Back', count: '761', countDesc: 'NUM', percentage: "+16%", status: "this week" }
];

export default function CustomerOverview(props) {

    return (
        <div id="customer-overview-container" className="w-100 float-left clearfix mb-4 customer-overview">
            {data && data.length > 0 ? (
                <Fragment>
                    {data.map((obj) => (
                        <CustomerOverviewBox data={obj}></CustomerOverviewBox>
                    ))}
                </Fragment>
            ) : null}
        </div>
    )
}
