import React, { useState, Fragment } from 'react';
import edit_src from '../../../assets/img/Edit_black.svg';
import verified_src from '../../../assets/img/Verified.svg';
import email_config_src from '../../../assets/img/Email_Configurations.svg';
import info_src from '../../../assets/img/info.svg';
import setting_opt1 from '../../../assets/img/segment_filter.svg';
import Configuration from '../../../assets/img/Configurations.svg';
import setting_opt2 from '../../../assets/img/Setting_option.svg';
import Tooltip from '@material-ui/core/Tooltip';
import { containerHeightCalcFn } from '../../common/global';
import './propertySettings.css';

export default function PropertySettings(props) {
    const[editClick, setEditClick] = useState(false);
    const[inputActive, setInputActive] = useState(true);

    function editClickEnabler(){
        setEditClick(true);
        setInputActive(false);
    }

    function editClickDisabler(){
        setEditClick(false);
        setInputActive(true);
    }
    return (
        <Fragment>
            <div id="property-settings-container">
                <div className='p-s-input-container'>
                    <div className='p-s-url-input-label'>Property Name</div>
                    {!editClick ? (
                    <Fragment>
                     <div className='disp-inline-block'>   
                    <input className= 'p-s-url-input' placeholder='Enter a valid url for your website' type="text"/>
                     <div className='p-s-ex'>Eg: www.yoursite.com</div> 
                     </div> 
                    <div className='verify-ownership-btn disp-inline-block'>
                        <div className='verify-btn-text'>Verify ownership</div>
                    </div>
                    <div className='p-s-edit-btn disp-inline-block' onClick={editClickEnabler}>
                        <div style={{margin:'10px', marginTop:'5px'}}>
                            <img src={edit_src} className='p-s-edit-btn-symbol disp-inline-block' />
                            <div className='p-s-edit-btn-text disp-inline-block'>Edit</div>
                        </div>
                    </div>
                    </Fragment> ):(
                        <Fragment>
                            <div className='disp-inline-block'>
                                <input className= 'p-s-url-input' placeholder='www.mywebsite.com' type="text"/>
                                <div className='p-s-ex'>Eg: www.yoursite.com</div>
                            </div>
                            <img src={verified_src} style={{position:'relative', bottom: '25px'}}/>
                            <div className='p-s-verify disp-inline-block'>Verified</div>
                            <div className='p-s-verify-another-site disp-inline-block'>Verify Another site</div>
                            <div className='p-s-save-change' onClick={editClickDisabler}>
                                <div className='p-s-save-change-text'>Save Changes</div>
                            </div>
                        </Fragment>
                    )}
                </div>
                <div className="" style={{height: containerHeightCalcFn(325)}}>
                    <div className='email-config-block'>
                        <img className='p-s-block-img disp-inline-block' src={email_config_src} alt=""/>
                        <div className='p-s-headers disp-inline-block'>Email Configuration</div>
                        <div style={{marginLeft:'30px'}}>
                            <div className='p-s-input-label'>Email Server</div>
                            <input type="text" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                            <Tooltip title="Help or details will load here">
                                <img src={info_src} alt="" className='p-s-info'/>
                            </Tooltip>
                            <div className='p-s-input-label'>User Name</div>
                            <input type="text" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                            <Tooltip title="Help or details will load here">
                                <img src={info_src} alt="" className='p-s-info'/>
                            </Tooltip>

                            <div className='p-s-input-label'>Password</div>
                            <input type="password" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                            <Tooltip title="Help or details will load here">
                                <img src={info_src} alt="" className='p-s-info'/>
                            </Tooltip>
                        </div>
                    </div>   
                    <div className='setting-opt'>
                        <img className='p-s-block-img disp-inline-block' src={setting_opt1} alt=""/>
                            <div className='p-s-headers disp-inline-block'>Setting option</div>
                            <div style={{marginLeft:'30px'}}>
                                <div className='p-s-input-label'>Attribute 1</div>
                                <input type="text" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                                <Tooltip title="Help or details will load here">
                                    <img src={info_src} alt="" className='p-s-info'/>
                                </Tooltip>

                                <div className='p-s-input-label'>Attribute 1</div>
                                <input type="text" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                                <Tooltip title="Help or details will load here">
                                    <img src={info_src} alt="" className='p-s-info'/>
                                </Tooltip>

                                <div className='p-s-input-label'>Attribute 1</div>
                                <input type="password" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                                <Tooltip title="Help or details will load here">
                                    <img src={info_src} alt="" className='p-s-info'/>
                                </Tooltip>
                            </div>
                    </div>
                    <div className='congig-block'>
                        <img className='p-s-block-img disp-inline-block' src={Configuration} alt=""/>
                            <div className='p-s-headers disp-inline-block'>Configurations</div>
                            <div style={{marginLeft:'30px'}}>
                                <div className='p-s-input-label'>Email Server</div>
                                <input type="text" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                                <Tooltip title="Help or details will load here">
                                    <img src={info_src} alt="" className='p-s-info'/>
                                </Tooltip>

                                <div className='p-s-input-label'>User Name</div>
                                <input type="text"  disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                                <Tooltip title="Help or details will load here">
                                    <img src={info_src} alt="" className='p-s-info'/>
                                </Tooltip>

                                <div className='p-s-input-label'>Password</div>
                                <input type="password" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                                <Tooltip title="Help or details will load here">
                                    <img src={info_src} alt="" className='p-s-info'/>
                                </Tooltip>
                            </div>
                    </div>
                    <div className='setting-opt'>
                        <img className='p-s-block-img disp-inline-block' src={setting_opt2} alt=""/>
                            <div className='p-s-headers disp-inline-block'>Setting option</div>
                            <div style={{marginLeft:'30px'}}>
                                <div className='p-s-input-label'>Attribute 1</div>
                                <input type="text" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                                <Tooltip title="Help or details will load here">
                                    <img src={info_src} alt="" className='p-s-info'/>
                                </Tooltip>

                                <div className='p-s-input-label'>Attribute 1</div>
                                <input type="text" disabled={inputActive}  className='p-s-input disp-inline-block' placeholder='Enter'/>
                                <Tooltip title="Help or details will load here">
                                    <img src={info_src} alt="" className='p-s-info'/>
                                </Tooltip>

                                <div className='p-s-input-label'>Attribute 1</div>
                                <input type="password" disabled={inputActive} className='p-s-input disp-inline-block' placeholder='Enter'/>
                                <Tooltip title="Help or details will load here">
                                    <img src={info_src} alt="" className='p-s-info'/>
                                </Tooltip>
                            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
