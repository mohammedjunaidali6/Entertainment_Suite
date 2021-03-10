import React, { Fragment, useState } from 'react';
import InputTags from "react-input-tags-hooks";
import 'react-input-tags-hooks/build/index.css';
import Table from "../../common/reactTable/table";
import {columns, data} from "./tempData";
import SearchBar from "../../common/searchBar/searchBar";
import './rewards.css';

export default function ManageRewards(props) {

    const [active,setActive] =useState('all');
    const [createFlag, setCreateFlag] =useState(false);
    const [targetCategoryTags, settargetCategoryTags] = useState([]);

    const tabClick=(val)=> {
        setActive(val);
    }

    const createClick = () =>{
        setCreateFlag(true)
    }

    const tagChange = (tags) => {
        settargetCategoryTags(tags);
    }

    return (
        <div id="manage-rewards-container">
            {!createFlag ? (
            <Fragment>
                <div className='manage-journey-block'>
                    <div className='manage-journey'>Manage coupon</div>
                    <div className='manage-journey-text'>6/18 jouneys are part of running campaign</div>
                        <div className='reward-options-tab'>
                        <div onClick={() => tabClick('all')} className={`r-m-tab ${active === 'all' ? `r-m-tab-active` : ``}`}>All</div>
                        <div onClick={() => tabClick('live')} className={`r-m-tab ${active === 'live' ? `r-m-tab-active` : ``}`}>Active</div>
                        <div onClick={() => tabClick('paused')} className={`r-m-tab ${active === 'paused' ? `r-m-tab-active` : ``}`}>Paused</div>
                        <div onClick={() => tabClick('upcoming')} className={`r-m-tab ${active === 'upcoming' ? `r-m-tab-active` : ``}`}>Upcoming</div>
                    </div>
                </div>
                    <div className='btn-create-journey float-right text-center pt-2' onClick={createClick}>
                                <span className="btn-c-j-text">+ Create Rewards</span>
                    </div>
               
                <div className='journey-table-block'>
                    <Table columns={columns} data={data} actions={<SearchBar className='c-r-search-box' />}/>
                </div>
            </Fragment>): (
                <Fragment>
                    <div className='manage-coupons'>Manage Coupons</div>
                        <div className='create-new-rewards'>
                            <div className='add-coupon'>Add new Coupon</div>
                                <div className='display-name w-65 float-left clearfix'>
                                    <div className='display-name-text'>Display Name</div>
                                    <input className='c-r-display-input-field w-97' type="text" placeholder='Get 100 points'/>
                                </div>
                                <div className='c-r-coupon-code w-35 float-left clearfix'>
                                    <div className='c-r-coupon-code-text'>Coupon Code</div>
                                    <input className='coupon-code-input-field w-100' type="text" placeholder='COUP100OFF'/>
                                </div>
                                <div className='w-100 float-left clearfix' style={{paddingTop: "18px"}}>
                                    <div className='target-category-text'>Target Category</div>
                                    <div>
                                        <InputTags
                                            onTag={tagChange} // return array of tags
                                            tagColor='#48c774' 
                                            placeHolder="Press enter to add tags"
                                        />
                                    </div>
                                </div>
                                <div className='w-100 float-left clearfix' style={{paddingTop: "18px"}}>
                                    <div className='usage-per-customer w-33 mr-2 float-left clearfix'>
                                        <div className='usage-per-customer-text'>Usage Per Customer</div>
                                        <input className='usage-per-customer-input-field w-97' type="text" placeholder="1"/>
                                    </div>   
                                    <div className='reward-amount w-15 float-left clearfix'>
                                        <div className='rewarded-amount'>Rewarded Amount</div>
                                        <select className="prize-types w-97">
                                            <option className='option-text' value="fixedAmount">Fixed Amount</option>
                                        </select>
                                    </div>
                                    <div className='amount-selection-box w-15 mt-3 float-left clearfix'>
                                        <select className='currency-selector w-30 float-left clearfix'>
                                            <option value="Rs">Rs.</option>
                                        </select>
                                        <input className="amount-input w-67 float-left clearfix"text="type" placeholder="1000" />
                                    </div>
                                    <div className='expiry-date w-33 float-left clearfix' style={{marginRight: "0px"}}>
                                        <div className='expiry-date-text'>Expiry Date</div>
                                        <input className='expiry-date-input w-100' type="date"/>
                                    </div>
                                </div>
                                <div className='description-box w-100 float-left clearfix'>
                                    <div className='description-text'>Descritption</div>
                                    <input className='description-input w-100'type="text"/>
                                </div>
                                <div className='c-r-controls'>
                                    <div className='c-r-button-controls float-right'>
                                        <div className='c-r-cancel-button disp-inline-block' role="button" onClick={()=>setCreateFlag(false)}>
                                            <div className='cancel-btn-font'>Cancel</div>
                                        </div>
                                        <div className='c-r-add-button disp-inline-block' role="button" onClick={()=>setCreateFlag(false)}>
                                            <div className='add-btn-font'>Add</div>
                                        </div>
                                    </div>
                                </div>
                        </div>  
                </Fragment>
                
            )
            }
            
        </div>
    )
}
