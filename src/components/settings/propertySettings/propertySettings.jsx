import React, { useState, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import edit_src from '../../../assets/img/Edit_black.svg';
import verified_src from '../../../assets/img/Verified.svg';
import email_config_src from '../../../assets/img/Email_Configurations.svg';
import { containerHeightCalcFn } from '../../common/global';
import './propertySettings.css';
import { getAuthAndData, postAuthAndData } from '../../../api/ApiHelper';
import { GET_TENANT_SETTINGS, SAVE_TENANT_SETTINGS, SETTINGS_TEMPLATE, SOMETHING_WENT_WRONG, TENT_PROD_HOST_URI } from '../../../api/apiConstants';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import createNotification from '../../common/reactNotification';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '60ch',
    },
  },
}));


export default function PropertySettings(props) {
    let history = useHistory();
    const classes = useStyles();
    const[editClick, setEditClick] = useState(false);
    const[inputActive, setInputActive] = useState(true);
    const [settingsTemplate,setSettingsTemplate]=useState();
    const [tenantSettings,setTenantSettings]=useState();
    
    const [identityConfig,setIdentityConfig]=useState({
        primary_group_name:'Identity',
        secondary_group_name:'Identity',
        config:[]
    });
    const [gmailConfig,setGmailConfig]=useState({
        primary_group_name:'Email',
        secondary_group_name:'Gmail',
        config:[]
    });
    const [smtpConfig,setSmtpConfig]=useState({
        primary_group_name:'Email',
        secondary_group_name:'SMTP',
        config:[]
    });
    const [commerceConfig,setCommerceConfig]=useState({
        primary_group_name:'Commerce',
        secondary_group_name:'Loyality',
        config:[]
    });

    function editClickEnabler(){
        setEditClick(true);
        setInputActive(false);
    }

    function editClickDisabler(){
        setEditClick(false);
        setInputActive(true);
    }
    const handleResponseCode=(resp)=> {
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG +' in PropertySettings');
            return false;
        } else {
            return true;
        }
    }
    const handleLoader = (showBool) => {
        props.parentProps.routeActionHandler.dispatchLoaderData(showBool);
    }

    const setIdentityConfiguration=(e)=>{
        let obj={
            KeyName:e.target.name,
            KeyValue:e.target.value,
            TemplateID:e.target.id
        }
        let arr=[...identityConfig.config];
        var index=arr.findIndex(i=>i.TemplateID==obj.TemplateID);
        if(index===-1){
            arr.push(obj);
        }else{
            arr.splice(index,1,obj);
        }
        // console.log("i1"+identityConfig)
        setIdentityConfig({...identityConfig,config:arr});
        // console.log("i2"+identityConfig)
    }
    const onIdentitySave=()=>{
        let postDataArr=[];
        identityConfig.config?.length>0&&identityConfig.config.forEach(idty=>{
        let postObj= {
                PrimaryGroup:identityConfig.primary_group_name,
                SecondaryGroup:identityConfig.secondary_group_name,
                SettingsTemplateID:idty.TemplateID,
                KeyName:idty.KeyName,
                KeyValue:idty.KeyValue,
            }
            postDataArr.push(postObj);
        })
        saveTenantSettings(postDataArr);
    }

    const setGmailConfiguration=(e)=>{
        let obj={
            KeyName:e.target.name,
            KeyValue:e.target.value,
            TemplateID:e.target.id
        }
        let arr=[...gmailConfig.config];
        var index=arr.findIndex(i=>i.TemplateID==obj.TemplateID);
        if(index===-1){
            arr.push(obj);
        }else{
            arr.splice(index,1,obj);
        }
        setGmailConfig({...gmailConfig,config:arr});
        // console.log("g2"+gmailConfig[0])
    }
    const setSmtpConfiguration=(e)=>{
        let obj={
            KeyName:e.target.name,
            KeyValue:e.target.value,
            TemplateID:e.target.id
        }
        let arr=[...smtpConfig.config];
        // console.log("arr1"+arr[0].TemplateID)
        
        var index=arr.findIndex(i=>i.TemplateID==obj.TemplateID);
        if(index===-1){
            arr.push(obj);
        }else{
            arr.splice(index,1,obj);
        }
        // console.log("s1"+smtpConfig)
        setSmtpConfig({...smtpConfig,config:arr});
        // console.log("s2"+smtpConfig)
    }
    const onEmailConfigSave=()=>{
        let postDataArr=[];
        gmailConfig.config?.length>0&&gmailConfig.config.forEach(gmail=>{
        let postObj= {
                PrimaryGroup:gmailConfig.primary_group_name,
                SecondaryGroup:gmailConfig.secondary_group_name,
                SettingsTemplateID:gmail.TemplateID,
                KeyName:gmail.KeyName,
                KeyValue:gmail.KeyValue,
            }
            postDataArr.push(postObj);
        })
        smtpConfig.config?.length>0&&smtpConfig.config.forEach(smtp=>{
            let postObj= {
                    PrimaryGroup:smtpConfig.primary_group_name,
                    SecondaryGroup:smtpConfig.secondary_group_name,
                    SettingsTemplateID:smtp.TemplateID,
                    KeyName:smtp.KeyName,
                    KeyValue:smtp.KeyValue,
                }
                postDataArr.push(postObj);
            })
        saveTenantSettings(postDataArr);
    }

    const setCommerceConfiguration=(e)=>{
        let obj={
            KeyName:e.target.name,
            KeyValue:e.target.value,
            TemplateID:e.target.id
        }
        let arr=[...commerceConfig.config];
        var index=arr.findIndex(i=>i.TemplateID==obj.TemplateID);
        if(index===-1){
            arr.push(obj);
        }else{
            arr.splice(index,1,obj);
        }

        // var ndx=tenantSettings.findIndex(i=>i.settings_template_id===obj.TemplateID);
        // if(ndx!==-1){
        //     var found=tenantSettings.find(i=>i.settings_template_id===obj.TemplateID);
        //     found.key_value=obj.KeyValue;
        //     var settingsArr=[...tenantSettings];
        //     settingsArr.splice(ndx,1,found);
        //     setTenantSettings(settingsArr);
        // }

        setCommerceConfig({...commerceConfig,config:arr});
    }
    const onCommerceSave=()=>{
        let postDataArr=[];
        commerceConfig.config?.length>0&&commerceConfig.config.forEach(comm=>{
        let postObj= {
                PrimaryGroup:commerceConfig.primary_group_name,
                SecondaryGroup:commerceConfig.secondary_group_name,
                SettingsTemplateID:comm.TemplateID,
                KeyName:comm.KeyName,
                KeyValue:comm.KeyValue,
            }
            postDataArr.push(postObj);
        })
        saveTenantSettings(postDataArr);
    }

    const saveTenantSettings=(data)=>{
        // console.log(data);
        handleLoader(true);
        console.log(data)
        postAuthAndData(`${TENT_PROD_HOST_URI}${SAVE_TENANT_SETTINGS}`,data,history)
        .then(res=>{
            if(handleResponseCode(res)){
                console.log(res)
                createNotification('success','Configuration Saved Succesfully');
            }else{
                createNotification('error','Configuration Saving failed');
            }
            handleLoader(false);
        })
    }

    useEffect(()=>{
        handleLoader(true);
        getAuthAndData(`${TENT_PROD_HOST_URI}${SETTINGS_TEMPLATE}`)
        .then(res=>{
            if(handleResponseCode(res)){
                // console.log('***',res.data);
                var grouped=_.groupBy(res.data,obj=>obj.primary_group_name);
                setSettingsTemplate(grouped);
            }
        })

        getAuthAndData(`${TENT_PROD_HOST_URI}${GET_TENANT_SETTINGS}`)
        .then(res=>{
            if(handleResponseCode(res)){
                // console.log('{**{}**}',res.data);
                var grouped=_.groupBy(res.data,obj=>obj.primary_group);
                var identitySecondGroups=_.groupBy(grouped?.Identity,obj=>obj.secondary_group);
                var emailSecondGroups=_.groupBy(grouped?.Email,obj=>obj.secondary_group);
                var commerceSecondGroups=_.groupBy(grouped?.Commerce,obj=>obj.secondary_group);
                
                let idty=[];let gmail=[]; let smtp=[]; let commerce=[];
                identitySecondGroups?.Identity?.map(identy=>{
                    let obj={
                        KeyName:identy.key_name,
                        KeyValue:identy.key_value,
                        TemplateID:identy.settings_template_id,
                    }
                    idty.push(obj);
                })
                emailSecondGroups?.Gmail?.map(gm=>{
                    let obj={
                        KeyName:gm.key_name,
                        KeyValue:gm.key_value,
                        TemplateID:gm.settings_template_id,
                    }
                    gmail.push(obj);
                })
                emailSecondGroups?.SMTP?.map(sm=>{
                    let obj={
                        KeyName:sm.key_name,
                        KeyValue:sm.key_value,
                        TemplateID:sm.settings_template_id,
                    }
                    smtp.push(obj);
                })
                commerceSecondGroups?.Commerce?.map(comm=>{
                    let obj={
                        KeyName:comm.key_name,
                        KeyValue:comm.key_value,
                        TemplateID:comm.settings_template_id,
                    }
                    commerce.push(obj);
                })
                setIdentityConfig({...identityConfig,config:idty});
                setGmailConfig({...gmailConfig,config:gmail});
                setSmtpConfig({...smtpConfig,config:smtp});
                setCommerceConfig({...commerceConfig,config:commerce});
            }
            handleLoader(false);
        })
        
    },[])

    var identitySecondaryGroups=_.groupBy(settingsTemplate?.Identity,obj=>obj.secondary_group_name);
    var emailSecondaryGroups=_.groupBy(settingsTemplate?.Email,obj=>obj.secondary_group_name);
    var commerceSecondaryGroups=_.groupBy(settingsTemplate?.Commerce,obj=>obj.secondary_group_name);

    
    return (
        <div id="property-settings-container">
                <NotificationContainer/>
                {/* <div className='p-s-input-container'>
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
                    </Fragment>
                    : 
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
                    } 
                </div>*/}
                <div style={{height: containerHeightCalcFn(825)}}>
                    <div className='email-config-block'>
                        <img className='p-s-block-img disp-inline-block' src={email_config_src} alt=""/>
                        <div className='p-s-headers disp-inline-block'>Identity Configuration</div>
                            <form className={classes.root} noValidate autoComplete="off">
                            <div style={{fontSize:'12px'}}><b>Identity</b></div>
                                {identitySecondaryGroups?.Identity&&identitySecondaryGroups.Identity.length>0?
                                    <>
                                        {identitySecondaryGroups.Identity.map(obj=>
                                            <TextField 
                                                id={obj.settings_template_id}
                                                className='settings-text-box'
                                                name={obj.key_name}
                                                label={obj.key_name_display}
                                                variant="outlined"
                                                onChange={setIdentityConfiguration}
                                                value={identityConfig?.config?.find(i=>i.TemplateID===obj.settings_template_id)?.KeyValue}
                                                inputProps={{ maxLength: 50 }}
                                            />
                                        )}
                                        <br/>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            style={{width:'10%'}} 
                                            onClick={onIdentitySave}
                                        >Save</Button>
                                    </>
                                    :
                                    null
                                }
                            </form>
                    </div>
                    <div className='email-config-block'>
                        <img className='p-s-block-img disp-inline-block' src={email_config_src} alt=""/>
                        <div className='p-s-headers disp-inline-block'>Email Configuration</div>
                            <form className={classes.root} noValidate autoComplete="off">
                                <div style={{fontSize:'12px'}}><b>Gmail</b></div>
                                {(emailSecondaryGroups?.Gmail||emailSecondaryGroups?.SMTP)?
                                <>
                                    {emailSecondaryGroups?.Gmail&&emailSecondaryGroups?.Gmail.map(obj=>
                                        <TextField 
                                            id={obj.settings_template_id}
                                            name={obj.key_name} 
                                            label={obj.key_name_display} 
                                            className='settings-text-box'
                                            variant="outlined"
                                            onChange={(e)=>{return setGmailConfiguration(e)}}
                                            value={gmailConfig.config.find(i=>i.TemplateID==obj.settings_template_id)?.KeyValue}
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    )}
                                    <div style={{fontSize:'12px'}}><b>SMTP</b></div>
                                    {emailSecondaryGroups?.SMTP&&emailSecondaryGroups?.SMTP.map(obj=>
                                        <TextField 
                                            id={obj.settings_template_id}
                                            name={obj.key_name} 
                                            label={obj.key_name_display} 
                                            variant="outlined"
                                            onChange={setSmtpConfiguration}
                                            value={smtpConfig?.config?.find(i=>i.TemplateID==obj.settings_template_id)?.KeyValue||null}
                                            inputProps={{ maxLength: 50 }}
                                        />
                                        )
                                    }
                                    <br/>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        style={{width:'10%'}} 
                                        onClick={onEmailConfigSave}
                                    >Save</Button>
                                </>
                                :
                                null
                                }
                            </form>
                    </div>
                    <div className='email-config-block'>
                        <img className='p-s-block-img disp-inline-block' src={email_config_src} alt=""/>
                        <div className='p-s-headers disp-inline-block'>Commerce Configuration</div>
                            <form className={classes.root} noValidate autoComplete="off">
                            <div style={{fontSize:'12px'}}><b>Commerce</b></div>
                                {commerceSecondaryGroups?.Commerce&&commerceSecondaryGroups.Commerce.length>0?
                                    <>
                                        {commerceSecondaryGroups.Commerce.map(obj=>
                                        <TextField
                                            id={obj.settings_template_id}
                                            name={obj.key_name} 
                                            label={obj.key_name_display} 
                                            variant="outlined"
                                            onChange={setCommerceConfiguration}
                                            value={commerceConfig?.config?.find(i=>i.TemplateID==obj.settings_template_id)?.KeyValue}
                                            inputProps={{ maxLength: 10 }}
                                        />
                                        )}
                                        <br/>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            style={{width:'10%'}} 
                                            onClick={onCommerceSave}
                                        >Save</Button>
                                    </>
                                    :
                                    null
                                }
                            </form>
                    </div>
                </div>
            </div>
    )
}
