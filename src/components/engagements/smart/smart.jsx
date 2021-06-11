import React, { Fragment, useState, useEffect } from 'react';
import { BsGrid3X3GapFill, BsCalendar, BsThreeDotsVertical, BsChevronLeft } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { containerHeightCalcFn } from "../../common/global";
import CampaignBox from "../../common/campaignBox/campaignBox";
import SearchBar from "../../common/searchBar/searchBar";
import Table from "../../common/reactTable/table";
import { CampaignMockData, CampaignTableColumns } from "../../../constants/globalMockdata";
import SetGoals from "./setGoals/setGoals";
import TargetAudience from "./targetAudience/targetAudience";
import DefineJourney from "./defineJourney/defineJourney";
import RewardsAndBudget from "./rewardsAndBudget/rewardsAndBudget";
import EStepper from "./stepper/stepper";
import Review from "./review/review";
import './smart.css';
import _ from 'lodash';
import { getData, postData } from '../../../api/ApiHelper';
import Loader from '../../common/Spinner/spinner';
import Alert from '../../common/alertBox/alertBox';
import store from '../../../../src/store/store';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function EngagementsSmart(props) {
    const [active, setActive] = useState('all');
    const [createFlag, setCreateFlag] = useState(false);
    const [gridFlag, setGridFlag] = useState(true);
    const classes = useStyles();
    const [campaignsData, setCampaignsData] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [step, setStep] = useState('setGoals');
    const [goalDataForm, setGoalDataForm] = useState(null);
    const [goalData, setGoalData] = useState({});
    const [defineJourney, setDefineJourney] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ title: '', text: '', show: false });

    const createClick = () => {
        setCreateFlag(true);
    }

    function tabClick(val) {
        setActive(val);
        if (val === 'all') {
            fetchEngagements();
        } else {
            let id = val == 'live' ? 1 : val === 'paused' ? 2 : val === 'completed' ? 3 : val === 'upcoming' ? 4 : 0;
            fetchEngagementsByStatus(id);
            //setCampaigndata(CampaignMockData.filter(e => e.status === val));
        }
    }

    const stepsBackfn = () => {
        if (step === 'setGoals') {
            createEngagementDataClear();
            setCreateFlag(false);
        } else if (step === 'targetAudience') {
            setStep('setGoals');
        } else if (step === 'defineJourney') {
            setStep('targetAudience');
        } else if (step === 'rewardsAndBudget') {
            setStep('defineJourney');
        } else if (step === 'review') {
            setStep('rewardsAndBudget');
        }
    }
    const stepsNextfn = () => {
        if (step === 'setGoals') {
            if (goalDataForm === 'VALID') {
                setStep('targetAudience');
                props.engagementsSmartActionHandler.dispatchSetGoalsData(goalData);
            }
        } else if (step === 'targetAudience') {
            setStep('defineJourney');
        } else if (step === 'defineJourney') {
            if (defineJourney) {
                setStep('rewardsAndBudget');
                props.engagementsSmartActionHandler.dispatchJourneyBoxData(defineJourney);
            }
        } else if (step === 'rewardsAndBudget') {
            setStep('review');
        } else if (step === 'review') {
            setCreateFlag(false);
            setStep('setGoals');
            setAlert({ title: 'Are you sure!', text: 'Do you want create engagement?', show: true });
        }
    }

    const createEngagement = () => {
        const engagementState = store.getState().EngagementsSmartReducer;
        const goalsData = engagementState.setGoals;
        const journeyData = engagementState.journeyBox;
        const rewardsData = engagementState.rewardsData;
        const budget = parseInt(engagementState.budget ?? '0');
        const budgetDuration = parseInt(engagementState.budgetDuration ?? '0');
        let engagementObj = {};
        engagementObj.CampaignName = goalsData.campaignName;
        engagementObj.DisplayName = goalsData.displayName;
        engagementObj.StatusID = 1;
        engagementObj.CustomerSegmentID = 1;
        engagementObj.JourneyID = journeyData.id;

        engagementObj.PurchaseRule = {};
        if (engagementState.targetAudience.purchaseValue && engagementState.targetAudience.durationNum) {
            engagementObj.PurchaseRule.Value = parseInt(engagementState.targetAudience.purchaseValue);
            let daysType = engagementState.targetAudience.daysType?.value;
            let durationNum = parseInt(engagementState.targetAudience.durationNum);
            let days = daysType === 'Week' ? durationNum * 7 : daysType === 'Month' ? durationNum * 30 : durationNum;
            engagementObj.PurchaseRule.NumberOfDays = days;
        }

        engagementObj.Rewards = [];
        rewardsData.forEach(rewObj => {
            let rewardObj = {};
            rewardObj.WinPosition = rewObj.winnerPosition;
            rewardObj.DisplayName = rewObj.displayName;
            rewardObj.RewardType = rewObj.rewardType;
            rewardObj.Probability = rewObj.probability;
            rewardObj.RewardMasterID = rewObj.id;
            engagementObj.Rewards.push(rewardObj);
        })

        engagementObj.DailyBudget = budget;
        engagementObj.BudgetDays = budgetDuration;
        postData(`/engt/createengagement`, engagementObj)
            .then(response => {
                if (response.status == 200) {
                    console.log('***', 'Engagement saved Succesfully');
                    createEngagementDataClear();
                } else {
                    console.log('**** CREATE FAILED', response)
                }
            });
    }

    const createEngagementDataClear = () => {
        props.engagementsSmartActionHandler.dispatchSetGoalsData(null);
        props.engagementsSmartActionHandler.dispatchTargetAudienceData(null);
        props.engagementsSmartActionHandler.dispatchJourneyBoxData(null);
        props.engagementsSmartActionHandler.dispatchRewardsData(null);
        props.engagementsSmartActionHandler.dispatchBudget(null);
        props.engagementsSmartActionHandler.dispatchBudgetDuration(null);
    }

    const getSetGoalsFormValues = (val, status) => {
        setGoalDataForm(status);
        setGoalData(val);
    }
    const setTargetAudienceData = (data) => {
        console.log('***', data)
        props.engagementsSmartActionHandler.dispatchTargetAudienceData(data);
    }
    const getDefineJourney = (data) => {
        setDefineJourney(data);
    }

    const fetchEngagements = () => {
        try {
            setLoading(true);
            getData(`/engt/engagementbyfilters`)
                .then(response => {
                    if (response && response.data.data && Array.isArray(response.data?.data)) {
                        const data = response.data.data;
                        let engmentsArr = [];
                        data.forEach(eng => {
                            let obj = {}
                            obj.id = eng.EngagementID;
                            obj.offer = eng.DisplayName;
                            obj.customer = eng.CustomerSummary.CustomersParticipatedCount;
                            obj.sales = eng.CustomerSummary.RepeatedCustomersCount;
                            obj.expiredOn = new Date(eng.CompletedDate).toLocaleDateString('en-US');
                            obj.status = eng.Status == 1 ? 'live' : eng.Status == 2 ? 'paused' : eng.Status == 3 ? 'upcoming' : 'expired'
                            obj.isRecent = false;

                            engmentsArr.push(obj);
                        })
                        props.engagementsSmartActionHandler.dispatchEngagementsData(data);
                        setCampaignsData(engmentsArr);
                    } else {
                        console.log('****', response?.data?.message, response?.data?.data)
                    }
                    setLoading(false);
                })
        } catch (error) {
            console.log(error.message)
        }
    }
    const fetchEngagementsByStatus = (id => {
        setLoading(true);
        getData(`/engt/engagementsbystatus?engagement_status_id=${id}`)
            .then(response => {
                if (response && response.data.data && Array.isArray(response.data?.data)) {
                    const data = response.data.data;
                    let engmentsArr = [];
                    data.forEach(eng => {
                        let obj = {}
                        obj.id = eng.EngagementID;
                        obj.offer = eng.DisplayName;
                        obj.customer = eng.CustomerSummary.CustomersParticipatedCount;
                        obj.sales = eng.CustomerSummary.RepeatedCustomersCount;
                        obj.expiredOn = new Date(eng.CompletedDate).toLocaleDateString('en-US');
                        obj.status = eng.Status == 1 ? 'live' : eng.Status == 2 ? 'paused' : eng.Status == 3 ? 'upcoming' : 'expired'
                        obj.isRecent = false;
                        engmentsArr.push(obj);
                    })
                    props.engagementsSmartActionHandler.dispatchEngagementsData(data);
                    setCampaignsData(engmentsArr);
                    setLoading(false);
                } else {
                    props.engagementsSmartActionHandler.dispatchEngagementsData();
                    setCampaignsData();
                    setLoading(false);
                }
            })
    })
    const onAlertClick = (isYes) => {
        setAlert({ title: '', text: '', show: false });
        if (isYes) {
            createEngagement();
        }
    }
    const getEngagementByID = (id) => {
        return getData(`/engt/engagementbyid?engagement_id=${id}`)
    }
    const onPauseClick = (engmt) => {
        getData(`/engt/updateengagementstatus?engagement_id=${engmt.id}&engagement_status_id=${2}`)
            .then((response) => {
                if (response && response.data.data) {
                    engmt.status = 'paused';
                    let campaigns = [...campaignsData];
                    let storeEngagements = [...props?.campaignsData];
                    campaigns.splice(_.findIndex(campaigns, e => e.id == engmt.id), 1, engmt);
                    storeEngagements.splice(_.findIndex(storeEngagements, e => e.EngagementID == engmt.id), 1, response.data.data);
                    props.engagementsSmartActionHandler.dispatchEngagementsData(storeEngagements);
                    setCampaignsData(campaigns)
                } else {
                    console.error('*****', response)
                }
            })
    }
    const onEditClick = (engmt) => {
        console.log('****', engmt)
        getData(`/engt/engagementdetailsbyid?engagement_id=${engmt.id}`)
            .then(response => {
                if (response && response.data?.data) {

                } else {
                    console.error('*****', response)
                }
            })
    }
    const onViewReportClick = (engmt) => {
        console.log('****', engmt)
        getEngagementByID(engmt.id)
            .then(response => {
                if (response && response.data.data) {
                    console.log('*****', response.data.data)
                } else {
                    console.error('*****', response)
                }
            });
    }
    const onDeleteClick = (engmt) => {
        console.log('****', engmt)
        getData(`/engt/engagementbyid?engagement_id=${engmt.id}`)
            .then(response => {
                if (response && response.data.data) {
                    console.log('*****', response.data.data)
                } else {
                    console.error('*****', response)
                }
            });
    }


    useEffect(() => {
        fetchEngagements();
        return () => {
            createEngagementDataClear();
        }
    }, []);

    const selectedRowsFn = (selectedRows) => {
        console.log('****selectedRows', selectedRows);
    }


    return (
        <div id="engagements-smart-container">
            {alert.show && <Alert title={alert.title} text={alert.text} onAlertClick={onAlertClick} />}
            {loading ?
                <Loader /> :
                !createFlag ? (
                    <Fragment>
                        <div className="mb-4">
                            <span className="e-s-heading">Active Campaigns</span>
                            <span className="float-right mr-3">
                                <AiOutlineMenu className={`c-pointer ${!gridFlag ? `e-s-switch` : ``}`} onClick={() => setGridFlag(false)} style={{ width: "22px", height: "22px" }}></AiOutlineMenu>
                                <BsGrid3X3GapFill className={`c-pointer ml-3 ${gridFlag ? `e-s-switch` : ``}`} onClick={() => setGridFlag(true)} style={{ width: "22px", height: "22px" }}></BsGrid3X3GapFill>
                            </span>
                        </div>
                        <div>
                            <div onClick={() => tabClick('all')} className={`e-s-tab ${active === 'all' ? `e-s-tab-active` : ``}`}>All</div>
                            <div onClick={() => tabClick('live')} className={`e-s-tab ${active === 'live' ? `e-s-tab-active` : ``}`}>Active</div>
                            <div onClick={() => tabClick('paused')} className={`e-s-tab ${active === 'paused' ? `e-s-tab-active` : ``}`}>Paused</div>
                            <div onClick={() => tabClick('upcoming')} className={`e-s-tab ${active === 'upcoming' ? `e-s-tab-active` : ``}`}>Upcoming</div>
                            <div onClick={() => tabClick('completed')} className={`e-s-tab ${active === 'completed' ? `e-s-tab-active` : ``}`}>Completed</div>
                            <div className="btn-create-engagement float-right text-center pt-2 mr-3" onClick={createClick}>
                                <span className="btn-c-e-text">+ Create Engagements</span>
                            </div>
                            {gridFlag ? (
                                <div className="w-100 float-left clearfix mt-3">
                                    {campaignsData && campaignsData.length > 0 ?
                                        <CampaignBox
                                            campaigndata={campaignsData}
                                            onPauseClick={(engmt) => onPauseClick(engmt)}
                                            onEditClick={(engmt) => onEditClick(engmt)}
                                            onViewReportClick={(engmt) => onViewReportClick(engmt)}
                                            onDeleteClick={(engmt) => onDeleteClick(engmt)}
                                        >
                                        </CampaignBox>
                                        :
                                        <div className="e-s-heading ml-4">No campaigns found!</div>}
                                </div>
                            ) : (
                                <div className="mt-4" id="e-s-table-sec">
                                    <Table columns={CampaignTableColumns}
                                        data={campaignsData}
                                        pagination={true}
                                        selectableRows={true}
                                        selectedRowsFn={selectedRowsFn}
                                        subHeaderComponent={
                                            <SearchBar placeHolder="Search Engagements" fromEngagements={true} searchFilter="All Engagements" />
                                        }
                                        subHeader={true}
                                    />
                                </div>
                            )}
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div style={{ height: containerHeightCalcFn(192), overflowY: "auto" }}>
                            <div id="c-s-breadcrum">
                                <div className="c-s-breadcrum-back" onClick={() => setCreateFlag(false)}><BsChevronLeft></BsChevronLeft>Back</div>
                                <div className="c-s-breadcrum-title">
                                    <span className="pl-1 c-pointer" onClick={() => setCreateFlag(false)}>Smart Engagements / </span>
                                    <span className="text-bold">Create Engagement</span>
                                </div>
                            </div>
                            <div className="c-s-step-sec mt-2 content-c">
                                {step === 'setGoals' ? <EStepper stepName="Set Goals" stepCount={1} thumbHide={true} /> :
                                    step === 'targetAudience' ? <EStepper stepName="Target Audience" stepCount={2} thumbHide={true} /> :
                                        step === 'defineJourney' ? <EStepper stepName="Define Journey" stepCount={3} thumbHide={true} /> :
                                            step === 'rewardsAndBudget' ? <EStepper stepName="Rewards & Journey" stepCount={4} thumbHide={true} /> :
                                                step === 'review' ? <EStepper stepName="Review" stepCount={5} thumbHide={true} /> :
                                                    null
                                }

                            </div>
                            <div className="c-s-content-sec w-100 float-left clearfix">
                                {step === 'setGoals' ?
                                    <SetGoals getSetGoalsFormValues={getSetGoalsFormValues} /> :
                                    step === 'targetAudience' ?
                                        <TargetAudience setTargetAudienceData={(obj) => setTargetAudienceData(obj)} props={props} /> :
                                        step === 'defineJourney' ?
                                            <DefineJourney getDefineJourney={getDefineJourney} props={props} /> :
                                            step === 'rewardsAndBudget' ?
                                                <RewardsAndBudget props={props} /> :
                                                step === 'review' ?
                                                    <Review setStep={txt => setStep(txt)} /> :
                                                    null
                                }
                            </div>
                        </div>
                        <div id="c-s-action-sec" className="w-100">
                            <button type="button" className="c-s-btn-approve ml-3 float-right" onClick={stepsNextfn}>
                                {step === 'review' ? 'Approve' : 'Next'}
                            </button>
                            <button type="button" className="c-s-btn-back float-right" onClick={stepsBackfn}>Back</button>
                        </div>
                    </Fragment>
                )
            }
        </div>
    )
}
