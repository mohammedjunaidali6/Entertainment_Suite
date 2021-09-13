import React, { Fragment, useState,useEffect } from 'react';
import InputTags from "react-input-tags-hooks";
import 'react-input-tags-hooks/build/index.css';
import Table from "../../common/reactTable/table";
import {columns, data} from "./tempData";
import SearchBar from "../../common/searchBar/searchBar";
import DatePicker from 'react-datepicker';
import { CustomDatePickerEL } from "../../common/global";
import './rewards.css';
import {getAuthAndData, postAuthAndData} from '../../../api/ApiHelper';
import {CREATE_REWARD_MASTER, ENGT_PROD_BASE_URI, MASTER_REWARDS, SOMETHING_WENT_WRONG, TENANT_CATEGORIES} from '../../../api/apiConstants';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import createNotification from '../../common/reactNotification';
import Button from '@material-ui/core/Button';
import { Checkbox, Input, ListItemText, MenuItem, Select } from '@material-ui/core';

export default function ManageRewards(props) {
    console.log('***',props);
    const names=[
        'Name 1',
        'Name 2',
        'Name 3',
        'Name 4',
        'Name 5'
    ]
    const [createFlag, setCreateFlag] =useState(false);
    const [categoryTags, setCategoryTags] = useState([]);
    const [reward,setReward]=useState();
    
    const handleLoader = (showBool) => {
        props.routeActionHandler.dispatchLoaderData(showBool);
    }
    const tagChange = (tags) => {
        setCategoryTags(tags);
    }
    const handleResponseCode=(resp)=>{
        if(!resp || resp.data.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG);
            return false;
        }else{
            return true;
        }
    }

    const onSaveReward=()=>{
        console.log('***',reward,categoryTags);
        if(reward.couponName&&reward.couponCode&&reward.usagePerCustomer&&reward.expiryDate&&reward.couponValue&&reward.couponType){
            let postObj={
                RewardName:reward.couponName,
                RewardCode:reward.couponCode,
                PerPersonUsage:reward.usagePerCustomer,
                ExpiryDate:reward.expiryDate,
                DiscountValue:reward.couponValue,
                DiscountType:reward.couponType,
                RewardTypeId:0,
                CategoryMasterIDs:[...categoryTags]
            };

            postAuthAndData(`${ENGT_PROD_BASE_URI}${CREATE_REWARD_MASTER}`,postObj,props.history)
            .then(res=>{
                if(handleResponseCode(res)){
                    createNotification('success','Reward is succesfully saved');
                }else{
                    createNotification('error','Reward saving is failed.');
                }
            })
        }else{
            createNotification('warning','Please enter all required fields');
        }
    }

    useEffect(()=>{
        handleLoader(true);
        getAuthAndData(`${ENGT_PROD_BASE_URI}${MASTER_REWARDS}`)
        .then(res=>{
            if(handleResponseCode(res)){
                let data=res.data;let arr=[];
                Array.isArray(data)&&data.forEach(rew=>{
                    debugger;
                    let foundObj=arr.find(obj=>obj.RewardMasterId==rew.RewardMasterId);
                    if(foundObj){
                        let catObj={
                            CategoryMasterID: rew.CategoryMasterID,
                            CategoryName:rew.CategoryName,
                            CategoryURL:rew.CategoryURL,
                        }
                        foundObj.Categories.push(catObj);
                    }else{
                        var rewardWithCategories={
                            RewardMasterId: rew.RewardMasterId,
                            RewardName: rew.RewardName,
                            RewardCode: rew.RewardCode,
                            RewardTypeId: rew.RewardTypeId,
                            DiscountType: rew.DiscountType,
                            DiscountValue: rew.DiscountValue,
                            ExpiryDate: rew.ExpiryDate,
                            PerPersonUsage: rew.PerPersonUsage,
                            Categories:[{
                                CategoryMasterID: rew.CategoryMasterID,
                                CategoryName:rew.CategoryName,
                                CategoryURL:rew.CategoryURL,
                            }],
                        }
                        arr.push(rewardWithCategories);
                    }
                })
                console.log('***',arr);
                props.manageRewardsActionHandler.dispatchMasterRewards(arr);
            }
            handleLoader(false);
        })
        getAuthAndData(`${ENGT_PROD_BASE_URI}${TENANT_CATEGORIES}`)
        .then(res=>{
            if(handleResponseCode(res)){
                var cats=res.data?.map(c=>c.category_name);
                setCategoryTags(cats);
            }
        })
    },[])

    return (
        <div id="manage-rewards-container" className="w-99 float-left clearfix">
            <NotificationContainer/>
            {!createFlag ? 
            <Fragment>
                <div className='manage-journey-block'>
                    <div className='manage-journey'>Manage coupon</div>
                    <div className='manage-journey-text'>6/18 jouneys are part of running campaign</div>
                        {/* <div className='reward-options-tab'>
                            <div onClick={() => tabClick('all')} className={`r-m-tab ${active === 'all' ? `r-m-tab-active` : ``}`}>All</div>
                            <div onClick={() => tabClick('live')} className={`r-m-tab ${active === 'live' ? `r-m-tab-active` : ``}`}>Active</div>
                            <div onClick={() => tabClick('paused')} className={`r-m-tab ${active === 'paused' ? `r-m-tab-active` : ``}`}>Paused</div>
                            <div onClick={() => tabClick('upcoming')} className={`r-m-tab ${active === 'upcoming' ? `r-m-tab-active` : ``}`}>Upcoming</div>
                        </div> */}
                    </div>
                <div className='btn-create-journey float-right text-center pt-2' onClick={()=>setCreateFlag(true)}>
                    <span className="btn-c-j-text">+ Create Rewards</span>
                </div>
               
                <div className='journey-table-block'>
                    <Table columns={columns} 
                        data={props.masterRewards} 
                        pagination={true}
                        subHeaderComponent={
                            <SearchBar placeHolder="Search Reward" fromRewards={true} searchFilter="All Rewards" />
                        } 
                        subHeader={true}
                    />
                </div>
            </Fragment>
            : 
            <Fragment>
                <div className='manage-coupons'>Manage Coupons</div>
                <div className='create-new-rewards'>
                        <div className='add-coupon'>Add new Coupon</div>
                            <div className='display-name w-65 float-left clearfix'>
                                <div className='display-name-text'>Display Name</div>
                                <input 
                                    name='couponName'
                                    className='c-r-display-input-field w-97' 
                                    placeholder='Enter Coupon Name'
                                    maxLength={100}
                                    onChange={e=>setReward({...reward,[e.target.name]:e.target.value})}
                                    value={reward?.couponName}
                                    />
                            </div>
                            <div className='.c-r-coupon-code w-35 float-left clearfix'>
                                <div className='c-r-coupon-code-text'>Coupon Code</div>
                                <input 
                                    name='couponCode'
                                    className='coupon-code-input-field w-100' 
                                    placeholder='Enter Coupon Code'
                                    maxLength={50}
                                    onChange={e=>setReward({...reward,[e.target.name]:e.target.value?.toUpperCase()})}
                                    value={reward?.couponCode}
                                />
                            </div>
                            <div className='w-100 float-left clearfix' style={{paddingTop: "18px"}}>
                                <div className='target-category-text'>Target Category</div>
                                <div>
                                    <Select
                                        variant='outlined'
                                        label='Select Category'
                                        labelId="Select Categories"
                                        multiple
                                        value={categoryTags}
                                        onChange={e=>setCategoryTags(e.target.value)}
                                        input={<Input />}
                                        renderValue={selected => selected.join(", ")}
                                        style={{width:'600px'}}
                                    >
                                        {categoryTags.map(name => (
                                            <MenuItem key={name} value={name} style={{height:'34px'}}>
                                                <Checkbox checked={categoryTags.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* <InputTags
                                        onTag={tagChange} // return array of tags
                                        tagColor='#48c774' 
                                        placeHolder="Enter to add Categories"
                                        className='input-tags-text w-97'
                                    /> */}
                                </div>
                            </div>
                            <div className='w-100 float-left clearfix' style={{paddingTop: "18px"}}>
                                <div className='usage-per-customer w-20 mr-2 float-left clearfix'>
                                    <div className='usage-per-customer-text'>Usage Per Customer</div>
                                    <input
                                        type='number'
                                        name='usagePerCustomer'
                                        className='usage-per-customer-input-field w-97' 
                                        placeholder="Usage per customer"
                                        maxLength={2}
                                        onChange={e=>e.target.value<=99&&setReward({...reward,[e.target.name]:e.target.value})}
                                        value={reward?.usagePerCustomer}
                                    />
                                </div>   
                                <div className='reward-amount w-20 float-left clearfix'>
                                    <div className='rewarded-amount'>Coupon Type</div>
                                    <select className="prize-types w-97" onChange={e=>setReward({...reward,couponType:e.target.value})}>
                                        <option className='option-text' value="fixedAmount">Fixed Amount</option>
                                        <option className='option-text' value="percentage">Percentage</option>
                                    </select>
                                </div>
                                <div className='amount-selection-box w-30 mt-3 float-left clearfix'>
                                    <input
                                        name='couponValue'
                                        type='number'
                                        className="amount-input w-100 float-left clearfix" 
                                        placeholder="Enter Coupon Amount"
                                        onChange={e=>{e.target.value<=9999&& setReward({...reward,[e.target.name]:e.target.value})}}
                                        value={reward?.couponValue}
                                    />
                                </div>
                                <div className='expiry-date w-28 float-left clearfix' style={{marginRight: "0px"}}>
                                    <div className='expiry-date-text'>Expiry Date</div>
                                    <DatePicker
                                        minDate={new Date()}
                                        selected={reward?.expiryDate||new Date()}
                                        customInput={<CustomDatePickerEL fromReward={true} />} 
                                        onChange={date=>setReward({...reward,expiryDate:date})}
                                    />       
                                </div>
                            </div>
                            <div className='c-r-controls'>
                                <div className='w-20 float-right'>
                                    <Button 
                                        variant="contained" 
                                        color="default" 
                                        style={{width:'45%'}}
                                        onClick={()=>setCreateFlag(false)}
                                    >Cancel</Button>
                                     <Button
                                        className='float-right'
                                        variant="contained" 
                                        color="primary" 
                                        style={{width:'45%'}} 
                                        onClick={onSaveReward}
                                    >Save</Button>
                                </div>
                            </div>
                    </div>  
            </Fragment>
        }
            
    </div>
    )
}
