import React from 'react';
import user_src from '../../assets/img/user_login.svg';
import logo_src from '../../assets/img/logo_color.svg';
import { containerHeightCalcFn } from '../common/global';
import './verify.css';

export default function Verify(props) {

    function registerOpenFn(){
        props.history.push('/register');
    }
    function loginOpenFn(){
        props.history.push('/register');
    }
    return (
        <div id="verify-container">
            <img src={logo_src} className='login-logo' />
             <div className='dont-have-account'>
                <span className='l-page-navigator' onClick={loginOpenFn}>Login</span> Or
                 <span className='l-page-navigator' onClick={registerOpenFn}>Sign Up</span>
            </div>
           
            <div className='login-outer-container'>
                <div className='login-container' >
                <div className='login-intro'>Welcome back!</div>
                <div className='login-input-field '>
                        <img src={user_src} className='l-i-symbol disp-inline' />
                        <input className='login-field disp-inline' placeholder='Email Address' type="text"/>
                </div>
                <div className='login-divider'></div>
                <div className='login-btn' style={{marginTop:'60px'}} role="button">
                        <div className='l-btn-text'>Send me the link</div>
                </div>
                <div className='condition-text'>Or Sign in</div>
                <div className='copyright-text'>©2021 All Rights Reserved. Divanor</div>
            </div>
            </div>
        </div>
    )
}
