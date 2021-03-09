import React, { Fragment, useState } from 'react';
import Table from "../../common/reactTable/table";
import {columns, data} from "./tempData";
import SearchBar from "../../common/searchBar/searchBar";
import './rewards.css';

export default function ManageRewards(props) {

    const [active,setActive] =useState('all');
    const [createFlag, setCreateFlag] =useState(false);

    const tabClick=(val)=> {
        setActive(val);
    }

    const createClick =() =>{
        setCreateFlag(true)
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
                                <div className='display-name'>
                                    <div className='display-name-text'>Display Name</div>
                                    <input className='c-r-display-input-field' type="text" placeholder='Get 100 points'/>
                                </div>
                                <div className='c-r-coupon-code'>
                                    <div className='c-r-coupon-code-text'>Coupon Code</div>
                                    <input className='coupon-code-input-field' type="text" placeholder='COUP100OFF'/>
                                </div>
                                <div className='c-r-row-2'>
                                    <div className='target-category-text'>Target Category</div>
                                </div>
                                <div className='c-r-row-3'>
                                    <div className='usage-per-customer disp-inline-block'>
                                        <div className='usage-per-customer-text'>Usage Per Customer</div>
                                        <input className='usage-per-customer-input-field' type="text" placeholder="1"/>
                                    </div>   
                                    <div className='reward-amount disp-inline-block'>
                                        <div className='rewarded-amount'>Rewarded Amount</div>
                                        <select className="prize-types">
                                            <option className='option-text' value="fixedAmount">Fixed Amount</option>
                                        </select>
                                    </div>
                                    <div className='amount-selection-box disp-inline-block'>
                                        <select className='currency-selector'>
                                            <option value="Rs">Rs.</option>
                                        </select>
                                        <input className="amount-input"text="type" placeholder="1000" />
                                    </div>
                                    <div className='expiry-date disp-inline-block'>
                                        <div className='expiry-date-text'>Expiry Date</div>
                                        <input className='expiry-date-input' type="date"/>
                                    </div>
                                    <div className='description-box'>
                                        <div className='description-text'>Descritption</div>
                                        <input className='description-input'type="text"/>
                                    </div>
                                    <div className='c-r-controls'>
                                        <div className='c-r-button-controls float-right'>
                                            <div className='c-r-cancel-button disp-inline-block' role="button" onClick={()=>setCreateFlag(false)}>
                                                <div className='cancel-btn-font'>Cancel</div>
                                                </div>
                                            <div className='c-r-add-button disp-inline-block' role="button">
                                                <div className='add-btn-font'>Add</div>
                                                </div>
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
