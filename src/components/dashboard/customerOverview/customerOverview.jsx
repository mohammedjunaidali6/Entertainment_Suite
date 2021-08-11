import React, { Fragment, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import CustomerOverviewBox from "../customerOverviewBox/customerOverviewBox";
import './customerOverview.css';


export default function CustomerOverview(props) {

    let totalCoupons = 0;
    props.data && props.data.CouponsRedeemed.forEach(coupn => {
        totalCoupons = totalCoupons + coupn.Total;
    });
    let totalWinners = 0;
    props.data && props.data.Winners.forEach(winr => {
        totalWinners = totalWinners + winr.Total;
    });
    let totalCustomersEngaged = 0;
    props.data && props.data.CustomersEngaged.forEach(cust => {
        totalCustomersEngaged = totalCustomersEngaged + cust.Total;
    });
    const data = [
        { id: 1, title: 'Customers Engaged', count: totalCustomersEngaged, percentage: "+51%" },
        { id: 2, title: 'Customers Awarded', count: totalWinners, percentage: "+19%" },
        { id: 3, title: 'Customers Converted', count: totalCoupons, percentage: "+16%" }
    ];

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
