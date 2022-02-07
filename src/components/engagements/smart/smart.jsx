import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import createNotification from '../../common/reactNotification';
import { NotificationContainer } from 'react-notifications';
// import { Button, Modal } from 'react-bootstrap';
import 'react-notifications/lib/notifications.css';
import _ from 'lodash';
import './smart.css';
import { BsGrid3X3GapFill, BsCalendar, BsThreeDotsVertical, BsChevronLeft } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import classnames from 'classnames';
import { containerHeightCalcFn } from "../../common/global";
import CampaignBox from "../../common/campaignBox/campaignBox";
import SearchBar from "../../common/searchBar/searchBar";
import Table from "../../common/reactTable/table";
import SetGoals from "./setGoals/setGoals";
import TargetAudience from "./targetAudience/targetAudience";
import PreRequisiteRules from './prerequisites/prerequisiteRules';
import DefineJourney from "./defineJourney/defineJourney";
import RewardsAndBudget from "./rewardsAndBudget/rewardsAndBudget";
import EStepper from "./stepper/stepper";
import Review from "./review/review";
import { getAuthAndData, postAuthAndData } from '../../../api/ApiHelper';
import EngagementContextMenu from "../../common/reactTable/engagementMenu";
import GaugeChart from 'react-gauge-chart'
import { 
    SAVE_ENGAGEMENT, 
    DELETE_ENGAGEMENT, 
    ENGAGEMENTS_DETAILS_BY_ID, 
    ENGAGEMENT_UPDATE_STATUS, 
    ENGAGEMENT_BY_STATUS_ID, 
    ENGAGEMENTS_BY_FILTERS, 
    SOMETHING_WENT_WRONG 
} from '../../../api/apiConstants';
import store from '../../../store/store';

// function MyVerticallyCenteredModal(props) {

//     // let history = useHistory();
//     // const handleRoute=()=>{
//     //     history.push(`/`);
//     // }
//     return (
//       <Modal
//         {...props}
//         size="3g"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header>
//           <Modal.Title id="contained-modal-title-vcenter">
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//           You may have un saved data, do you want to cancel
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//         <Button onClick={props.onHide}>Yes</Button>
//           <Button onClick={props.onHide}>No</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }



export default function EngagementsSmart(props) {
    var history = useHistory();
    const [active, setActive] = useState('live');
    const [openEngagementWizard, setOpenEngagementWizard] = useState(false);
    const [updateEngagement, setUpdateEngagement] = useState(false);
    const [gridFlag, setGridFlag] = useState(true);
    const [step, setStep] = useState('setGoals');
    const [goalData, setGoalData] = useState({});
    const [defineSegment, setDefineSegment] = useState(null);
    const [definePurchaseRule, setDefinePurchaseRule] = useState(null);
    const [defineCost, setDefineCost] = useState(null);
    const [defineJourney, setDefineJourney] = useState(null);
    const [defineRewards, setDefineRewards] = useState(null);
    const [purchaseValue, setPurchaseValue] = useState(null);
    const [costToPlay, setCostToPlay] = useState(null);
    const [durationNum, setdurationNum] = useState(null);
    const engagement = store.getState().EngagementsSmartReducer;
    const preRulesData = engagement.preRules;
    const [modalShow, setModalShow] = React.useState(false);

    const updateFooter=()=>{
        setPurchaseValue(preRulesData?.purchaseValue);
        setCostToPlay(preRulesData?.costToPlay);
        setdurationNum(preRulesData?.durationNum);
    }

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

    const handleLoader = (showBool) => {
        props.routeActionHandler.dispatchLoaderData(showBool);
    }
    const handleAlertDialog = (obj) => {
        props.routeActionHandler.dispatchAlertDialogData(obj);
    }

    const createClick = () => {
        setOpenEngagementWizard(true);
        setUpdateEngagement(false);
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
        } else if (step === 'prerequisiteRules') {
            setStep('targetAudience');
        } else if(step === 'defineJourney'){
            setStep('prerequisiteRules');
        }else if (step === 'rewardsAndBudget') {
            setStep('defineJourney');
        } else if (step === 'review') {
            setStep('rewardsAndBudget');
        }
    }
    const stepsNextfn = () => {
        if (step === 'setGoals') {
            if (goalData.campaignName&&goalData.displayName) {
                if(goalData.isTournament){
                    let today=new Date();
                    today.setHours(0,0,0,0);
                    let start=new Date(goalData.startDate);
                    let startDT=goalData.startDate&&new Date(start.getFullYear(),start.getMonth(), start.getDate());
                    let end=new Date(goalData.endDate);
                    let endDT=goalData.endDate&&new Date(end.getFullYear(),end.getMonth(), end.getDate());
                    if(startDT&&endDT&&startDT>today&&endDT>startDT){
                        setStep('targetAudience');
                        goalData.EngagementId = props.setGoals?.EngagementId;
                        props.engagementsSmartActionHandler.dispatchSetGoalsData(goalData);
                    }else{
                        setStep('targetAudience');
                        createNotification('warning','Enter valid Tournament Dates')
                    }
                }else{
                    setStep('targetAudience');
                    goalData.EngagementId = props.setGoals?.EngagementId;
                    props.engagementsSmartActionHandler.dispatchSetGoalsData(goalData);
                }
            } else {
                createNotification('warning','Please Enter Campaign Name and Select Goal');
            }
        } else if(step === 'targetAudience'){
            if(defineSegment){
                setStep('prerequisiteRules');
            } else {
                createNotification('warning','Please Select Customer Segment');
            }
        }else if (step === 'prerequisiteRules') {
                // updateFooter();
            if(!defineCost||!defineCost.enable||(defineCost.enable&&defineCost.value)){
                if(!definePurchaseRule||!definePurchaseRule.enable||(definePurchaseRule.enable&&definePurchaseRule.value)){
                    setStep('defineJourney');
                }else{
                    createNotification('warning','Please Enter Purchase value');
                }
            }else{
                createNotification('warning','Please Enter Cost to Play value');
            }
        } else if (step === 'defineJourney') {
                setStep('rewardsAndBudget');
                updateFooter();
                props.engagementsSmartActionHandler.dispatchJourneyBoxData(defineJourney);
        } else if (step === 'rewardsAndBudget') {
            var filteredArr = defineRewards.filter(rew => rew.rewardType.value && rew.id && rew.rewardName && (goalData.isTournament||rew.probability) && rew.displayName&&(rew.rewardType?.value == 2 || rew.rewardValue));
            if(defineRewards&&defineRewards.length){
                if(filteredArr.length!=defineRewards.length){
                    createNotification('warning','Please enter complete details of rewards.')
                }else{
                    if(goalData.isTournament){
                        setStep('review');
                    }else{
                        var prob=0;
                        defineRewards.forEach(r=>{
                            prob+=parseInt(r.probability);
                        })
                        if(prob==100){
                            setStep('review');
                        } else {
                            createNotification('warning','Total Probability should be equal to 100')
                        }
                    }
                }
            } else {
                createNotification('warning','Please enter atleast one Reward details')
            }
        } else if (step === 'review') {
            handleAlertDialog({
                open: true, title: 'Save Engagement', text: 'The Engagement will go Live, Are you sure?', handleClose: (bool) => {
                    handleAlertDialog({ open: false, title: '', text: '', handleClose: () => { } });
                    if (bool) {
                        saveEngagement();
                    }
                }
            });
        }
    }
    
    const saveEngagement = () => {
        try {
            handleLoader(true);
            const targetAudienceData = props.targetAudience;
            const preRulesData = props.preRules;
            const goalData = props.setGoals;
            const journeyData = props.journeyBox;
            const rewardsAndBudget = props.rewardsAndBudget;

            let engagementObj = {};
            engagementObj.EngagementID = goalData.EngagementId || 0;
            engagementObj.CampaignName = goalData.campaignName;
            engagementObj.DisplayName = goalData.displayName;
            engagementObj.IsTournamentType=goalData?.isTournament;
            engagementObj.StatusID = goalData?.isTournament?4:1;
            engagementObj.CustomerSegmentID = targetAudienceData.segment_customers_id;
            engagementObj.JourneyID = journeyData?.id||0;
            engagementObj.StartDate=goalData.isTournament?goalData.startDate:new Date();
            engagementObj.EndDate=goalData.isTournament?goalData.endDate:new Date();
            engagementObj.PurchaseRule = {};
            if (preRulesData?.purchaseValue && preRulesData.durationNum) {
                engagementObj.PurchaseRule.Value = parseInt(preRulesData.purchaseValue);
                let daysType = preRulesData.daysType;
                let durationNum = parseInt(preRulesData.durationNum);
                let days = daysType === 'Week' ? durationNum * 7 : daysType === 'Month' ? durationNum * 30 : durationNum;
                engagementObj.PurchaseRule.NumberOfDays = days;
                engagementObj.PurchaseRule.PurchaseRuleID = preRulesData?.purchaseRuleId || 0
            }
            if(preRulesData?.costToPlay){
                engagementObj.CostToPlay=preRulesData.costToPlay;
            }

            engagementObj.Rewards = [];
            rewardsAndBudget?.rewards?.forEach(rewObj => {
                let rewardObj = {};
                rewardObj.EngagementRewardId = rewObj.engagementRewardId || 0
                rewardObj.WinPosition = rewObj.winnerPosition||0;
                rewardObj.NumberOfWinners = rewObj.numberOfWinners||0;
                rewardObj.DisplayName = rewObj.displayName;
                rewardObj.RewardType = rewObj.rewardType?.label;
                rewardObj.Probability = rewObj.probability||0;
                rewardObj.RewardMasterID = rewObj.id || 0;
                rewardObj.Value = rewObj.rewardValue || null;
                engagementObj.Rewards.push(rewardObj);
            })

            engagementObj.Budget = goalData.isTournament?0:parseInt(rewardsAndBudget?.budget || '0');
            engagementObj.BudgetDays = goalData.isTournament?0:parseInt(rewardsAndBudget?.budgetDuration || '0');
            
            console.log('***',engagementObj);
            postAuthAndData(SAVE_ENGAGEMENT, engagementObj, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        setOpenEngagementWizard(false);
                        setUpdateEngagement(false);
                        setStep('setGoals');
                        
                        createEngagementDataClear();
                        createNotification('success', 'Engagement Saved Succesfully');
                        tabClick('live');
                        fetchEngagementsByStatus(1);//1 is for Active Engagements
                    } else {
                        createNotification('error', 'Engagement Saving failed');
                    }
                    handleLoader(false);
                });
        } catch (error) {
            handleLoader(false);
            createNotification('error', 'Something went wrong!');
        }
    }

    const createEngagementDataClear = () => {
        props.engagementsSmartActionHandler.dispatchSetGoalsData(null);
        props.engagementsSmartActionHandler.dispatchTargetAudienceData(null);
        props.engagementsSmartActionHandler.dispatchPreRules(null);
        props.engagementsSmartActionHandler.dispatchJourneyBoxData(null);
        props.engagementsSmartActionHandler.dispatchRewardsAndBudgetData(null);
    }

    const getSetGoalsData = data => {
        setGoalData(data);
    }
    const getDefineJourney = (data) => {
        setDefineJourney(data);
    }

    const fetchEngagements = () => {
        try {
            handleLoader(true);
            getAuthAndData(ENGAGEMENTS_BY_FILTERS, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        props.engagementsSmartActionHandler.dispatchEngagementsData(res.data);
                    } else {
                        props.engagementsSmartActionHandler.dispatchEngagementsData();
                    }
                    handleLoader(false);
                })
        } catch (error) {
            handleLoader(false);
        }
    }
    const fetchEngagementsByStatus = (id => {
        handleLoader(true);
        getAuthAndData(`${ENGAGEMENT_BY_STATUS_ID}${id}`, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    props.engagementsSmartActionHandler.dispatchEngagementsData(res.data);
                } else {
                    createNotification('info','There are No Campaigns')
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
        handleAlertDialog({
            open: true, title: 'Pause Engagement', text: 'Do you want to Pause Engagement?', handleClose: (bool) => {
                handleAlertDialog({ open: false, title: '', text: '', handleClose: () => { } });
                if (bool) {
                    getAuthAndData(`${ENGAGEMENT_UPDATE_STATUS}${engmt.EngagementID}&engagement_status_id=${status}`, history)
                    .then((res) => {
                        if (handleResponseCode(res)) {
                            tabClick(active);
                        }
                        handleLoader(false);
                    })
                }
            }
        });
    }
    const onEditClick = (engmt) => {
        console.log('***',engmt)
        handleLoader(true);
        getAuthAndData(`${ENGAGEMENTS_DETAILS_BY_ID}${engmt.EngagementID}`, history)
            .then(res => {
                console.log('***',res);
                if (handleResponseCode(res)) {
                    let engagement=res.data;
                    let setGoals = {
                        EngagementId: engagement.EngagementID,
                        campaignName: engagement.ShortName,
                        displayName: engagement.DisplayName,
                        isTournament:engagement.IsTournamentType,
                        startDate:new Date(engagement.StartDate),
                        endDate:new Date(engagement.EndDate),
                        goal: {
                            id: 1,
                            isActive: true,
                            desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                            heading: "Increase sales volume"
                        }
                    }
                    setGoalData(setGoals);
                    let targetAudience = {
                        targetAudience: engagement.CustomerSegmentID,
                        purchaseRuleId: engagement.PurchaseRule?.PurchaseRuleID,
                        purchaseValue: engagement.PurchaseRule?.PurchaseValue,
                        durationNum: engagement.PurchaseRule?.LastNumberOfDays,
                        daysType: 'days'
                    }
                    let journeyObj = {
                        id: engagement.JourneyID,
                        tags: [],
                        isActive: false
                    }
                    setDefineJourney(journeyObj);

                    let rewardArr = [];
                    if (Array.isArray(engagement.Rewards)) {
                        engagement.Rewards.forEach(rew => {
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
                        budget: engagement.Budget,
                        budgetDuration: engagement.BudgetDays
                    }

                    props.engagementsSmartActionHandler.dispatchSetGoalsData(setGoals);
                    props.engagementsSmartActionHandler.dispatchTargetAudienceData(targetAudience);
                    props.engagementsSmartActionHandler.dispatchJourneyBoxData(journeyObj);
                    props.engagementsSmartActionHandler.dispatchRewardsAndBudgetData(rewardsAndBudget);
                    setOpenEngagementWizard(true);
                    setUpdateEngagement(true);
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
                        .then(res => {
                            if (handleResponseCode(res)) {
                                tabClick(active);
                                // console.log(`*** ${engmt.EngagementID} Engagement is deleted successfully`)
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

    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG+ ' in Smart Engagements');
            return false;
        }else{
            return true;
        }
    }

    useEffect(() => {
        // fetchEngagements();// for all Engagements
        fetchEngagementsByStatus(1);//1 is for Active Engagements
    
        return () => {
            createEngagementDataClear();
        }
    }, []);

    const selectedRowsFn = (selectedRows) => {
        console.log('****selectedRows', selectedRows);
    }

    return (
        <div id="engagements-smart-container">
            <NotificationContainer/>
            {!openEngagementWizard ?
                <Fragment>
                    <div className="mb-4">
                        {/* <span className="e-s-heading">Active Campaigns</span> */}
                        <span className="float-right mr-3">
                            <AiOutlineMenu className={`c-pointer ${!gridFlag ? `e-s-switch` : ``}`} onClick={() => setGridFlag(false)} style={{ width: "22px", height: "22px" }}></AiOutlineMenu>
                            <BsGrid3X3GapFill className={`c-pointer ml-3 ${gridFlag ? `e-s-switch` : ``}`} onClick={() => setGridFlag(true)} style={{ width: "22px", height: "22px" }}></BsGrid3X3GapFill>
                        </span>
                    </div>
                    <div>
                        {/* <div onClick={() => tabClick('all')} className={`e-s-tab ${active === 'all' ? `e-s-tab-active` : ``}`}>All</div> */}
                        <div onClick={() => tabClick('live')} className={`e-s-tab ${active === 'live' ? `e-s-tab-active` : ``}`}>Active</div>
                        <div onClick={() => tabClick('paused')} className={`e-s-tab ${active === 'paused' ? `e-s-tab-active` : ``}`}>Paused</div>
                        <div onClick={() => tabClick('upcoming')} className={`e-s-tab ${active === 'upcoming' ? `e-s-tab-active` : ``}`}>Upcoming</div>
                        <div onClick={() => tabClick('completed')} className={`e-s-tab ${active === 'completed' ? `e-s-tab-active` : ``}`}>Completed</div>
                        <div className="btn-create-engagement float-right text-center pt-2 mr-3" onClick={createClick}>
                            <span className="btn-c-e-text">+ Create Engagements</span>
                        </div>
                        {gridFlag ? 
                            <div className="w-100 float-left clearfix mt-3">
                                {(props.campaignsData && props.campaignsData.length > 0)?
                                    <CampaignBox
                                        props={props}
                                        campaigndata={props.campaignsData}
                                        onPauseClick={(engmt, status) => onPauseClick(engmt, status)}
                                        onEditClick={(engmt) => onEditClick(engmt)}
                                        onViewReportClick={(engmt) => onViewReportClick(engmt)}
                                        onDeleteClick={(engmt) => onDeleteClick(engmt)}
                                    >
                                    </CampaignBox>
                                    :
                                    <h4 claassName='no-engagements'></h4>
                                }
                            </div>
                            : 
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
                        }
                    </div>
                </Fragment>
                :
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
                                    step === 'prerequisiteRules' ? <EStepper stepName="Prerequisite Rules" stepCount={3} thumbHide={true} /> :
                                        step === 'defineJourney' ? <EStepper stepName="Define Journey" stepCount={4} thumbHide={true} /> :
                                            step === 'rewardsAndBudget' ? <EStepper stepName="Rewards & Budget" stepCount={5} thumbHide={true} /> :
                                                step === 'review' ? <EStepper stepName="Review" stepCount={6} thumbHide={true} /> :
                                                    null
                            }

                        </div>
                        <div className="c-s-content-sec w-100 float-left clearfix">
                            {step === 'setGoals' ? <SetGoals getSetGoalsData={getSetGoalsData} props={props} updateEngagement={updateEngagement}/> :
                                step === 'targetAudience' ? <TargetAudience props={props} setDefineSegment={(data)=>setDefineSegment(data)} handleLoader={(bool) => handleLoader(bool)} /> :
                                    step === 'prerequisiteRules' ? <PreRequisiteRules props={props} setDefinePurchaseRule={data=>setDefinePurchaseRule(data)} setDefineCost={data=>setDefineCost(data)}  updateEngagement={updateEngagement} handleLoader={(bool) => handleLoader(bool)} /> :
                                        step === 'defineJourney' ? <DefineJourney props={props} getDefineJourney={getDefineJourney} handleLoader={(bool) => handleLoader(bool)} /> :
                                            step === 'rewardsAndBudget' ? <RewardsAndBudget props={props} setDefineRewards={(data)=>setDefineRewards(data)} handleLoader={(bool) => handleLoader(bool)} handleAlertDialog={(obj) => handleAlertDialog(obj)} /> :
                                                step === 'review' ? <Review setStep={txt => setStep(txt)} /> :
                                                    null
                            }
                        </div>
                    </div>
                    <div id="c-s-action-sec" className="w-100">
                            <div className='float-left w-12' >
                                <GaugeChart 
                                    textColor="blue"
                                    animate={false} 
                                    arcWidth={0.1} 
                                    percent={1.0}
                                    hideText={true}
                                />
                                <div className="f-14 text-center">Excellent</div>
                            </div>
                        <div className='float-right w-70' style={{fontSize:'12px',fontFamily:'Roboto',marginLeft:'10%',marginBottom:'2%'}}>
                            <div className="float-left w-70">
                                {props.targetAudience?.segment_name &&<div><span className="text-bold text-u f-20">Segment Name : </span>{props.targetAudience?.segment_name}</div>}
                                {purchaseValue&& <div>
                                    <span className="text-bold text-u f-20">Purchase Value : </span>
                                    {purchaseValue &&`Purchase value should be greaterthan or equal to ${purchaseValue } in last ${durationNum} Days`}
                                </div>}
                                {costToPlay && <div><span className="text-bold text-u f-20">Cost to Play : </span> {costToPlay} </div>}
                            </div>
                            <div className="float-right w-30">
                                <button type="button" className="c-s-btn-approve ml-3 float-right" onClick={stepsNextfn}>
                                    {step === 'review' ? 'Approve' : 'Next'}
                                </button>
                                <button type="button" className="c-s-btn-back float-right" onClick={stepsBackfn}>Back</button>
                                {/* <button type="button"  className="c-s-btn-back float-right" onClick={() => setModalShow(true)}>
                                   Cancel
                                </button> */}
                                {/* <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                /> */}
                            </div>
                        </div>
                        
                    </div>
                    <button className="c-s-btn-back float-right-1" >Cancel</button>
                </Fragment>
            }
        </div>
    )
}
