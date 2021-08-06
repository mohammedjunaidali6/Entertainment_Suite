import React, { useState, Fragment, useEffect } from 'react';
import { BUDGET_MIN, BUDGET_DEFAULT, BUDGET_MAX, BUDGET_DURATION_DEFAULT, BUDGET_DURATION_MIN, BUDGET_DURATION_MAX } from "../../../../constants/globalConstants";
import Table from "../../../common/reactTable/table";
import ActionMenu from "../../../common/reactTable/menu";
import { BsThreeDotsVertical, BsFillTrashFill } from 'react-icons/bs';
import info from '../../../../assets/img/info.png';
import Tooltip from '@material-ui/core/Tooltip';
import plus_src from "../../../../assets/img/add_gray.svg";
import trash_src from "../../../../assets/img/trash.png";
import _ from "lodash";
import Resizer from "../../../common/resizer/resizer";
import './rewardsAndBudget.css';
import { getAuthAndData, getData, postData } from '../../../../api/ApiHelper';
import Select from 'react-select';
import { REWARD_TYPES, REWARD_BY_FILTERS, REWARDS } from '../../../../api/apiConstants';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(10),
        border: '1px solid #dadde9',
    },
}))(Tooltip);


export const rbColumns = [
    {
        name: "Winner Position",
        selector: "winnerPosition"
    },
    {
        name: "Reward Type",
        selector: "rewardType"
    },
    {
        name: "Reward Value",
        selector: "rewardValue"
    },
    // {
    //     name: "Product Category",
    //     selector: "productCategory"
    // },
    {
        name: "Probability",
        selector: "probability"
    },
    {
        name: "Display Name",
        selector: "displayName"
    },
    {
        name: "Action",
        cell: action => <ActionMenu />
    }
];

export const rbData = [
    {
        id: 1,
        winnerPosition: "First Prize",
        rewardType: "Point Coupons",
        rewardValue: 500,
        productCategory: "Category",
        probability: "20%",
        displayName: "Get 500 Points"
    },
    {
        id: 2,
        winnerPosition: "Second Prize",
        rewardType: "Point Coupons",
        rewardValue: 300,
        productCategory: "Category",
        probability: "20%",
        displayName: "Get 300 Points"
    },
    {
        id: 3,
        winnerPosition: "Third Prize",
        rewardType: "Coupons",
        rewardValue: 200,
        productCategory: "Category",
        probability: "20%",
        displayName: "Get 200 Points"
    },
    {
        id: 4,
        winnerPosition: "Fourth Prize",
        rewardType: "Coupons",
        rewardValue: 100,
        productCategory: "Category",
        probability: "20%",
        displayName: "Get 100 Points"
    }
];

const arrayRewards = [
    { winnerPosition: 1, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '' },
    { winnerPosition: 2, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '' },
    { winnerPosition: 3, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '' },
    { winnerPosition: 4, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '' },
    { winnerPosition: 5, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '' },
]

export default function RewardsAndBudget(props) {
    var history = useHistory();
    const rewardsAndBudgetData = props.props.rewardsAndBudget;
    const [rewardRowsData, setRewardRowsData] = useState(rewardsAndBudgetData?.rewards || arrayRewards);
    const [rewardTypes, setRewardTypes] = useState([]);
    const [rewardInfo, setRewardInfo] = useState({ reward_code: '', description: '', expiry_date: '' });
    const [rewardsData, setRewardsData] = useState(rewardsAndBudgetData?.rewards || []);
    const [budget, setBudget] = useState(rewardsAndBudgetData?.budget ?? BUDGET_DEFAULT);
    const [budgetDuration, setBudgetDuration] = useState(rewardsAndBudgetData?.budgetDuration ?? BUDGET_DURATION_DEFAULT);


    const fetchRewards = () => {
        props.handleLoader(true);
        getAuthAndData(REWARD_BY_FILTERS, history)
            .then(response => {
                if (response && Array.isArray(response.data?.data)) {
                    let rewardArr = [];
                    response.data.data.forEach(rew => {
                        let rewardObj = {}
                        rewardObj.id = rew.reward_master_id;
                        rewardObj.winnerPosition = rew.win_position;
                        rewardObj.rewardType = rew.reward_type;
                        rewardObj.rewardValue = rew.Value;
                        rewardObj.probability = rew.probability;
                        rewardObj.displayName = rew.display_name;
                        rewardArr.push(rewardObj);
                    });
                    setRewardsData(rewardArr);
                } else {
                    setRewardsData();
                }
                props.handleLoader(false);
            })
    }
    const fetchRewardTypes = () => {
        props.handleLoader(true);
        getAuthAndData(REWARD_TYPES, history)
            .then(rewardTypes => {
                var rewardTypeOptions = [];
                if (rewardTypes?.length) {
                    rewardTypes.forEach(rewType => {
                        let option = {
                            value: rewType.reward_type_id,
                            label: rewType.reward_type
                        }
                        rewardTypeOptions.push(option);
                    })
                    setRewardTypes(rewardTypeOptions);
                }
                props.handleLoader(false);
            })
    }

    const onRewardRowChange = (e, obj) => {
        var arr = [...rewardRowsData];
        // if (e.target.name === 'probability') {
        //     var totalProb = arr.reduce((tot, o) => tot + parseInt(o.probability || 0), parseInt(e.target.value || 0));
        //     console.log('****', e.target.value, totalProb)
        //     if (totalProb > 100) {
        //         props.handleAlertDialog({
        //             open: true, text: 'The total probability should be 100% only', handleClose: (bool) => {
        //                 props.handleAlertDialog({ open: false, handleClose: (bool) => { } })
        //             }
        //         });
        //     } else {
        //         obj[e.target.name] = e.target.value;
        //     }
        // } else {
        obj[e.target.name] = e.target.value;
        // }
        arr.splice(_.findIndex(arr, obj), 1, obj);
        setRewardRowsData(arr);
    }
    const onRewardTypeSelect = (e, obj) => {
        props.handleLoader(true);
        getAuthAndData(`${REWARDS}${e.value}`, history)
            .then(rewards => {
                if (Array.isArray(rewards)) {
                    obj.rewardName = rewards[0].reward_name;
                    obj.rewardType = e;
                    obj.id = rewards[0].reward_master_id;
                    var arr = [...rewardRowsData];
                    arr.splice(_.findIndex(arr, obj), 1, obj);
                    setRewardRowsData(arr);
                    setRewardInfo(rewards[0])
                }
                props.handleLoader(false);
            })
    }
    const onProbabilityBlur = () => {
        var arr = [...rewardRowsData];
        var totalProb = arr.reduce((tot, o) => tot + parseInt(o.probability || 0), 0);
        if (totalProb > 100)
            props.handleAlertDialog({
                open: true, text: 'The total probability should be 100% only', handleClose: (bool) => {
                    props.handleAlertDialog({ open: false, handleClose: (bool) => { } })
                }
            });
    }
    const removeRow = index => {
        var array = [...rewardRowsData];
        array.splice(index, 1);
        setRewardRowsData(array);
    }
    const addRow = () => {
        var arr = [...rewardRowsData];
        var obj = { winnerPosition: arr.length + 1, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '' };
        arr.push(obj);
        setRewardRowsData(arr);
    }

    useEffect(() => {
        // if (!Array.isArray(rewardsAndBudgetData?.rewards)) {
        //     fetchRewards();
        // }
        fetchRewardTypes();
    }, []);
    useEffect(() => {
        return () => {
            var filterArr = [...rewardRowsData];
            var filteredArr = filterArr.filter(rew => rew.rewardType.value && rew.id && rew.rewardName && rew.probability && (rew.rewardType?.value == 2 || rew.rewardValue));
            let rewardsAndBudget = {
                rewards: filteredArr || [],
                budget: budget,
                budgetDuration: budgetDuration
            }
            props.props.engagementsSmartActionHandler.dispatchRewardsAndBudgetData(rewardsAndBudget)
        }
    }, [budget, budgetDuration, rewardRowsData])

    return (
        <Fragment>
            <div id="rewards-budget-container" >
                {/* <div className="r-b-h">Rewards and Budget</div> */}
                <Fragment>
                    {/* <div className="r-b-table-sec">
                                <Table columns={rbColumns} data={rewardsData} noTableHead={false} />
                            </div> */}
                    {/* {!addReward ? ( */}
                    {/* <div>
                                <div className="r-b-add-reward" onClick={() => setAddReward(true)}>
                                    <img src={plus_src} alt="Plus" className="r-b-add-reward-img" />
                                    <span className="r-b-add-reward-text">Add Reward</span>
                                </div>
                            </div> */}
                    {/* ) : (  */}
                    <div className="add-reward-sec w-100 float-left clearfix">
                        {/* <div className="r-b-addreward-h w-100 float-left clearfix">Add new reward</div> */}
                        {rewardRowsData.map((obj, i) =>
                            <div id={i} className="r-b-addreward-top w-100 float-left clearfix">
                                <div className="w-10 float-left clearfix">
                                    <div className="w-100 float-left clearfix">
                                        <div className="w-100 float-left clearfix r-b-ar-i-h">Winner Position</div>
                                        <div className="w-90 float-left clearfix">
                                            <input type="number" name='winnerPosition' onChange={(e) => onRewardRowChange(e, obj)} value={obj.winnerPosition} placeholder="0" className=" r-b-ar-i" style={{ textAlign: 'center' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-15 float-left clearfix">
                                    <div className="w-100 float-left clearfix">
                                        <div className="w-100 float-left clearfix r-b-ar-i-h">Reward Type</div>
                                        <Select options={rewardTypes} name='rewardType' onChange={(e) => onRewardTypeSelect(e, obj)} value={obj.rewardType} className="w-95 float-left clearfix" />
                                        {/* <div className="w-94 float-left clearfix">
                                                    <input type="text" placeholder="Select" className=" r-b-ar-i" />
                                            </div> */}
                                    </div>
                                </div>
                                <div className="w-20 float-left clearfix">
                                    <div className="w-100 float-left clearfix">
                                        <div className="w-100 float-left clearfix r-b-ar-i-h">
                                            <span className='mr-4'>Reward Name</span>
                                            <HtmlTooltip
                                                title={
                                                    <Fragment>
                                                        <p>{`Coupon code: ${rewardInfo.reward_code || ''}`}</p>
                                                        <p>{`Description: ${rewardInfo.description || ''}`}</p>
                                                        <p>{`Expired on: ${new Date(rewardInfo.expiry_date).toLocaleDateString()}`}</p>
                                                    </Fragment>
                                                }
                                                placement='top'
                                            >
                                                <img src={info} style={{ height: '20px', width: '20px' }} />
                                            </HtmlTooltip>

                                            {/* <Tooltip title={rewardTooltipTitle} arrow placement='top'>
                                                <img src={info} style={{ height: '20px', width: '20px' }} />
                                            </Tooltip> */}
                                        </div>
                                        <div className="w-90 float-left clearfix">
                                            <div className='r-b-ar-i pt-2'>{obj.rewardName}</div>
                                            {/* <input type="number" name='rewardName' onChange={(e) => onRewardRowChange(e, obj)} value={obj.rewardName} placeholder="0" className=" r-b-ar-i" style={{ textAlign: 'center' }} /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-8 float-left clearfix">
                                    <div className="w-100 float-left clearfix">
                                        <div className="w-100 float-left clearfix r-b-ar-i-h">Value</div>
                                        <div className="w-90 float-left clearfix">
                                            <input type="number" name='rewardValue' onChange={(e) => onRewardRowChange(e, obj)} value={obj.rewardValue} disabled={obj.rewardType?.value == 2} placeholder="0" className=" r-b-ar-i" style={{ textAlign: 'center' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* </div> */}
                                {/*<div className="r-b-addreward-bottom w-100 float-left clearfix"> */}
                                < div className="w-8 float-left clearfix" >
                                    <div className="w-100 float-left clearfix ">
                                        <div className="w-100 float-left clearfix r-b-ar-i-h">Probability</div>
                                        <div className="w-90 float-left clearfix">
                                            <input type="number" name='probability' onChange={(e) => onRewardRowChange(e, obj)} onBlur={(obj) => onProbabilityBlur(obj)} value={obj.probability} placeholder="0%" className=" r-b-ar-i" style={{ textAlign: 'center' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-28 float-left clearfix">
                                    <div className="w-100 float-left clearfix">
                                        <div className="w-100 float-left clearfix r-b-ar-i-h">Display To Customer</div>
                                        <div className="w-97 float-left clearfix">
                                            <input type="text" name='displayName' onChange={(e) => onRewardRowChange(e, obj)} value={obj.displayName} placeholder="Display Name" className=" r-b-ar-i" />
                                        </div>
                                    </div>
                                </div>
                                <div role="button" className="w-5 mt-4 float-left clearfix" onClick={() => removeRow(i)}>
                                    <img src={trash_src} alt='Remove' style={{ height: '20px', width: '20px' }} />
                                    {/* <BsFillTrashFill style={{ height: '20px', width: '20px' }} /> */}
                                </div>
                            </div>
                        )}
                        <div className="r-b-addreward-btns float-left r-b-add-reward clearfix" onClick={addRow}>
                            <img src={plus_src} alt="Plus" className="r-b-add-reward-img" />
                            <span className="r-b-add-reward-text">Add Reward</span>
                        </div>
                        {/* <div className="r-b-addreward-btns w-100 float-left text-right clearfix">
                                    <div className="r-b-addreward-s float-right clearfix" onClick={() => setAddReward(false)}>Add</div>
                                    <div className="r-b-addreward-c float-right clearfix" onClick={() => setAddReward(false)}>Cancel</div>
                                </div> */}
                    </div>
                </Fragment>
            </div >
            <div className="b-d-sec w-100 float-left clearfix">
                <div className="w-45 float-left clearfix">
                    <div className="b-d-h w-100 float-left clearfix">Budget</div>
                    <div className="b-d-content w-100 float-left clearfix">
                        <div className="b-d-content-h w-100 float-left clearfix">Daily Budget</div>
                        <div className="w-100 float-left clearfix">
                            <Resizer
                                minSize={BUDGET_MIN}
                                maxSize={BUDGET_MAX}
                                initialSize={budget}
                                id='budgetResizer'
                                valText=''
                                updateBudget={budget => setBudget(budget)}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-10 float-left clearfix"></div>
                <div className="w-45 float-right clearfix">
                    <div className="b-d-h">Duration</div>
                    <div className="b-d-content">
                        <div className="b-d-content-h">Number of Days</div>
                        <div className="w-100 float-left clearfix">
                            <Resizer
                                minSize={BUDGET_DURATION_MIN}
                                maxSize={BUDGET_DURATION_MAX}
                                initialSize={budgetDuration}
                                id='daysResizer'
                                valText='Days'
                                updateBudgetDuration={duration => setBudgetDuration(duration)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}