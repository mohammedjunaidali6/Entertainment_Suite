import React, { Fragment } from 'react';
import edit_src from '../../../../assets/img/edit.svg'
import './review.css';
import store from '../../../../../src/store/store';
import {BUDGET_CURRENCY } from "../../../../constants/globalConstants";


export default function Review(props) {
    const engagement = store.getState().EngagementsSmartReducer;

    const targetAudience = engagement.targetAudience;
    const preRulesData = engagement.preRules;
    const goalData = engagement.setGoals;
    const journeyData = engagement.journeyBox;
    const rewardsAndBudgetData = engagement.rewardsAndBudget;


    return (
        <div id="review-container" >
            <div className="w-70 float-left clearfix c-e-r-left">
                <div className="c-e-r-left-h mb-1">Engagement
                    <div className="disp-inline-b float-right c-pointer" onClick={() => props.setStep('setGoals')}>
                        <img src={edit_src} alt="Edit" />
                        <span className="c-e-r-left-e-txt">Edit</span>
                    </div>
                </div>
                <div style={{marginLeft:'30px',marginBottom:'20px'}}>
                    <div className='c-e-r-eng'><span>Name : </span><span>{goalData?.displayName||''}</span></div>
                    <div className='c-e-r-eng'>
                        <span>Type : </span><span>{goalData?.isTournament?'Tournament':'Normal'}</span>
                        {goalData?.isTournament&&
                            <Fragment>
                                <span className='c-e-r-tourn-date'>Start Date : </span><span>{goalData?.startDate?.toISOString().substring(0,10)||'--/--/----'}</span>
                                <span className='c-e-r-tourn-date'>End Date : </span><span>{goalData?.endDate?.toISOString().substring(0,10)||'--/--/----'}</span>
                            </Fragment>
                        }
                    </div>
                </div>
                <div className="c-e-r-left-h">Target Audience</div>
                <div className="c-e-r-left-t-a-box">
                    <div className="c-e-r-left-t-a-box-h">User Segment</div>
                    <div className="c-e-r-left-t-a-box-i pl-2">{targetAudience?.segment_name}</div>
                </div>
                <div className="c-e-r-left-h">Prerequisite Rules</div>
                <div className="c-e-r-left-t-a-box">
                    <div className="c-e-r-left-t-a-box-h">Cost to Play</div>
                    <div className="c-e-r-left-t-a-box-i pl-2">{preRulesData?.costToPlay||'Free'}</div>
                    <div className="c-e-r-left-t-a-box-h">Rule</div>
                    <div className="c-e-r-left-t-a-box-i">
                        {preRulesData?.purchaseValue&&`Purchase value should be greaterthan or equal to ${preRulesData.purchaseValue} in last ${preRulesData.durationNum} Days`}
                    </div>
                </div>
                <div className="c-e-r-left-h">Define Journey
                    <div className="disp-inline-b float-right c-pointer" onClick={() => props.setStep('defineJourney')}>
                        <img src={edit_src} alt="Edit" />
                        <span className="c-e-r-left-e-txt">Edit</span>
                    </div>
                </div>
                <div className="c-e-r-left-d-j-box">
                    <div className="c-e-r-left-t-a-box-h">{journeyData?.name}</div>
                    {journeyData?.tags && journeyData.tags.length && journeyData.tags.map(tag =>
                        <div className="disp-inline-b c-e-r-left-d-j-tag">{tag.replace('{0}','')}</div>
                    )}
                </div>

                <div className="c-e-r-left-h">
                    Rewards & Budget
                    <div className="disp-inline-b float-right c-pointer" onClick={() => props.setStep('rewardsAndBudget')}>
                        <img src={edit_src} alt="Edit" />
                        <span className="c-e-r-left-e-txt">Edit</span>
                    </div>
                </div>
                <div className="c-e-r-left-r-b-box" style={{width:'100%'}}>
                    <div className="c-e-r-left-r-b-box-table w-100 float-left clearfix mb-2">
                        {goalData?.isTournament&&
                            <div className="c-e-r-left-r-b-box-bd-box-h w-12">Rank</div>}
                        <div className="c-e-r-left-r-b-box-bd-box-h w-24">Reward Name</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h w-10">Value</div>
                        {goalData?.isTournament?
                            <div className="c-e-r-left-r-b-box-bd-box-h w-12">Winners</div>
                            :
                            <div className="c-e-r-left-r-b-box-bd-box-h w-12">Probability(%)</div>
                        }
                        <div className="c-e-r-left-r-b-box-bd-box-h w-40">Display to Customer</div>
                    </div>
                    {rewardsAndBudgetData?.rewards?.length && rewardsAndBudgetData?.rewards?.map((rewObj) => (
                        <div className="c-e-r-left-r-b-box-bd w-100 float-left clearfix">
                            {goalData?.isTournament&&
                                <div className="c-e-r-left-r-b-box-bd-box w-12 float-left clearfix">{rewObj.winnerPosition}</div>}
                            <div className="c-e-r-left-r-b-box-bd-box w-24 float-left clearfix">{rewObj.rewardName}</div>
                            <div className="c-e-r-left-r-b-box-bd-box w-10 float-left clearfix">{rewObj.rewardValue&&parseInt(rewObj.rewardValue).toLocaleString()}</div>
                            {goalData?.isTournament?
                                <div className="c-e-r-left-r-b-box-bd-box w-12 float-left clearfix">{rewObj.numberOfWinners}</div>
                                :
                                <div className="c-e-r-left-r-b-box-bd-box w-12 float-left clearfix">{rewObj.probability}</div>
                            }
                            <div className="c-e-r-left-r-b-box-bd-box w-40 float-left clearfix">{rewObj.displayName}</div>
                        </div>
                    ))}
                    {/* <div className="c-e-r-left-r-b-box-table w-100 float-left clearfix mt-3 mb-2">
                        <div className="c-e-r-left-r-b-box-bd-box-h w-15">Budget</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h w-15"></div>
                        <div className="c-e-r-left-r-b-box-bd-box-h w-15">Duration</div>
                    </div>
                    <div className="c-e-r-left-r-b-box-bd w-100 float-left clearfix">
                        <div className="c-e-r-left-r-b-box-bd-box w-15 float-left clearfix">
                            <span className="c-e-r-left-r-b-box-bd-prefix">{BUDGET_CURRENCY}</span>
                            {rewardsAndBudgetData?.budget&&parseInt(rewardsAndBudgetData?.budget).toLocaleString()}
                        </div>
                        <div className="c-e-r-left-r-b-box-bd-box w-15 float-left clearfix">Daily Budget</div>
                        <div className="c-e-r-left-r-b-box-bd-box w-15 float-left clearfix">{rewardsAndBudgetData?.budgetDuration} Days</div>
                    </div> */}
                </div>
            </div>
            <div className="w-30 float-left clearfix c-e-r-right">
                <div className="w-100 float-left clearfix c-e-r-right-reach-box">

                </div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-h">Key Summary</div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub">
                    {/* <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-h">Segment & Rule</div>
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-c">New  Male Customers who is from New York has purchsed goods worth Rs.1000 in last 2 days</div> */}
                </div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub">
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-h">Number of days</div>
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-c-c">
                        {goalData?.isTournament?'-':(rewardsAndBudgetData?.budgetDuration||0)} days
                    </div>
                </div>
                <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub">
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-h">Approximate Buget </div>
                    <div className="w-100 h-100 float-left clearfix c-e-r-right-reach-sub-c-c">
                        {goalData?.isTournament?'-':(rewardsAndBudgetData?.budget&&parseInt(rewardsAndBudgetData?.budget).toLocaleString())} {BUDGET_CURRENCY}
                    </div>
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