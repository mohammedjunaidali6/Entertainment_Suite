import React, { useState } from 'react';
import email_src from '../../assets/img/email.svg';
import password_src from '../../assets/img/password.svg';
import logo_src from '../../assets/img/blaash-logo.png';
import './login.css';

export default function POC(props) {

    const [loggedIn, setLoggedIn] = useState({ userName: '', password: '' });

    function registerOpenFn() {
        //props.history.push('/register');
    }

    const loginClickFn = () => {
        //if (loggedIn.userName === 'mohit.mohan@blaash.io' && loggedIn.password === 'Blaash@2021') {
        window.location.href = '/';
        localStorage.setItem('loggedIn', true);
        // } else {
        //     alert('Invalid credentials!');
        // }
    }

    return (
        <div id="login-container" >
            <img src={logo_src} className='login-logo' />
            <div className='dont-have-account'>Don't have an account?&nbsp;
                <span className='l-page-navigator' onClick={registerOpenFn}>Sign Up</span></div>

            <div className='login-outer-container'>
                <div className='login-container' containerHeightCalcFn={0}>
                    <div className='login-intro'>Login to Your Account</div>
                    <div className='login-input-field '>
                        <img src={email_src} className='l-i-symbol disp-inline' />
                        <input
                            className='login-field disp-inline'
                            placeholder='Email Address'
                            onChange={e => setLoggedIn({ ...loggedIn, userName: e.target.value })}
                        />
                    </div>
                    <div className='login-divider'></div>
                    <div className='login-input-field '>
                        <img src={password_src} className='l-i-symbol disp-inline' />
                        <input
                            className='login-field disp-inline'
                            placeholder='Enter Password'
                            type="password"
                            onChange={e => setLoggedIn({ ...loggedIn, password: e.target.value })}
                        />
                    </div>
                    <div className='login-divider'></div>
                    <div className='l-forget-password'></div>
                    <div className='login-btn' role="button" onClick={loginClickFn}>
                        <div className='l-btn-text'>Login Now</div>
                    </div>
                    <div className='copyright-text'>©2021 All Rights Reserved.</div>
                </div>
            </div>
        </div>
    )
}
