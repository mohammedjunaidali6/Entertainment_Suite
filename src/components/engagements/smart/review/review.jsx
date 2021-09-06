import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import edit_src from '../../../../assets/img/edit.svg'
import './review.css';
import store from '../../../../../src/store/store';

const tempArray = [
    { id: 1, winnerPosition: 'First Prize', rewardType: 'Point Coupons', noOfAwards: 500, probability: '20%', displayName: 'Get 500 Points', rewards: 5000 },
    { id: 2, winnerPosition: 'Second Prize', rewardType: 'Point Coupons', noOfAwards: 300, probability: '20%', displayName: 'Get 300 Points', rewards: 3000 },
    { id: 3, winnerPosition: 'Third Prize', rewardType: 'Coupons', noOfAwards: 200, probability: '20%', displayName: 'Get 200 Points', rewards: 5000 },
    { id: 4, winnerPosition: 'Fourth Prize', rewardType: 'Point Coupons', noOfAwards: 100, probability: '20%', displayName: 'Get 100 Points', rewards: 1000 },
    { id: 5, winnerPosition: 'Fifth Prize', rewardType: 'Coupons', noOfAwards: 50, probability: '20%', displayName: 'Get 50 Points', rewards: 2000 },
]

export default function Review(props) {
    const engagement = store.getState().EngagementsSmartReducer;

    const targetAudience = engagement.targetAudience;
    const goalsData = engagement.setGoals;
    const journeyData = engagement.journeyBox;
    const rewardsAndBudgetData = engagement.rewardsAndBudget;

    return (
        <div id="review-container" >
            <div className="w-70 float-left clearfix c-e-r-left">
                <div className="c-e-r-left-h mb-1">Campaign Name</div>
                <div className="c-e-r-left-c-n">
                    {goalsData?.displayName}
                    <div className="disp-inline-b float-right c-pointer" onClick={() => props.setStep('setGoals')}>
                        <img src={edit_src} alt="Edit" />
                        <span className="c-e-r-left-e-txt">Edit</span>
                    </div>
                </div>
                <div className="c-e-r-left-h">Target Audience</div>
                <div className="c-e-r-left-t-a-box">
                    <div className="c-e-r-left-t-a-box-h">User Segment</div>
                    <div className="c-e-r-left-t-a-box-i pl-2">{targetAudience?.targetAudience?.name}</div>
                    {/* <div className="c-e-r-left-t-a-box-i"></div> */}
                    <div className="c-e-r-left-t-a-box-h">Rule</div>
                    <div className="c-e-r-left-t-a-box-i"></div>
                </div>

                <div className="c-e-r-left-h">
                    Define Journey
                    <div className="disp-inline-b float-right c-pointer" onClick={() => props.setStep('defineJourney')}>
                        <img src={edit_src} alt="Edit" />
                        <span className="c-e-r-left-e-txt">Edit</span>
                    </div>
                </div>
                <div className="c-e-r-left-d-j-box">
                    <div className="c-e-r-left-t-a-box-h">{journeyData?.name}</div>
                    {journeyData?.tags && journeyData.tags.length && journeyData.tags.map(tag =>
                        <div className="disp-inline-b c-e-r-left-d-j-tag">{tag}</div>
                    )}
                </div>

                <div className="c-e-r-left-h">
                    Rewards & Budget
                    <div className="disp-inline-b float-right c-pointer" onClick={() => props.setStep('rewardsAndBudget')}>
                        <img src={edit_src} alt="Edit" />
                        <span className="c-e-r-left-e-txt">Edit</span>
                    </div>
                </div>
                <div className="c-e-r-left-r-b-box">
                    {/* <div className="c-e-r-left-r-b-box-h w-100 float-left clearfix">Rewards</div> */}
                    <div className="c-e-r-left-r-b-box-table w-100 float-left clearfix mb-2">
                        {/* <div className="c-e-r-left-r-b-box-bd-box-h w-14">Reward Number</div> */}
                        {/* <div className="c-e-r-left-r-b-box-bd-box-h w-15">Reward Type</div> */}
                        <div className="c-e-r-left-r-b-box-bd-box-h w-30">Reward Name</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h w-10">Value</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h w-12">Probability(%)</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h w-40">Display to Customer</div>
                    </div>
                    {rewardsAndBudgetData?.rewards?.length && rewardsAndBudgetData?.rewards?.map((rewObj) => (
                        <div className="c-e-r-left-r-b-box-bd w-100 float-left clearfix">
                            {/* <div className="c-e-r-left-r-b-box-bd-box w-14 float-left clearfix">{rewObj.winnerPosition}</div> */}
                            {/* <div className="c-e-r-left-r-b-box-bd-box w-15 float-left clearfix">{rewObj.rewardType?.label}</div> */}
                            <div className="c-e-r-left-r-b-box-bd-box w-30 float-left clearfix">{rewObj.rewardName}</div>
                            <div className="c-e-r-left-r-b-box-bd-box w-10 float-left clearfix">{rewObj.rewardValue&&parseInt(rewObj.rewardValue).toLocaleString()}</div>
                            <div className="c-e-r-left-r-b-box-bd-box w-12 float-left clearfix">{rewObj.probability}</div>
                            <div className="c-e-r-left-r-b-box-bd-box w-40 float-left clearfix">{rewObj.displayName}</div>
                        </div>
                    ))}
                    <div className="c-e-r-left-r-b-box-table w-100 float-left clearfix mt-3 mb-2">
                        <div className="c-e-r-left-r-b-box-bd-box-h w-15">Budget</div>
                        {/* <div className="c-e-r-left-r-b-box-bd-box-h w-15"></div> */}
                        <div className="c-e-r-left-r-b-box-bd-box-h w-15">Duration</div>
                    </div>
                    <div className="c-e-r-left-r-b-box-bd w-100 float-left clearfix">
                        <div className="c-e-r-left-r-b-box-bd-box w-15 float-left clearfix">
                            <span className="c-e-r-left-r-b-box-bd-prefix">$</span>
                            {rewardsAndBudgetData?.budget}
                        </div>
                        {/* <div className="c-e-r-left-r-b-box-bd-box w-15 float-left clearfix">Daily Budget</div> */}
                        <div className="c-e-r-left-r-b-box-bd-box w-15 float-left clearfix">{rewardsAndBudgetData?.budgetDuration} Days</div>
                    </div>
                </div>
            </div>
            <div className="w-30 float-left clearfix c-e-r-right">
                <div className="w-100 float-left clearfix c-e-r-right-reach-box">

                </div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-h">Key Summary</div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub">
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-h">Segment & Rule</div>
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-c">New  Male Customers who is from New York has purchsed goods worth Rs.1000 in last 2 days</div>
                </div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub">
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-h">Number of days</div>
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-c-c">6 days</div>
                </div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub">
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-h">Approximate Buget </div>
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-c-c">1,000 INR/Day</div>
                </div>
                {/* <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub">
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-h">Expected number of sales projection</div>
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-c-c">40</div>
                </div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub">
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-h">Expected Number of Engagement </div>
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-c-c">2,000</div>
                </div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub">
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-h">Expected Number of Engagement </div>
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-c-c">2,000 with a ROI of 1000%</div>
                </div> */}
            </div>
        </div >
    )
}