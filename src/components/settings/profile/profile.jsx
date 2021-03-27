import React, {useState, Fragment } from 'react';
import user from "../../../assets/img/user.svg";
import edit_src from '../../../assets/img/Edit_black.svg';
import './profile.css';


export default function Profile(props) {
    const[editEnable, setEditEnable] =useState(false)
    const[inactive, setActive] =useState(true)
    function editEnabler(){
        setEditEnable(true);
        setActive(false);
    }

    function editDisabler(){
        setEditEnable(false);
        setActive(true);
    }

    return (
        <Fragment>
            <div id="profile-container">
                <div className='general-info-block'>
                    <div className='g-i-heading disp-inline-block'>GENERAL INFO</div>
                    {!editEnable ? (<div className='g-i-edit-block disp-inline-block' onClick={editEnabler}>
                        
                        <img src={edit_src} className='p-s-edit-btn-symbol disp-inline-block' />
                        <div className='g-i-edit disp-inline-block' role='button'> Edit</div>
                    </div>) :(
                    <div className='g-i-edit-controls disp-inline-block'>
                        <div className='g-i-discard-btn disp-inline-block' role="button" onClick={editDisabler}>
                            <div className='g-i-discard-text'>Discard</div>
                        </div>
                        <div className='g-i-save-btn disp-inline-block' role="button" onClick={editDisabler}>
                            <div className='g-i-save-text'>Save</div>
                        </div>
                    </div>)}
                    <div className='g-i-divider'></div>
                    <div className='g-i-profile-info disp-inline-block'>
                        <img src={user} className='g-i-profile-pic disp-inline-block' alt=""/>
                        <div className='g-i-profile-intro disp-inline-block'>
                            <div className='g-i-profile-name'>Richard Branson</div>
                            <div className='g-i-profile-email'>Richard323@gmail.com</div>
                        </div>
                    </div>
                    <div className='g-i-input-details-block'>
                        <div className='g-i-first-name-block'>
                            <div className='g-i-input-details-label'>First Name</div>
                            <input type='text' className='g-i-input-details-input' disabled={inactive} name='firstName' placeholder="Richard"/>
                        </div>
                        <div className='g-i-last-name-block g-i-col-2'>
                            <div className='g-i-input-details-label'>Last Name</div>
                            <input type='text' className='g-i-input-details-input' disabled={inactive} name='lastName' placeholder="Branson" />
                        </div>
                        <div className='g-i-email-block'>
                            <div className='g-i-input-details-label'>Email</div>
                            <input type="email" className='g-i-input-details-input' disabled={inactive} name='email' placeholder="Richard223@gmail.com"/>
                        </div>
                        <div className='g-i-mobile-block g-i-col-2'>
                            <div className='g-i-input-details-label'>Mobile</div>
                            <input type='text' className='g-i-input-details-input' disabled={inactive} name='mobile' placeholder="+91-9876544242"/>
                        </div>
                        <div className='g-i-company-block'>
                            <div className='g-i-input-details-label'>Company</div>
                            <input type='text' className='g-i-input-details-input' disabled={inactive} name='companyName' placeholder="xxxxxx pvt ltd" />
                        </div>
                    </div>
                    <div className='reset-password-block'>
                        <div className='r-p-heading'>Reset Password</div>
                        <div className='g-i-new-password-block disp-inline-block'>
                            <div className='g-i-input-details-label'>New Password</div>
                            <input type='password' disabled={inactive} className='g-i-input-details-input' placeholder="*********"/>
                        </div>
                        <div className='g-i-re-password-block disp-inline-block g-i-col-2'>
                            <div className='g-i-input-details-label'>Re-Enter New Password</div>
                            <input type='password' disabled={inactive} className='g-i-input-details-input' placeholder="*********" />
                        </div>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}
