import React from 'react';
import user_src from '../../assets/img/user_login.svg';
import email_src from '../../assets/img/email.svg';
import Organization_src from '../../assets/img/Organization.svg';
import logo_src from '../../assets/img/logo_color.svg';

import './register.css';

export default function Register(props) {

    function loginOpenFn(){
        props.history.push("/login")
    }
    return (
        <div id="register-container" >
            <img src={logo_src} className='login-logo' />
            <div className='dont-have-account'>Already have an account?
            <span className='l-page-navigator' onClick={loginOpenFn}>Login</span></div>
           <div className='login-outer-container'>
               <div className='login-container' style={{height:'480px'}}>
                   <div className='login-intro'>Create your account</div>
                   <div className='login-input-field '>
                        <img src={user_src} className='l-i-symbol disp-inline' alt=""/>
                        <input className='login-field disp-inline' placeholder='Full Name' type="text"/>
                    </div>
                    {/* <div className='login-divider'></div> */}
                    <div className='login-input-field '>
                        <img src={email_src} className='l-i-symbol disp-inline' alt=""/>
                        <input className='login-field disp-inline' placeholder='E-mail' type="text"/>
                    </div>
                    
                    {/* <div className='login-divider'></div> */}
                    <div className='login-input-field '>
                         <img src={Organization_src} className='l-i-symbol disp-inline' alt=""/>
                        <input className='login-field disp-inline' placeholder='Organization Name' type="text"/>
                    </div>
                    {/* <div className='login-divider'></div> */}
                    <div className='login-input-field '>
                        {/* <img src={} className='l-i-symbol disp-inline' /> */}
                        <input className='login-field disp-inline' placeholder='Phone Number' type="text"/>
                    </div>
                    {/* <div className='login-divider'></div> */}
                    <div className='login-btn' style={{ marginTop:'40px'}}>
                        <div className='l-btn-text'>Create My Account</div>
                    </div>
                    <div className='condition-text'>By signing up, you are agreeing to Divanor Terms & Conditions</div>
                    <div className='copyright-text'>©2021 All Rights Reserved. Divanor</div>
               </div>
           </div>
        </div>
    )
}
