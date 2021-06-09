import React, { useState, Fragment } from 'react';
import './alertBox.css';

export default function Alert(props) {

    const onYesClick = () => {
        console.log('***', 'YES');
        props.onAlertClick(true);
    }

    const onNoClick = () => {
        console.log('***', 'NO');
        props.onAlertClick(false);
    }

    return (
        <div
            className='group-alert'
            style={{ position: 'absolute', zIndex: '9999', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className='rectangle-alert rectangle-copy'>
                <div>
                    <h6 className='alert-title'>
                        {props.title}
                    </h6>
                    <p className='alert-text'>
                        {props.text}
                    </p>
                </div>
                <div className='horizontal-line'></div>
                <div className='row'>
                    <button className='discard' onClick={onNoClick}>No</button>
                    <button className='save save-rectangle' onClick={onYesClick}>Yes</button>
                </div>
            </div>
        </div>
    )
}