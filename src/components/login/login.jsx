import React from 'react';
import email_src from '../../assets/img/email.svg';
import password_src from '../../assets/img/password.svg';
import logo_src from '../../assets/img/logo_color.svg';
import {containerHeightCalcFn } from '../../components/common/global';

import './login.css';

export default function POC(props) {

    
    function registerOpenFn(){
        props.history.push('/register');
    }
    
    return (
        <div id="login-container" >
            <img src={logo_src} className='login-logo' />
            <div className='dont-have-account'>Don't have an account?
            <span className='l-page-navigator' onClick={registerOpenFn}>Sign Up</span></div>

            <div className='login-outer-container'>
                <div className='login-container' containerHeightCalcFn={0}>
                    <div className='login-intro'>Login to Your Account</div>
                    <div className='login-input-field '>
                        <img src={email_src} className='l-i-symbol disp-inline' />
                        <input className='login-field disp-inline' placeholder='Email Address' type="text"/>
                    </div>
                    <div className='login-divider'></div>
                    <div className='login-input-field '>
                        <img  src={password_src} className='l-i-symbol disp-inline' />
                        <input className='login-field disp-inline' placeholder='Enter Password' type="password"/>
                    </div>
                    <div className='login-divider'></div>
                    <div className='l-forget-password'>Forget Password?</div>
                    <div className='login-btn' role="button">
                        <div className='l-btn-text'>Login Now</div>
                    </div>
                    <div className='copyright-text'>©2021 All Rights Reserved. Divanor</div>
                </div>
            </div>
        </div>
    )
}
