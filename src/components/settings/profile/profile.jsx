import React, {useState, Fragment, useEffect } from 'react';
import user from "../../../assets/img/user.svg";
import edit_src from '../../../assets/img/Edit_black.svg';
import './profile.css';
import { getUserData } from '../../common/storeFunctions';
import { postAuthAndData } from '../../../api/ApiHelper';
import { IDTY_PROD_HOST_URI } from '../../../api/apiConstants';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import createNotification from '../../common/reactNotification';


export default function Profile(props) {
    const[editEnable, setEditEnable] =useState(false);
    const[inactive, setActive] =useState(true);
    const [userData,setUserData]=useState();
    
    const handleLoader = (showBool) => {
        props.parentProps.routeActionHandler.dispatchLoaderData(showBool);
    }

    function onEditUser(){
        setEditEnable(true);
        setActive(false);
    }
    function onDiscardUser(){
        setEditEnable(false);
        setActive(true);
    }
    function onTextChange(e){
        setUserData({...userData,[e.target.name]:e.target.value})
    }
    function onSaveUser(){
        console.log('***',userData);
        handleLoader(true);
        postAuthAndData(`${IDTY_PROD_HOST_URI}/idty/saveuser`,userData,props.parentProps.history)
        .then(res=>{
            createNotification('success','User details are succesfully updated');
            setEditEnable(false);
            setActive(true);
            handleLoader(false);
        });
    }

    useEffect(()=>{
        getUserData(user=>{
            if(user){
                let {UserID,BusinessName,UserName,FirstName,MiddleName,LastName,Email,MobileNumber}=user;
                setUserData({UserID,BusinessName,UserName,FirstName,MiddleName,LastName,Email,MobileNumber});
            }
        })
    },[])


    return (
        <div id="profile-container">
            <NotificationContainer/>
            <div className='general-info-block'>
                    <div className='g-i-heading disp-inline-block'>GENERAL INFO</div>
                    {!editEnable ? 
                        <div className='g-i-edit-block disp-inline-block' onClick={onEditUser}>
                            <img src={edit_src} className='p-s-edit-btn-symbol disp-inline-block' />
                            <div className='g-i-edit disp-inline-block' role='button'> Edit</div>
                        </div> 
                        :
                        <div className='g-i-edit-controls disp-inline-block'>
                            <div className='g-i-discard-btn disp-inline-block' role="button" onClick={onDiscardUser}>
                                <div className='g-i-discard-text'>Discard</div>
                            </div>
                            <div className='g-i-save-btn disp-inline-block' role="button" onClick={onSaveUser}>
                                <div className='g-i-save-text'>Save</div>
                            </div>
                        </div>
                    }
                    <div className='g-i-divider'></div>
                    <div className='g-i-profile-info disp-inline-block'>
                        <img src={user} className='g-i-profile-pic disp-inline-block' alt=""/>
                        <div className='g-i-profile-intro disp-inline-block'>
                            <div className='g-i-profile-name'>{userData?.UserName}</div>
                            <div className='g-i-profile-email'>{userData?.Email}</div>
                        </div>
                    </div>
                    <div className='g-i-input-details-block'>
                        <div className='g-i-first-name-block'>
                            <div className='g-i-input-details-label'>First Name</div>
                            <input 
                                className='g-i-input-details-input' 
                                value={userData?.FirstName} 
                                disabled={inactive} 
                                name='FirstName' 
                                placeholder="Enter First Name"
                                onChange={onTextChange}
                            />
                        </div>
                        <div className='g-i-last-name-block g-i-col-2'>
                            <div className='g-i-input-details-label'>Last Name</div>
                            <input 
                                className='g-i-input-details-input' 
                                value={userData?.LastName} 
                                disabled={inactive} 
                                name='LastName'
                                placeholder="Enter Last Name" 
                                onChange={onTextChange}
                            />
                        </div>
                        <div className='g-i-email-block'>
                            <div className='g-i-input-details-label'>Email</div>
                            <input 
                                type="email" 
                                className='g-i-input-details-input' 
                                value={userData?.Email}  
                                disabled={inactive} 
                                name='Email' 
                            />
                        </div>
                        <div className='g-i-mobile-block g-i-col-2'>
                            <div className='g-i-input-details-label'>Mobile Number</div>
                            <input 
                                className='g-i-input-details-input' 
                                value={userData?.MobileNumber} 
                                disabled={inactive} 
                                name='MobileNumber' 
                                placeholder="Enter Mobile Number"
                                onChange={onTextChange}
                            />
                        </div>
                        <div className='g-i-company-block'>
                            <div className='g-i-input-details-label'>Business Name</div>
                            <input  
                                className='g-i-input-details-input' 
                                value={userData?.BusinessName} 
                                disabled={true} 
                                name='BusinessName' 
                                placeholder="Enter Business Name" 
                                // onChange={onTextChange}
                            />
                        </div>
                    </div>
                    {/* <div className='reset-password-block'>
                        <div className='r-p-heading'>Reset Password</div>
                        <div className='g-i-new-password-block disp-inline-block'>
                            <div className='g-i-input-details-label'>New Password</div>
                            <input type='password' disabled={inactive} className='g-i-input-details-input' placeholder="*********"/>
                        </div>
                        <div className='g-i-re-password-block disp-inline-block g-i-col-2'>
                            <div className='g-i-input-details-label'>Re-Enter New Password</div>
                            <input type='password' disabled={inactive} className='g-i-input-details-input' placeholder="*********" />
                        </div>
                    </div> */}
                    
                </div>
        </div>
    )
}
