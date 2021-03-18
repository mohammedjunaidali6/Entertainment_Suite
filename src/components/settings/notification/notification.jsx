import React, { useState, Fragment } from 'react';
import Table from "../../common/reactTable/table";
import {data, column} from "./tempData";
import PermissionList from "./permissionContainer";

import './notification.css';

const rolePermissionData = [
    {id:1, permission:"Overview"},
    {id:2, permission:"Engagements"},
    {id:3, permission:"Live view"},
    {id:4, permission:"Analytics"},
    {id:5, permission:"Customer Segment"},
    {id:6, permission:"Manage"},
    {id:7, permission:"Admin"}
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
               (<Fragment><div className='role-header'>
                    <div className='role-title disp-inline'>TEAM MANAGEMENT</div>
                    <div className='add-new-role-btn disp-inline' role="button" onClick={clickHandler}>
                        <div className='add-new-role'>+ Add New Role</div>
                    </div>
                    </div>
                     <Table columns ={column} data={data}/>
                    </Fragment>
                    ) 
                    :(<Fragment>
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
                                        <input type="checkbox" className='disp-inline r-checkbox' />
                                        <div className='r-p-item-text disp-inline'>{obj.permission}</div>    
                                         </div> 
                                    ))}
                                </div>
                            </div>
                            <div className='role-description'>
                                <div className= 't-m-input-label'>Description</div>
                                <textarea className='role-description-box' placeholder="Add Note"></textarea>
                            </div>
                            <div className='role-actions'>
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
