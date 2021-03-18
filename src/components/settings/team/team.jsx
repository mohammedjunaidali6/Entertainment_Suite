import React, {useState, Fragment } from 'react';
import SearchBar from '../../common/searchBar/searchBar';
import Table from '../../common/reactTable/table';
import { columns, data } from './teamTempData';
import './team.css';

export default function Team(props) {
    const[createClick, setCreateClick] = useState(false);

    function clickHandler(){
        setCreateClick(true);
    }
    return (
        <Fragment>
            <div id="team-container">
                {!createClick ? (
                    <div className='team-management-header'>
                    <div className='t-m-title disp-inline-block'>TEAM MANAGEMENT</div>
                    <div className='t-m-create-btn disp-inline-block' onClick={clickHandler}>
                        <div className='t-m-create-btn-text' role="button">+  Invite User</div>
                    </div>
                    <Table columns={columns} data={data} actions={<SearchBar />} />
                </div>
                ) : (
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
                                    <option>Campaign Manager</option>
                                </select>
                            </div>
                            <div className='t-m-message-block'>
                                <div className='t-m-input-label'>Message</div>
                                <textarea className='t-m-message-box' placeholder="You’ve been invited to join Divinor Luckyme Dashbord. "/>
                            </div>
                        </div>
                        <div className='t-m-actions'>
                            <div className='t-m-act-btns'>
                                <div className='t-m-cancel-btn disp-inline-block' role="button" onClick={()=>{setCreateClick(false)}}>
                                    <div className='t-m-cancel-btn-text' >Cancel</div>
                                </div>
                                <div className='t-m-save-btn disp-inline-block'>
                                    <div className='t-m-save-btn-text'>Save</div>
                                </div>
                            </div>
                        </div>
                        
                     </div>   
                )
                }
            </div>
        </Fragment>
    )
}
