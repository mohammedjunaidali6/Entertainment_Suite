import React, { Fragment, useState } from 'react';
import CustomerOverviewBox from "../customerOverviewBox/customerOverviewBox";
import './customerOverview.css';


export default function CustomerOverview({ data }) {
    const customizedData = [
        {
            id: 1, title: 'Customers Engaged',
            count: data?.FormattedEngagedCustomersTotal ?? 0,
            perc: data?.PercentageChangeInEngagedCustomers ?? 0
        },
        {
            id: 2, title: 'Customers Awarded',
            count: data?.FormattedWinnersTotal ?? 0,
            perc: data?.PercentageChangeInWinners ?? 0
        },
        {
            id: 3, title: 'Customers Converted',
            count: data?.FomattedCouponsRedeemedTotal ?? 0,
            perc: data?.PercentageChangeInCouponsRedeemed ?? 0
        }
    ];

    return (
        <div id="customer-overview-container" className="w-100 float-left clearfix mb-4 customer-overview">
            {
                <Fragment>
                    {customizedData.map((obj) => (
                        <CustomerOverviewBox data={obj}></CustomerOverviewBox>
                    ))}
                </Fragment>
            }
        </div>
    )
}
