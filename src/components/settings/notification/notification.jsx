import React, { useState, Fragment } from 'react';
import Table from "../../common/reactTable/table";
import {data, column} from "./tempData";
import PermissionList from "./permissionContainer";

import './notification.css';

const rolePermissionData = [
    {id:1, permission:"Overview", isActive:true},
    {id:2, permission:"Engagements", isActive:true},
    {id:3, permission:"Live view", isActive:true},
    {id:4, permission:"Analytics", isActive:true},
    {id:5, permission:"Customer Segment", isActive:true },
    {id:6, permission:"Manage", isActive:true},
    {id:7, permission:"Admin", isActive:true}
]

export default function Role(props) {
    const [createClick, setCreateClick] = useState(false);
    function clickHandler(){
        setCreateClick(true);
    }
    return (
        <Fragment>
            <div id="role-container">
                {!createClick ?
               (<Fragment><div style={{padding: '35px 45px '}}><div className='role-header'>
                    <div className='role-title disp-inline'>TEAM MANAGEMENT</div>
                    <div className='add-new-role-btn disp-inline' role="button" onClick={clickHandler}>
                        <div className='add-new-role'>+ Add New Role</div>
                    </div>
                    </div>
                     <Table columns ={column} data={data}/>
                     </div>
                    </Fragment>
                    ) 
                    :(<Fragment>
                        <div style={{padding: '35px 45px'}}>
                        <div className='role-header'>
                            <div className='role-title'>CREATE ROLE</div>
                        </div>    
                            <div className='role-name'>
                                <div className='t-m-input-label'>Role Name</div>
                                <input type="text" className='r-input-field' placeholder='Campaign Manager'/>
                            </div>
                            <div className='role-permissions'>
                                <div className='t-m-input-label'>Permissions</div>
                                <div className='r-permissions-list'>
                                    {rolePermissionData.map(obj =>(
                                        <div className='r-p-list-item'>
                                        
                                        <input type="checkbox" className={`dips-inline-block r-checkbox ${obj.isActive ? ` r-checked`: `r-checked-out `}`} checked={obj.isActive? true : false}/>
                                        <div className='r-p-item-text disp-inline-block'>{obj.permission}</div>    
                                         </div> 
                                    ))}
                                </div>
                            </div>
                            <div className='role-description'>
                                <div className= 't-m-input-label'>Description</div>
                                <textarea className='role-description-box' placeholder="Add Note"></textarea>
                            </div>
                            </div>
                            <div className='role-actions  clearfix'>
                                <div className='role-act-btn'>
                                    <div className='role-cancel-btn disp-inline-block' role="button" onClick={()=>{setCreateClick(false)}}>
                                        <div className='r-c-btn-text'>Cancel</div>
                                    </div>
                                    <div className='role-save-btn disp-inline-block' role="button">
                                        <div className='r-s-btn-text'>Save</div>
                                    </div>
                                </div>
                            </div>
                    </Fragment>
                ) }
            </div>
         </Fragment>   
        
    )
}
