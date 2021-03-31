import React, {useState, Fragment } from 'react';
import SearchBar from '../../common/searchBar/searchBar';
import Table from '../../common/reactTable/table';
import { columns, data } from './teamTempData';
import './team.css';


const roles = [
    {id:1, permission:"Overview" },
    {id:2, permission:"Engagements" },
    {id:3, permission:"Live view" },
    {id:4, permission:"Analytics"},
    {id:5, permission:"Customer Segment"},
    {id:6, permission:"Manage" },
    {id:7, permission:"Admin" }
]

export default function Team(props) {
    const[createClick, setCreateClick] = useState(false);

    function clickHandler(){
        setCreateClick(true);
    }
    return (
        <Fragment>
            <div id="team-container">
                {!createClick ? (
                    <div style={{padding: '30px'}}>
                        <div className='team-management-header'>
                            <div className='t-m-title disp-inline-block'>TEAM MANAGEMENT</div>
                            <div className='t-m-create-btn disp-inline-block' onClick={clickHandler}>
                                <div className='t-m-create-btn-text'>+  Invite User</div>
                            </div>
                            <Table columns={columns} 
                                data={data} 
                                pagination={true}
                                subHeaderComponent={
                                    <SearchBar placeHolder="Search User" fromSettingsTeam={true} />
                                } 
                                subHeader={true}
                            />
                        </div>
                    </div>
                ) : (
                    <Fragment>
                    <div style={{padding: '30px'}}>  
                    <div className='invite-user-block'>
                        <div className='t-m-title'>Invite User</div>
                        <div className='t-m-input-block'>
                            <div className='t-m-input disp-inline-block'>
                                <div className='t-m-input-label'>E-mail*</div>
                                <input type="email" className= 't-m-input-field' placeholder='richard322@gmail.com' /> 
                            </div>
                            <div className='t-m-input disp-inline-block'>
                                <div className='t-m-input-label'>Mobile</div>
                                <input type="text" className= 't-m-input-field' placeholder='+91-9876545665' /> 
                            </div>
                            <div className='t-m-input disp-inline-block'>
                                <div className='t-m-input-label'>Role</div>
                                <select className= 't-m-input-field' placeholder="Campaign Manager"> 
                                   <option value="Campaign Manager">Campaign Manger</option>
                                </select>
                            </div>
                            <div className='t-m-message-block'>
                                <div className='t-m-input-label'>Message</div>
                                <textarea className='t-m-message-box' placeholder="You’ve been invited to join Divinor Luckyme Dashbord. "/>
                            </div>
                        </div>
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
                )
                }
            </div>
        </Fragment>
    )
}
