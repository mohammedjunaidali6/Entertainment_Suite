import React, { Fragment, useState, useEffect } from 'react';
import { BsGrid3X3GapFill, BsCalendar, BsThreeDotsVertical, BsChevronLeft } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { containerHeightCalcFn } from "../../common/global";
import CampaignBox from "../../common/campaignBox/campaignBox";
import SearchBar from "../../common/searchBar/searchBar";
import Table from "../../common/reactTable/table";
import SetGoals from "./setGoals/setGoals";
import TargetAudience from "./targetAudience/targetAudience";
import DefineJourney from "./defineJourney/defineJourney";
import RewardsAndBudget from "./rewardsAndBudget/rewardsAndBudget";
import EStepper from "./stepper/stepper";
import Review from "./review/review";
import './smart.css';
import _ from 'lodash';
import { getAuthAndData, getData, postAuthAndData, postData } from '../../../api/ApiHelper';
import EngagementContextMenu from "../../common/reactTable/engagementMenu";
import { SAVE_ENGAGEMENT, DELETE_ENGAGEMENT, ENGAGEMENTS_DETAILS_BY_ID, ENGAGEMENT_UPDATE_STATUS, ENGAGEMENT_BY_STATUS_ID, ENGAGEMENTS_BY_FILTERS } from '../../../api/apiConstants';
import MessageBox from '../../common/MessageBox/MessageBox';
import store from '../../../store/store';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function EngagementsSmart(props) {
    var history = useHistory();
    const [active, setActive] = useState('all');
    const [openEngagementWizard, setOpenEngagementWizard] = useState(false);
    const [gridFlag, setGridFlag] = useState(true);
    const [step, setStep] = useState('setGoals');
    const [goalDataForm, setGoalDataForm] = useState(null);
    const [goalData, setGoalData] = useState({});
    const [defineJourney, setDefineJourney] = useState(null);
    const [messageBox, setMessageBox] = useState({ display: false, type: '', text: '' });

    const CampaignTableColumns = [
        {
            name: "Engagement name",
            selector: "DisplayName"
        },
        {
            name: "Expire On",
            cell: rowObj => new Date(rowObj.CompletedDate).toLocaleDateString()
        },
        {
            name: "Customers Participated",
            selector: "CustomersParticipatedCount"
        },
        {
            name: "Total Winners",
            selector: "WinnersCount"
        },
        {
            name: "Repeated Customers",
            selector: "RepeatedCustomersCount"
        },
        {
            name: "TBD",
            selector: "ToBeDiscussed"
        },
        {
            name: "Status",
            cell: rowObj =>
                <div className={classnames('text-c', {
                    'txt-green': rowObj.Status === 1,
                    'txt-grey': rowObj.Status === 2,
                    'txt-orange': rowObj.Status === 3,
                    'txt-blue': rowObj.Status === 4
                })}>
                    {rowObj.Status === 1 ? 'live' : rowObj.Status === 2 ? 'paused' : rowObj.Status === 3 ? 'expired' : rowObj.Status === 4 ? 'upcoming' : 'completed'}
                </div>
        },
        {
            name: "Actions",
            cell: rowObj => <EngagementContextMenu onAction={(e) => onActionClick(e, rowObj)} status={rowObj.Status} />
        }
    ]

    const handleMessageBox = (messageType, textToDisplay) => {
        setMessageBox({ display: true, type: messageType, text: textToDisplay });
        setTimeout(() => setMessageBox({ display: false, type: '', text: '' }), 3000)
    }
    const handleLoader = (showBool) => {
        props.routeActionHandler.dispatchLoaderData(showBool);
    }
    const handleAlertDialog = (obj) => {
        props.routeActionHandler.dispatchAlertDialogData(obj);
    }

    const createClick = () => {
        setOpenEngagementWizard(true);
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
            setOpenEngagementWizard(false);
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
                goalData.EngagementId = props.setGoals?.EngagementId;
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
            handleAlertDialog({
                open: true, title: 'Save Engagement', text: 'Are you sure? Do you want to save it?', handleClose: (bool) => {
                    handleAlertDialog({ open: false, title: '', text: '', handleClose: () => { } });
                    if (bool) {
                        saveEngagement();
                    }
                    setStep('setGoals');
                }
            });
        }
    }

    const saveEngagement = () => {
        try {
            handleLoader(true);
            const targetAudienceData = props.targetAudience;
            const goalsData = props.setGoals;
            const journeyData = props.journeyBox;
            const rewardsAndBudget = props.rewardsAndBudget;

            let engagementObj = {};
            engagementObj.EngagementID = goalsData.EngagementId ?? 0;
            engagementObj.CampaignName = goalsData.campaignName;
            engagementObj.DisplayName = goalsData.displayName;
            engagementObj.StatusID = 1;
            engagementObj.CustomerSegmentID = targetAudienceData.targetAudience.customer_segment_id;
            engagementObj.JourneyID = journeyData.id;

            engagementObj.PurchaseRule = {};
            if (targetAudienceData.purchaseValue && targetAudienceData.durationNum) {
                engagementObj.PurchaseRule.Value = parseInt(targetAudienceData.purchaseValue);
                let daysType = targetAudienceData.daysType;
                let durationNum = parseInt(targetAudienceData.durationNum);
                let days = daysType === 'Week' ? durationNum * 7 : daysType === 'Month' ? durationNum * 30 : durationNum;
                engagementObj.PurchaseRule.NumberOfDays = days;
                engagementObj.PurchaseRule.PurchaseRuleID = targetAudienceData?.purchaseRuleId ?? 0
            }

            engagementObj.Rewards = [];
            rewardsAndBudget?.rewards?.forEach(rewObj => {
                let rewardObj = {};
                rewardObj.EngagementRewardId = rewObj.engagementRewardId || 0
                rewardObj.WinPosition = rewObj.winnerPosition;
                rewardObj.DisplayName = rewObj.displayName;
                rewardObj.RewardType = rewObj.rewardType?.label;
                rewardObj.Probability = rewObj.probability;
                rewardObj.RewardMasterID = rewObj.id || 0;
                rewardObj.Value = rewObj.rewardValue || null;
                engagementObj.Rewards.push(rewardObj);
            })

            engagementObj.DailyBudget = parseInt(rewardsAndBudget.budget ?? '0');
            engagementObj.BudgetDays = parseInt(rewardsAndBudget.budgetDuration ?? '0');

            postAuthAndData(SAVE_ENGAGEMENT, engagementObj, history)
                .then(engagementDbObj => {
                    if (engagementDbObj) {
                        setOpenEngagementWizard(false);
                        handleMessageBox('success', 'Engagement Saved Succesfully');
                        fetchEngagements();
                        createEngagementDataClear();
                    } else {
                        handleMessageBox('error', 'Engagement Saving failed');
                    }
                    handleLoader(false);
                });
        } catch (error) {
            handleLoader(false);

        }
    }

    const createEngagementDataClear = () => {
        props.engagementsSmartActionHandler.dispatchSetGoalsData(null);
        props.engagementsSmartActionHandler.dispatchTargetAudienceData(null);
        props.engagementsSmartActionHandler.dispatchJourneyBoxData(null);
        props.engagementsSmartActionHandler.dispatchRewardsAndBudgetData(null);
    }

    const getSetGoalsFormValues = (val, status) => {
        setGoalDataForm(status);
        setGoalData(val);
    }
    const getDefineJourney = (data) => {
        setDefineJourney(data);
    }


    const fetchEngagements = () => {
        try {
            handleLoader(true);
            getAuthAndData(ENGAGEMENTS_BY_FILTERS, history)
                .then(engagementsData => {
                    if (engagementsData && Array.isArray(engagementsData)) {
                        props.engagementsSmartActionHandler.dispatchEngagementsData(engagementsData);
                    } else {
                        props.engagementsSmartActionHandler.dispatchEngagementsData();
                    }
                    handleLoader(false);
                })
        } catch (error) {
            handleLoader(false);
            console.log(error.message)
        }
    }
    const fetchEngagementsByStatus = (id => {
        handleLoader(true);
        getAuthAndData(`${ENGAGEMENT_BY_STATUS_ID}${id}`, history)
            .then(engagements => {
                if (engagements && Array.isArray(engagements)) {
                    props.engagementsSmartActionHandler.dispatchEngagementsData(engagements);
                } else {
                    props.engagementsSmartActionHandler.dispatchEngagementsData();
                }
                handleLoader(false);
            })
    })

    /// Context Menu Click from List View of EN
    const onActionClick = (e, obj) => {
        var actionText = e.target.innerText;
        if (actionText == 'Pause') {
            onPauseClick(obj, 2);
        } else if (actionText == 'Resume') {
            onPauseClick(obj, 1);
        } else if (actionText == 'Edit') {
            onEditClick(obj);
        } else if (actionText == 'Delete') {
            onDeleteClick(obj);
        } else if (actionText == 'View Report') {
            onDeleteClick(obj);
        }
    }

    const onPauseClick = (engmt, status) => {
        handleLoader(true);
        getAuthAndData(`${ENGAGEMENT_UPDATE_STATUS}${engmt.EngagementID}&engagement_status_id=${status}`, history)
            .then((response) => {
                if (response) {
                    tabClick(active);
                    console.log(`*** ${engmt.EngagementID} Engagement is Paused succesfully`)
                } else {
                }
                handleLoader(false);
            })
    }
    const onEditClick = (engmt) => {
        handleLoader(true);
        getAuthAndData(`${ENGAGEMENTS_DETAILS_BY_ID}${engmt.EngagementID}`, history)
            .then(engagements => {
                if (engagements) {
                    let setGoals = {
                        EngagementId: engagements.EngagementID,
                        campaignName: engagements.CampaignName,
                        displayName: engagements.DisplayName,
                        goal: {
                            id: 1,
                            isActive: true,
                            desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                            heading: "Increase sales volume"
                        }
                    }
                    setGoalData(setGoals);
                    setGoalDataForm('VALID');
                    let targetAudience = {
                        targetAudience: engagements.CustomerSegmentID,
                        purchaseRuleId: engagements.PurchaseRule?.PurchaseRuleID,
                        purchaseValue: engagements.PurchaseRule?.Value,
                        durationNum: engagements.PurchaseRule?.NumberOfDays,
                        daysType: 'days'
                    }
                    let journeyObj = {
                        id: engagements.JourneyID,
                        tags: [],
                        isActive: false
                    }
                    setDefineJourney(journeyObj);

                    let rewardArr = [];
                    if (Array.isArray(engagements.Rewards)) {
                        engagements.Rewards.forEach(rew => {
                            let rewardObj = {}
                            rewardObj.engagementRewardId = rew.EngagementRewardID;
                            rewardObj.id = rew.RewardMasterID;
                            rewardObj.winnerPosition = rew.WinPosition;
                            rewardObj.rewardType = rew.RewardType;
                            rewardObj.rewardValue = rew.Value;
                            rewardObj.probability = rew.Probability;
                            rewardObj.displayName = rew.DisplayName;
                            rewardArr.push(rewardObj);
                        })
                    }
                    let rewardsAndBudget = {
                        rewards: rewardArr,
                        budget: engagements.DailyBudget,
                        budgetDuration: engagements.BudgetDays
                    }

                    props.engagementsSmartActionHandler.dispatchSetGoalsData(setGoals);
                    props.engagementsSmartActionHandler.dispatchTargetAudienceData(targetAudience);
                    props.engagementsSmartActionHandler.dispatchJourneyBoxData(journeyObj);
                    props.engagementsSmartActionHandler.dispatchRewardsAndBudgetData(rewardsAndBudget);
                    setOpenEngagementWizard(true);
                } else {

                }
                handleLoader(false);
            })
    }

    const onDeleteClick = (engmt) => {
        handleAlertDialog({
            open: true, title: 'Delete Engagement', text: 'Do you want to DELETE Engagement?', handleClose: (bool) => {
                handleAlertDialog({ open: false, title: '', text: '', handleClose: () => { } });
                if (bool) {
                    handleLoader(true);
                    getAuthAndData(`${DELETE_ENGAGEMENT}${engmt.EngagementID}`, history)
                        .then(engagement => {
                            if (engagement) {
                                tabClick(active);
                                console.log(`*** ${engmt.EngagementID} Engagement is deleted successfully`)
                            }
                            handleLoader(false);
                        });
                } else {

                }
            }
        });
    }

    const onViewReportClick = (engmt) => {
        console.log(`*** ${engmt.EngagementID} Engagement is to be Viewed`)
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
            <MessageBox display={messageBox.display ? 'block' : 'none'} type={messageBox.type} text={messageBox.text} />
            {!openEngagementWizard ? (
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
                                {props.campaignsData && props.campaignsData.length > 0 ?
                                    <CampaignBox
                                        campaigndata={props.campaignsData}
                                        onPauseClick={(engmt, status) => onPauseClick(engmt, status)}
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
                                    data={props.campaignsData}
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
                            <div className="c-s-breadcrum-back" onClick={() => setOpenEngagementWizard(false)}><BsChevronLeft></BsChevronLeft>Back</div>
                            <div className="c-s-breadcrum-title">
                                <span className="pl-1 c-pointer" onClick={() => setOpenEngagementWizard(false)}>Smart Engagements / </span>
                                <span className="text-bold">Create Engagement</span>
                            </div>
                        </div>
                        <div className="c-s-step-sec mt-2 content-c">
                            {step === 'setGoals' ? <EStepper stepName="Set Goals" stepCount={1} thumbHide={true} /> :
                                step === 'targetAudience' ? <EStepper stepName="Target Audience" stepCount={2} thumbHide={true} /> :
                                    step === 'defineJourney' ? <EStepper stepName="Define Journey" stepCount={3} thumbHide={true} /> :
                                        step === 'rewardsAndBudget' ? <EStepper stepName="Rewards & Budget" stepCount={4} thumbHide={true} /> :
                                            step === 'review' ? <EStepper stepName="Review" stepCount={5} thumbHide={true} /> :
                                                null
                            }

                        </div>
                        <div className="c-s-content-sec w-100 float-left clearfix">
                            {step === 'setGoals' ? <SetGoals getSetGoalsFormValues={getSetGoalsFormValues} props={props} /> :
                                step === 'targetAudience' ? <TargetAudience props={props} handleLoader={(bool) => handleLoader(bool)} /> :
                                    step === 'defineJourney' ? <DefineJourney props={props} getDefineJourney={getDefineJourney} handleLoader={(bool) => handleLoader(bool)} /> :
                                        step === 'rewardsAndBudget' ? <RewardsAndBudget props={props} handleLoader={(bool) => handleLoader(bool)} handleAlertDialog={(obj) => handleAlertDialog(obj)} /> :
                                            step === 'review' ? <Review setStep={txt => setStep(txt)} /> :
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
