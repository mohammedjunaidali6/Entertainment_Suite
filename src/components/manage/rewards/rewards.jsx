import React, { Fragment, useState,useEffect } from 'react';
import 'react-input-tags-hooks/build/index.css';
import Table from "../../common/reactTable/table";
import SearchBar from "../../common/searchBar/searchBar";
import DatePicker from 'react-datepicker';
import { CustomDatePickerEL } from "../../common/global";
import './rewards.css';
import {getAuthAndData, postAuthAndData} from '../../../api/ApiHelper';
import {CREATE_REWARD_MASTER, ENGT_PROD_BASE_URI, MASTER_REWARDS, MASTER_CATEGORIES,UPDATE_REWARD_MASTER_STATUS_BY_ID, UPDATE_REWARD_MATER, SOMETHING_WENT_WRONG} from '../../../api/apiConstants';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import createNotification from '../../common/reactNotification';
import Button from '@material-ui/core/Button';
import { Checkbox, Input, ListItemText, MenuItem, Select } from '@material-ui/core';
import CustomTooltip from "../../common/tooltip/tooltip"
import { RewardContextMenu } from '../../common/reactTable/menu';

export default function ManageRewards(props) {
    // console.log('***',props);
    const [createFlag, setCreateFlag] =useState(false);
    const [updateFlag, setUpdateFlag] =useState();
    const [error, setError] =useState({});
    const [masterRewards, setMasterRewards] = useState([]);
    const [categoryTags, setCategoryTags] = useState([]);
    const [selectedCategories,setSelectedCategories]=useState([]);
    const [coupon,setCoupon]=useState({couponType:'fixedAmount'});
    
    const targetCategoryStyle= {
        boxSizing: 'border-box',
        height: '25px',
        width: '48px',
        border: '1px solid #E0E7EB',
        borderRadius: '4px',
        backgroundColor: '#FFFFFF',
        textAlign:'center',
        float: 'left',
        fontSize:'10px'
    }
    
    const columns =[
        {
            name:"Coupon Name ",
            width:'20%',
            selector:"RewardName"
        },
        {
            name:"Coupon Code ",
            width:'15%',
            selector:"RewardCode"
        },
        {
            name:"Category ",
            width: '25%',
            cell:row =>
                <div>
                    {row.Categories && row.Categories.length >0 &&row.Categories.map((cat,i)=>
                        i<2&&
                            <div style={targetCategoryStyle} className='clearfix c-center mr-1'>
                                {cat.CategoryName}
                            </div>
                    )}
                    <CustomTooltip tooltipText={row.Categories.length > 2 &&row.Categories.map((cat,i)=>i>=2?cat.CategoryName+' ':'')}>
                        <div className='clearfix c-center' style={targetCategoryStyle}>
                            {row.Categories.length - 2}+
                        </div>
                    </CustomTooltip>
                </div>
        },
        {
            name:"Usage",
            width:'10%',
            selector:"PerPersonUsage"
        },
        {
            name:"Amount",
            width:'10%',
            selector:"DiscountValue"
        },
        {
            name:"Expiring On",
            width:'15%',
            selector:"ExpiryDate"
        },
        {
            name:" ",
            width:'5%',
            cell: row=> <RewardContextMenu onAction={e=>onAction(e,row)}/>
        }
    ]

    const handleLoader = (showBool) => {
        props.routeActionHandler.dispatchLoaderData(showBool);
    }
    
    const getMasterRewards=()=>{
        handleLoader(true);
        getAuthAndData(`${ENGT_PROD_BASE_URI}${MASTER_REWARDS}`)
        .then(res=>{
            if(handleResponseCode(res)){
                let data=res.data;let arr=[];
                Array.isArray(data)&&data.forEach(rew=>{
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
                            ExpiryDate: rew.ExpiryDate.substring(0,10),
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
                props.manageRewardsActionHandler.dispatchMasterRewards(arr);
            }
            handleLoader(false);
        })
    }
    const getMasterCategories=()=>{
        getAuthAndData(`${ENGT_PROD_BASE_URI}${MASTER_CATEGORIES}`)
        .then(res=>{
            if(handleResponseCode(res)){
                var cats=res.data?.map(c=>{
                    return {
                        name:c.category_name,
                        value:c.category_master_id
                    }
                });
                setCategoryTags(cats);
            }
        })
    }

    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG +' in Rewards');
            return false;
        }else{
            return true;
        }
    }

    const onCouponDataChange=(key,value)=>{
        if(key==='couponValue'){
            if((coupon.couponType==='fixedAmount'&&value.length<=4)||(coupon.couponType==='percentage'&&value.length<=2)){
                setCoupon({...coupon,'couponValue':value});
            }
        }else{
            if(key==='couponType'){
                setCoupon({...coupon,'couponValue':'',[key]:value});
            }else{
                setCoupon({...coupon,[key]:value});
            }
        }
        setError({...error,[key]:''})
    }
    const onSaveReward=(e)=>{
        if(coupon.couponName&&coupon.couponCode&&selectedCategories.length>0&&coupon.usagePerCustomer&&coupon.expiryDate&&coupon.couponValue&&coupon.couponType){
            let postObj={
                RewardName:coupon.couponName,
                RewardCode:coupon.couponCode.toUpperCase(),
                PerPersonUsage:coupon.usagePerCustomer,
                ExpiryDate:coupon.expiryDate,
                DiscountValue:coupon.couponValue,
                DiscountType:coupon.couponType,
                RewardTypeId:2,
                CategoryMasterIDs:[]
            };
            selectedCategories.forEach(cname=>{
                let found=categoryTags.find(ct=>ct.name==cname);
                if(found){
                    postObj.CategoryMasterIDs.push(found.value);
                }
            })
            if(e.target.innerText==='SAVE'){
                onCreateReward(postObj);
            }else if(e.target.innerText==='UPDATE'){
                postObj.RewardMasterId=updateFlag;
                onUpdateReward(postObj);
            }
        } else {
            if(!coupon.couponName){
                setError({...error,'couponName':'Coupon Name is Required'});
            }else if(!coupon.couponCode){
                setError({...error,'couponCode':'Coupon Code is Required'});
            }else if(selectedCategories.length<=0){
                setError({...error,'selectedCategories':'Categories are Required'});
            }else if(!coupon.usagePerCustomer){
                setError({...error,'usagePerCustomer':'Usage Per Customer is Required'});
            }else if(!coupon.expiryDate){
                setError({...error,'expiryDate':'Expiry Date is Required'});
            }else if(!coupon.couponValue){
                setError({...error,'couponValue':'Coupon Value is Required'});
            }
        }
    }
    const onAction=(e,row)=>{
        var actionText = e.target.innerText;
        if (actionText == 'Edit') {
            setCoupon({
                couponName:row.RewardName,
                couponCode:row.RewardCode,
                couponType:row.DiscountType,
                couponValue:row.DiscountValue,
                usagePerCustomer: row.PerPersonUsage,
                expiryDate:new Date(row.ExpiryDate)
            });
            setSelectedCategories(row.Categories.map(c=>c.CategoryName))
            setUpdateFlag(row.RewardMasterId);
        }else if(actionText=='Delete'){
            getAuthAndData(`${ENGT_PROD_BASE_URI}${UPDATE_REWARD_MASTER_STATUS_BY_ID}${row.RewardMasterId}`)
        }else if(actionText=='Reports'){

        }
    }
    const onCreateReward=(postData)=>{
        handleLoader(true);
        postAuthAndData(`${ENGT_PROD_BASE_URI}${CREATE_REWARD_MASTER}`,postData,props.history)
        .then(res=>{
            if(handleResponseCode(res)){
                createNotification('success','Reward is succesfully saved');
                setCreateFlag(false);
                getMasterRewards();
            }else{
                createNotification('error','Reward saving is failed.');
            }
            handleLoader(false);
        })
    }
    const onUpdateReward=(postData)=>{
        handleLoader(true);
        postAuthAndData(`${ENGT_PROD_BASE_URI}${UPDATE_REWARD_MATER}`,postData,props.history)
        .then(res=>{
            if(handleResponseCode(res)){
                createNotification('success','Reward is succesfully updated');
                setUpdateFlag();
                getMasterRewards();
            }else{
                createNotification('error','Reward updating is failed.');
            }
            handleLoader(false);
        })
    }
    const onRewardSearch=(searchText)=>{
        if(searchText){
            let arr=[...props.masterRewards];
            let resultArr=arr.filter(r=>{
                if(r.RewardName.toUpperCase().includes(searchText.toUpperCase()))
                {
                    return r;
                }
            });
            setMasterRewards(resultArr);
        }else{
            setMasterRewards(props.masterRewards);
        }
    }

    useEffect(()=>{
        getMasterRewards();
        getMasterCategories();
    },[])
    useEffect(()=>{
        setMasterRewards(props.masterRewards);
    },[props.masterRewards])

    return (
        <div id="manage-rewards-container" className="w-99 float-left clearfix">
            <NotificationContainer/>
            {(!createFlag&&!updateFlag) ? 
            <Fragment>
                <div className='manage-journey-block'>
                    <div className='manage-journey'>Manage Rewards</div>
                    {/* <div className='manage-journey-text'>6/18 jouneys are part of running campaign</div> */}
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
                        data={masterRewards} 
                        pagination={true}
                        subHeaderComponent={
                            <SearchBar placeHolder="Search Reward" onSearch={text=>onRewardSearch(text)} fromRewards={true} searchFilter="All Rewards" />
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
                                    onChange={e=>onCouponDataChange('couponName',e.target.value)}
                                    value={coupon?.couponName}
                                />
                                {error.couponName&&
                                    <p style={{fontSize:'10px',fontFamily:'Roboto',color:'red'}}>{error.couponName}</p>
                                }
                            </div>
                            <div className='.c-r-coupon-code w-35 float-left clearfix'>
                                <div className='c-r-coupon-code-text'>Coupon Code</div>
                                <input 
                                    name='couponCode'
                                    className='coupon-code-input-field w-100' 
                                    placeholder='Enter Coupon Code'
                                    maxLength={50}
                                    onChange={e=>onCouponDataChange('couponCode',e.target.value)}
                                    value={coupon?.couponCode}
                                    disabled={updateFlag}
                                />
                                {error.couponCode&&
                                    <p style={{fontSize:'10px',fontFamily:'Roboto',color:'red'}}>{error.couponCode}</p>
                                }
                            </div>
                            <div className='w-100 float-left clearfix' style={{paddingTop: "18px"}}>
                                <div className='target-category-text'>Target Category</div>
                                <Select
                                    variant='outlined'
                                    label='Select Category'
                                    labelId="Select Categories"
                                    multiple
                                    value={selectedCategories}
                                    onChange={e=>setSelectedCategories(e.target.value)}
                                    input={<Input />}
                                    renderValue={selected => selected.join(", ")}
                                    style={{width:'600px'}}
                                >{categoryTags.map(c => (
                                    <MenuItem key={c.name} value={c.name} style={{height:'34px'}}>
                                        <Checkbox checked={selectedCategories.indexOf(c.name) > -1} />
                                        <ListItemText primary={c.name} />
                                    </MenuItem>
                                ))}
                                </Select>
                                {error.selectedCategories&&
                                    <p style={{fontSize:'10px',fontFamily:'Roboto',color:'red'}}>{error.selectedCategories}</p>
                                }
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
                                        onChange={e=>e.target.value<=99&&onCouponDataChange('usagePerCustomer',e.target.value)}
                                        value={coupon?.usagePerCustomer}
                                    />
                                    {error.usagePerCustomer&&
                                        <p style={{fontSize:'10px',fontFamily:'Roboto',color:'red'}}>{error.usagePerCustomer}</p>
                                    }
                                </div>   
                                <div className='reward-amount w-20 float-left clearfix'>
                                    <div className='rewarded-amount'>Coupon Type</div>
                                    <select className="prize-types w-97" name='couponType' onChange={e=>onCouponDataChange('couponType',e.target.value)}>
                                        <option className='option-text' value="fixedAmount">Fixed Amount</option>
                                        <option className='option-text' value="percentage">Percentage</option>
                                    </select>
                                </div>
                                <div className='amount-selection-box w-30 mt-3 float-left clearfix'>
                                    <input
                                        name='couponValue'
                                        type='number'
                                        className="amount-input w-100 float-left clearfix" 
                                        placeholder={coupon.couponType==='fixedAmount'?"Enter Coupon Amount":'Enter Coupon Percentage'}
                                        onChange={e=>onCouponDataChange('couponValue',e.target.value)}
                                        value={coupon?.couponValue}
                                    />
                                    {error.couponValue&&
                                        <p style={{fontSize:'10px',fontFamily:'Roboto',color:'red'}}>{error.couponValue}</p>
                                    }
                                </div>
                                <div className='expiry-date w-28 float-left clearfix' style={{marginRight: "0px"}}>
                                    <div className='expiry-date-text'>Expiry Date</div>
                                    <DatePicker
                                        minDate={new Date()}
                                        selected={coupon?.expiryDate||new Date()}
                                        customInput={<CustomDatePickerEL fromReward={true} />} 
                                        onChange={date=>onCouponDataChange('expiryDate',date)}
                                    />
                                    {error.expiryDate&&
                                        <p style={{fontSize:'10px',fontFamily:'Roboto',color:'red'}}>{error.expiryDate}</p>
                                    }  
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
                                    >{updateFlag?'Update':'Save'}</Button>
                                </div>
                            </div>
                    </div>  
            </Fragment>
        }
            
    </div>
    )
}
