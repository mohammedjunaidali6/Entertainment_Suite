import React, { Fragment, useState } from 'react';
import { BsGrid3X3GapFill, BsCalendar, BsThreeDotsVertical, BsChevronLeft } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import { containerHeightCalcFn } from "../../common/global";
import SetGoals from "./setGoals/setGoals";
import TargetAudience from "./targetAudience/targetAudience";
import DefineJourney from "./defineJourney/defineJourney";
import RewardsAndBudget from "./rewardsAndBudget/rewardsAndBudget";
import Review from "./review/review";
import './smart.css';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
}));

const data = [
    { id: 1, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live" },
    { id: 2, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live" },
    { id: 3, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live" },
    { id: 4, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "paused" },
    { id: 5, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "expired" },
    { id: 6, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "expired" },
    { id: 7, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "upcoming" },
];

export default function EngagementsSmart(props) {
    const [active, setActive] = useState('all');
    const [campaigndata, setCampaigndata] = useState(data);
    const [createFlag, setCreateFlag] = useState(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [step, setStep] = useState('setGoals');

    const campaignActionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const campaignActionClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'campaign-action-popover' : undefined;
    const createClick = () => {
        setCreateFlag(true);
    }
    function tabClick(val) {
        setActive(val);
        if(val === 'all') {
            setCampaigndata(data);
        } else {
            setCampaigndata(data.filter(e => e.status === val));
        }
    }
    const stepsBackfn = () => {
        if(step === 'setGoals') {
            setCreateFlag(false);
        } else if(step === 'targetAudience') {
            setStep('setGoals');
        } else if(step === 'defineJourney') {
            setStep('targetAudience');
        } else if(step === 'rewardsAndBudget') {
            setStep('defineJourney');
        } else if(step === 'review') {
            setStep('rewardsAndBudget');
        }
    }
    const stepsNextfn = () => {
        if(step === 'setGoals') {
            setStep('targetAudience');
        } else if(step === 'targetAudience') {
            setStep('defineJourney');
        } else if(step === 'defineJourney') {
            setStep('rewardsAndBudget');
        } else if(step === 'rewardsAndBudget') {
            setStep('review');
        } else if(step === 'review') {
            setCreateFlag(false);
            setStep('setGoals');
        }
    }

    return (
        <div id="engagements-smart-container">
            {!createFlag ?  (
                <Fragment>
                    <div className="mb-4">
                        <span className="e-s-heading">Active Campaigns</span>
                        <span className="float-right">
                            <AiOutlineMenu></AiOutlineMenu>
                            <BsGrid3X3GapFill className="ml-3"></BsGrid3X3GapFill>
                        </span>
                    </div>
                    <div>
                        <div onClick={() => tabClick('all')} className={`e-s-tab ${active === 'all' ? `e-s-tab-active` : ``}`}>All</div>
                        <div onClick={() => tabClick('live')} className={`e-s-tab ${active === 'live' ? `e-s-tab-active` : ``}`}>Active</div>
                        <div onClick={() => tabClick('paused')} className={`e-s-tab ${active === 'paused' ? `e-s-tab-active` : ``}`}>Paused</div>
                        <div onClick={() => tabClick('upcoming')} className={`e-s-tab ${active === 'upcoming' ? `e-s-tab-active` : ``}`}>Upcoming</div>
                        <div className="btn-create-engagement float-right text-center pt-2" onClick={createClick}>
                            <span className="btn-c-e-text">+ Create Engagements</span>
                        </div>
                        <div className="w-100 float-left clearfix mt-3">
                            {campaigndata && campaigndata.length > 0 ? (
                                <Fragment>
                                    {campaigndata.map((obj) => (
                                        <div key={obj.id} className="campaign-box-outer float-left clearfix mb-3">
                                            <div className="campaign-box">
                                                <div className={classnames('c-b-discount pl-3 pt-2', {
                                                    'c-b-discount-live': obj.status === 'live',
                                                    'c-b-discount-paused': obj.status === 'paused',
                                                    'c-b-discount-expired': obj.status === 'expired',
                                                    'c-b-discount-upcoming': obj.status === 'upcoming'
                                                })}>
                                                    <span className={`c-b-offer ${obj.status === 'upcoming' ? `c-b-offer-upcoming` : ``}`}>{obj.offer}</span>
                                                </div>
                                                <div className="w-100 float-left clearfix">
                                                    <div className="w-50 float-left clearfix pl-3 pt-4">
                                                        <div className="c-b-t-head">{obj.customer}</div>
                                                        <div className="c-b-t-body">Customer Participated</div>
                                                    </div>
                                                    <div className="w-50 float-left clearfix pl-3 pt-4">
                                                        <div className="c-b-t-head">{obj.sales}</div>
                                                        <div className="c-b-t-body">Customer Participated</div>
                                                    </div>
                                                </div>
                                                <div className="w-100 float-left clearfix">
                                                    <div className="w-50 float-left clearfix pl-3 pt-4">
                                                        <div className="c-b-t-head">{obj.customer}</div>
                                                        <div className="c-b-t-body">Customer Participated</div>
                                                    </div>
                                                    <div className="w-50 float-left clearfix pl-3 pt-4">
                                                        <div className="c-b-t-head">{obj.sales}</div>
                                                        <div className="c-b-t-body">Customer Participated</div>
                                                    </div>
                                                </div>
                                                <div className="c-b-dotted"></div>
                                                <div className="w-100 c-b-footer pl-3 pr-3 pt-2">
                                                    <BsCalendar></BsCalendar>
                                                    <span className="pl-2 c-b-lbl-expiry">Expire On : {obj.expiredOn}</span>
                                                    <BsThreeDotsVertical onClick={campaignActionClick} className="float-right ml-2 mt-1" style={{cursor: "pointer"}}></BsThreeDotsVertical>
                                                    <Popover
                                                        id={id}
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        onClose={campaignActionClose}
                                                        anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                        }}
                                                        transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                        }}
                                                    >
                                                        <Typography className="">
                                                            <div className="c-b-campaign-options p-0">
                                                                <div>Pause</div>
                                                                <div>Edit</div>
                                                                <div>View Report</div>
                                                                <div>Delete</div>
                                                            </div>
                                                        </Typography>
                                                    </Popover>
                                                    <span className="c-b-status float-right mt-1"><div className={classnames('mr-2', {
                                                        'logo-live': obj.status === 'live',
                                                        'logo-paused': obj.status === 'paused',
                                                        'logo-expired': obj.status === 'expired',
                                                        'logo-upcoming': obj.status === 'upcoming'
                                                    })}></div>{obj.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Fragment>
                            ) : <div className="e-s-heading ml-4">No campaigns found!</div>}
                        </div>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <div style={{height: containerHeightCalcFn(192)}}>
                        <div id="c-s-breadcrum">
                            <div className="c-s-breadcrum-back" onClick={() => setCreateFlag(false)}><BsChevronLeft></BsChevronLeft>Back</div>
                            <div className="c-s-breadcrum-title">
                                <span className="pl-1 c-pointer" onClick={() => setCreateFlag(false)}>Smart Engagements / </span>
                                <span className="text-bold">Create Engagement</span>
                            </div>
                        </div>
                        <div className="c-s-step-sec mt-2">

                        </div>
                        <div className="c-s-content-sec">
                            {step === 'setGoals' ? <SetGoals></SetGoals> : (
                                step === 'targetAudience' ? <TargetAudience></TargetAudience> : (
                                    step === 'defineJourney' ? <DefineJourney></DefineJourney> : (
                                        step === 'rewardsAndBudget' ? <RewardsAndBudget></RewardsAndBudget> : (
                                            step === 'review' ? <Review></Review> : null
                                        )
                                    )
                                )
                            )}
                        </div>
                    </div>
                    <div id="c-s-action-sec" className="w-100">
                        <button type="button" className="c-s-btn-approve ml-3 float-right" onClick={stepsNextfn}>{step === 'review' ? 'Approve' : 'Next'}</button>
                        <button type="button" className="c-s-btn-back float-right" onClick={stepsBackfn}>Back</button>
                    </div>
                </Fragment>
            )}
        </div>
    )
}
