import React, { useState, Fragment, useEffect } from 'react';
import { BUDGET_MIN, BUDGET_DEFAULT, BUDGET_MAX, BUDGET_DURATION_DEFAULT, BUDGET_DURATION_MIN, BUDGET_DURATION_MAX } from "../../../../constants/globalConstants";
import ActionMenu from "../../../common/reactTable/menu";
import info from '../../../../assets/img/info.png';
import Tooltip from '@material-ui/core/Tooltip';
import plus_src from "../../../../assets/img/add_gray.svg";
import trash_src from "../../../../assets/img/trash.png";
import _ from "lodash";
import Resizer from "../../../common/resizer/resizer";
import './rewardsAndBudget.css';
import { getAuthAndData, getData, postData } from '../../../../api/ApiHelper';
import Select from 'react-select';
import { REWARD_TYPES, REWARD_BY_FILTERS, REWARDS, SOMETHING_WENT_WRONG } from '../../../../api/apiConstants';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import createNotification from '../../../common/reactNotification';

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
    { winnerPosition: 1, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '',tooltip:{ reward_code: '', description: '', expiry_date: '' } },
    { winnerPosition: 2, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '',tooltip:{ reward_code: '', description: '', expiry_date: '' } },
    { winnerPosition: 3, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '',tooltip:{ reward_code: '', description: '', expiry_date: '' } },
    { winnerPosition: 4, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '',tooltip:{ reward_code: '', description: '', expiry_date: '' } },
    { winnerPosition: 5, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '',tooltip:{ reward_code: '', description: '', expiry_date: '' } },
]

export default function RewardsAndBudget(props) {
    var history = useHistory();
    const rewardsAndBudgetData = props.props.rewardsAndBudget;
    console.log('**',rewardsAndBudgetData)
    const [rewardRowsData, setRewardRowsData] = useState(rewardsAndBudgetData?.rewards || arrayRewards);
    const [rewardTypes, setRewardTypes] = useState([]);
    const [rewardNames, setRewardNames] = useState([]);
    const [rewardMaster, setRewardMaster] = useState([]);
    const [selectedRewardName, setSelectedRewardName] = useState([]);
    const [rewardsData, setRewardsData] = useState(rewardsAndBudgetData?.rewards || []);
    const [budget, setBudget] = useState(rewardsAndBudgetData?.budget || BUDGET_DEFAULT);
    const [budgetDuration, setBudgetDuration] = useState(rewardsAndBudgetData?.budgetDuration || BUDGET_DURATION_DEFAULT);


    const fetchRewards = () => {
        props.handleLoader(true);
        getAuthAndData(REWARD_BY_FILTERS, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    let rewardArr = [];
                    res.data.forEach(rew => {
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
            .then(res => {
                var rewardTypeOptions = [];
                if (handleResponseCode(res)) {
                    res.data.forEach(rewType => {
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
        obj[e.target.name] = e.target.value;
        arr.splice(_.findIndex(arr, obj), 1, obj);
        setRewardRowsData(arr);
    }
    const onRewardTypeSelect = (e, obj) => {
        props.handleLoader(true);
        getAuthAndData(`${REWARDS}${e.value}`, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    obj.rewardName = res.data[0].reward_name;
                    obj.rewardType = e
                    obj.id = res.data[0].reward_master_id;
                    obj.tooltip={
                        reward_code:res.data[0].reward_code,
                        description:res.data[0].description,
                        expiry_date:res.data[0].expiry_date,
                    }
                    var arr = [...rewardRowsData];
                    arr.splice(_.findIndex(arr, obj), 1, obj);
                    setSelectedRewardName({
                        value:obj.id,
                        label:obj.rewardName
                    })
                    setRewardRowsData(arr);
                }
                props.handleLoader(false);
            })
    }
    const onRewardNameChange=(e,i)=>{
        var obj=rewardMaster.find(r=>r.reward_master_id==e.value);
        var objData=rewardRowsData[i];
        objData.tooltip.reward_code=obj.reward_code;
        objData.tooltip.description=obj.description;
        objData.tooltip.expiry_date=obj.expiry_date;
        objData.rewardName = e.label;
        objData.id = e.value;
        var arr = [...rewardRowsData];
        arr.splice(i, 1, objData);
        setSelectedRewardName({
            value:objData.reward_master_id,
            label:objData.reward_name
        })
        setRewardRowsData(arr);
    }

    const onProbabilityBlur = (e) => {
        var arr = [...rewardRowsData];
        var totalProb = arr.reduce((tot, o) => tot + parseInt(o.probability || 0), 0);
        // if (totalProb > 100)
        //     props.handleAlertDialog({
        //         open: true, text: 'The total probability should be 100% only', handleClose: (bool) => {
        //             props.handleAlertDialog({ open: false, handleClose: (bool) => { } })
        //             e.target.value='';
        //         }
        //     });
    }
    const removeRow = index => {
        props.handleAlertDialog({
            open: true, text: 'Are you Sure, you want to delete a Reward?', handleClose: (bool) => {
                props.handleAlertDialog({ open: false, handleClose: (bool) => { } })
                if(bool){
                    var array = [...rewardRowsData];
                    array.splice(index, 1);
                    setRewardRowsData(array);
                }
            }
        });
    }
    const addRow = () => {
        var arr = [...rewardRowsData];
        var obj = { winnerPosition: arr.length + 1, rewardType: { label: 'Select', value: '' }, id: '', rewardName: '', rewardValue: '', probability: '', displayName: '',tooltip:{ reward_code: '', description: '', expiry_date: '' }  };
        arr.push(obj);
        setRewardRowsData(arr);
    }

    const fetchAllRewards=()=>{
        getAuthAndData(`/engt/allRewards?reward_type_id=2`, history)
        .then(res=>{
            if (handleResponseCode(res)) {
                setRewardMaster(res.data);
                var rewardNameOptions = [];
                res.data.forEach(rew=>{
                    let obj={
                        value:rew.reward_master_id,
                        label:rew.reward_name
                    }
                    rewardNameOptions.push(obj);
                });
                setRewardNames(rewardNameOptions);
            }
        });
    }
    useEffect(() => {
        fetchRewardTypes();
        fetchAllRewards();
    }, []);
    useEffect(() => {

        props.setDefineRewards(rewardRowsData.filter(r=>r.id!==''));

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
    
    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG+ 'in Rewards and Budget');
            return false;
        }else{
            return true;
        }
    }

    return (
        <Fragment>
            <div id="rewards-budget-container" >
                <Fragment>
                    <div className="add-reward-sec w-100 float-left clearfix">
                        {rewardRowsData.map((obj, i) =>
                            <div id={i} className="r-b-addreward-top w-100 float-left clearfix">
                                <div className="w-10 float-left clearfix mr-1">
                                    <div className="w-100 float-left clearfix"  style={{fontSize:'12px'}}>
                                        {i==0&&<div className="r-b-ar-i-h">Reward Number</div>}
                                            <input type="number" name='winnerPosition' onChange={(e) => onRewardRowChange(e, obj)} value={obj.winnerPosition} placeholder="0" className=" r-b-ar-i" style={{ textAlign: 'center' }} />
                                    </div>
                                </div>
                                <div className="w-15 float-left clearfix">
                                    <div className="w-100 float-left clearfix mr-1" style={{fontSize:'12px'}}>
                                        {i==0&&<div className="r-b-ar-i-h">Reward Type</div>}
                                        <Select 
                                            options={rewardTypes} 
                                            name='rewardType' 
                                            onChange={(e) => onRewardTypeSelect(e, obj)} 
                                            value={obj.rewardType} 
                                            style={{lineHeight:'28px'}}
                                        />
                                    </div>
                                </div>
                                <div className="w-24 float-left clearfix mr-1">
                                    <div className="w-100 float-left clearfix"  style={{fontSize:'12px'}}>
                                        <div className="r-b-ar-i-h">
                                            {i==0&&<span className='mr-4'>Reward Name</span>}
                                        </div>
                                        <Select 
                                            options={obj.rewardType?.value==2?rewardNames:[]} 
                                            isDisabled={obj.rewardType?.value!==2} 
                                            name='rewardName' 
                                            onChange={(e) => onRewardNameChange(e,i)}
                                            value={{
                                                label:obj.rewardName,
                                                value:obj.id
                                            }}
                                            style={{lineHeight:'28px'}}
                                        />
                                        <HtmlTooltip
                                            title={
                                                <Fragment>
                                                    <p>{`Coupon code: ${obj.tooltip?.reward_code || ''}`}</p>
                                                    <p>{`Description: ${obj.tooltip?.description || ''}`}</p>
                                                    <p>{`Expiry Date: ${new Date(obj.tooltip?.expiry_date).toLocaleDateString()}`}</p>
                                                </Fragment>
                                            }
                                            placement='top'
                                        >
                                            <img src={info} style={{ height: '14px', width: '14px' }} />
                                        </HtmlTooltip>
                                    </div>
                                </div>
                                <div className="w-8 float-left clearfix mr-1">
                                    <div className="w-100 float-left clearfix"  style={{fontSize:'12px'}}>
                                    {i==0&&
                                        <div className="r-b-ar-i-h">Value</div>
                                    }
                                        <input 
                                            type="number" 
                                            name='rewardValue' 
                                            onChange={(e) => onRewardRowChange(e, obj)} 
                                            value={obj.rewardValue} disabled={obj.rewardType?.value == 2} 
                                            placeholder="0" 
                                            className=" r-b-ar-i" 
                                            style={{ textAlign: 'center' }} 
                                        />
                                    </div>
                                </div>
                                <div className="w-8 float-left clearfix mr-1" >
                                    <div className="w-100 float-left clearfix"  style={{fontSize:'12px'}}>
                                    {i==0&&<div className="r-b-ar-i-h">Probability(%)</div>}
                                        <input 
                                            type="number" 
                                            name='probability' 
                                            onChange={(e) => onRewardRowChange(e, obj)} 
                                            onBlur={onProbabilityBlur} 
                                            value={obj.probability} 
                                            placeholder="0%" 
                                            className=" r-b-ar-i" 
                                            style={{ textAlign: 'center' }} 
                                        />
                                    </div>
                                </div>
                                <div className="w-28 float-left clearfix mr-1">
                                    <div className="w-100 float-left clearfix"  style={{fontSize:'12px'}}>
                                    {i==0&&<div className="r-b-ar-i-h">Display To Customer</div>}
                                        <input type="text" name='displayName' onChange={(e) => onRewardRowChange(e, obj)} value={obj.displayName} placeholder="Display Name" className=" r-b-ar-i" />
                                    </div>
                                </div>
                                <div className="w-4 float-left clearfix" onClick={() => removeRow(i)}>
                                    <div className="r-b-ar-i-h mb-2">             </div>
                                    <img src={trash_src} alt='Remove' style={{ height: '14px', width: '14px' }} />
                                </div>
                            </div>
                        )}
                        <div className="r-b-addreward-btns float-left r-b-add-reward clearfix" onClick={addRow}>
                            <img src={plus_src} alt="Plus" className="r-b-add-reward-img"/>
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