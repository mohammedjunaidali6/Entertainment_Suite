import React, { Fragment } from "react";
import CustomerOverviewBox from "../customerOverviewBox/customerOverviewBox";
import './brandHealthOverview.css';


export default function BrandHealthView({ data }) {
    const customizedData = [
        {
            id: 1, title: 'Social Shares',
            count: data?.FormattedSocialSharesTotal ?? 0,
            perc: data?.PerentageChangeInSocialShares ?? 0
        },
        {
            id: 2, title: 'Customers Referrals',
            count: data?.FormattedReferralsTotal ?? 0,
            perc: data?.PerentageChangeInReferrals ?? 0
        },
        {
            id: 3, title: 'Customer Reviews',
            count: data?.FormattedReviewsTotal ?? 0,
            perc: data?.PerentageChangeInReviews ?? 0
        }
    ];

    return (
        <div className="w-100 float-left clearfix">
            {/* <div className="g-p-o-h">Game Playing Overview</div> id="g-p-o-sec"*/}
            <Fragment>
                {customizedData.map((obj) => (
                    <CustomerOverviewBox data={obj} fromBrandHealthOverview={true}></CustomerOverviewBox>
                ))}
            </Fragment>
        </div>
    )
}