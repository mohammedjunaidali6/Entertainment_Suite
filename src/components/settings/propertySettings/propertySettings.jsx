import React, { useState, Fragment } from 'react';
import edit_src from '../../../assets/img/Edit_black.svg';
import './propertySettings.css';

export default function PropertySettings(props) {
    const[editClick, setEditClick] = useState(false);

    function editClickHandler(){
        setEditClick(true);
    }
    return (
        <Fragment>
            <div id="property-settings-container">
                <div>
                    <div className='p-s-url-input-label'>Property Name</div>
                    {!editClick ? (
                    <Fragment>
                    <input className= 'p-s-url-input disp-inline-block' placeholder='Enter a valid url for your website' type="text"/>
                    <div role="button" className='verify-ownership-btn disp-inline-block'>
                        <div className='verify-btn-text'>Verify ownership</div>
                    </div>
                    <div className='p-s-edit-btn disp-inline-block' onClick={editClickHandler}>
                        <img src={edit_src} className='p-s-edit-btn-symbol disp-inline-block' />
                        <div className='p-s-edit-btn-text disp-inline-block'>Edit</div>
                    </div>
                    </Fragment> ):null}
                </div>
            </div>
        </Fragment>
    )
}
