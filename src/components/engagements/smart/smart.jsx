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
import store from "../../../store/store";
import './smart.css';
import { getData, postData } from '../../../api/ApiHelper';
import Loader from '../../common/Spinner/spinner';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function EngagementsSmart(props) {
    console.log('****', props);
    const [active, setActive] = useState('all');
    const [campaigndata, setCampaigndata] = useState();
    const [createFlag, setCreateFlag] = useState(false);
    const [gridFlag, setGridFlag] = useState(true);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [step, setStep] = useState('setGoals');
    const [goalDataForm, setGoalDataForm] = useState(null);
    const [goalData, setGoalData] = useState({});
    const [defineJourney, setDefineJourney] = useState(null);
    const [loading, setLoading] = useState(false);

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
                props.engagementsSmartActionHandler.dispatchDefineJourneyData(defineJourney);
            }
        } else if (step === 'rewardsAndBudget') {
            setStep('review');
        } else if (step === 'review') {
            createEngagementDataClear();
            setCreateFlag(false);
            setStep('setGoals');
        }
    }

    const createEngagementDataClear = () => {
        props.engagementsSmartActionHandler.dispatchSetGoalsData(null);
        props.engagementsSmartActionHandler.dispatchDefineJourneyData(null);
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
                        props.engagementsSmartActionHandler.dispatchEngagementsData(engmentsArr);
                        //setCampaigndata(engmentsArr);
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
                    props.engagementsSmartActionHandler.dispatchEngagementsData(engmentsArr);
                    //setCampaigndata(engmentsArr);
                    setLoading(false);
                } else {
                    props.engagementsSmartActionHandler.dispatchEngagementsData();
                    //setCampaigndata();
                    setLoading(false);
                }
            })
    })

    useEffect(() => {
        fetchEngagements();
        return () => {
            createEngagementDataClear();
        }
    }, []);

    const selectedRowsFn = (selectedRows) => {
        console.log('selectedRows', selectedRows);
    }

    return (
        <div id="engagements-smart-container">
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
                                    {props.campaignsData && props.campaignsData.length > 0 ? (
                                        <CampaignBox campaigndata={props.campaignsData}></CampaignBox>
                                    ) : <div className="e-s-heading ml-4">No campaigns found!</div>}
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
                                {step === 'setGoals' ? <SetGoals getSetGoalsFormValues={getSetGoalsFormValues} /> :
                                    step === 'targetAudience' ? <TargetAudience /> :
                                        step === 'defineJourney' ? <DefineJourney getDefineJourney={getDefineJourney} setLoading={(bool) => setLoading(bool)} /> :
                                            step === 'rewardsAndBudget' ? <RewardsAndBudget /> :
                                                step === 'review' ? <Review /> :
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
