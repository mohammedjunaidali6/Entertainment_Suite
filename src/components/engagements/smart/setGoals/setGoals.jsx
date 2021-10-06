import React, { Fragment, useEffect, useState } from 'react';
import { TextField,Radio,RadioGroup, FormControlLabel,FormControl,FormLabel, Tooltip} from '@material-ui/core';
import DatePicker from 'react-datepicker';
import './setGoals.css';
import i_s_src from "../../../../assets/img/Goal_icon1.svg";
import i_s_selected_src from "../../../../assets/img/Goal_icon1_hover.svg";
import b_i_src from "../../../../assets/img/boost_icon2.svg";
import b_i_selected_src from "../../../../assets/img/boost_icon2_hover.svg";
import b_n_c_src from "../../../../assets/img/newcustomers.svg";
import b_n_c_selected_src from "../../../../assets/img/newcustomers_hover.svg";
import i_r_src from "../../../../assets/img/referral.svg";
import i_r_selected_src from "../../../../assets/img/referral_hover.svg";
import info from '../../../../assets/img/info.png';
import { CustomeDatePickerENGT } from '../../../common/global';

const preDefinedGoals = [
    { id: 1, heading: "Increase sales volume", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: true },
    { id: 2, heading: "Boost Inactive Customers", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false },
    { id: 3, heading: "Bring New Customers", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false },
    { id: 4, heading: "Increase Referral", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false },
    { id: 5, heading: "Boost Inactive Customers", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false },
    { id: 6, heading: "Increase sales volume", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false }
];

export default function SetGoals(props) {
    // console.log('***',props);
    let goal=props?.props?.setGoals;
    const [goalBoxes, setGoalBoxes] = useState(preDefinedGoals);
    const [engagement,setEngagement]=useState(goal||{});
    const [error, setError] = useState({});
    const [isTournament,setIsTournament]=useState(false);

    function goalBoxClick(boxData) {
        goalBoxes.forEach((obj) => {
            obj.isActive = false;
        });
        boxData.isActive = true;
    }
    const onTextChange = e => {
        setEngagement({...engagement,[e.target.name]:e.target.value});
        engagement[e.target.name]=e.target.value;
        props.getSetGoalsData(engagement);
    }
    const onRadio=e=>{
        let isTourn=(e.target.value==="1");
        setIsTournament(isTourn);
        setEngagement({...engagement,'isTournament':isTourn});
        engagement['isTournament']=isTourn;
        props.getSetGoalsData(engagement);
        if(!isTourn){
            setEngagement({...engagement,startDate:'',endDate:''});
        }
    }
    const onDateSelect=(key,date)=>{
        setEngagement({...engagement,[key]:date});
        engagement[key]=date;
        props.getSetGoalsData(engagement);
    }
    const sgChange=()=>{
        
    }

    useEffect(()=>{
        if(goal){
            setIsTournament(goal.isTournament)
            props.getSetGoalsData(goal);
        }
    },[]);

    return (
        <div id="set-goals-container" >
            <div className='ml-5 w-95 row'>
                <div className="w-45">
                    <TextField
                        name='campaignName'
                        label="Engagement Name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={error.campaignName}
                        helperText={error.campaignName}
                        value={engagement.campaignName}
                        onChange={onTextChange}
                        disabled={props?.updateEngagement}
                    />
                </div>
                <div className="ml-3 w-45">
                    <TextField
                        name='displayName'
                        label="Display Name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={error.displayName}
                        helperText={error.displayName}
                        value={engagement.displayName}
                        onChange={onTextChange}
                    />
                </div>
            </div>
            <div className='ml-5 mt-1 w-95 row' style={{pointerEvents:props.updateEngagement?'none':'',opacity:props.updateEngagement?'0.4':''}}>
                <div className='w-50'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Engagement Type</FormLabel>
                        <RadioGroup row aria-label="engagement-type" name="row-radio-buttons-group">
                            <FormControlLabel control={<Radio />} label="Normal" onChange={onRadio} value="0" checked={!isTournament}/>
                            <Tooltip 
                                title={<div className='tooltip-text'>Runs for a specified durations, and reward Winners based on their Game Performances.</div>}
                                placement='top'
                            >
                                <img src={info} className='mt-2' style={{ height: '20px', width: '20px' }} />
                            </Tooltip>
                            <FormControlLabel control={<Radio />} label="Tournament" onChange={onRadio} value="1"  checked={isTournament}/>
                            <Tooltip 
                                title={<div className='tooltip-text'>Runs till the specified Budget or Durations, Winners are chooses based on Probability.</div>} 
                                placement='top'
                            >
                                <img src={info} className='mt-2' style={{ height: '20px', width: '20px' }} />
                            </Tooltip>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className='w-40 row' style={{display:isTournament?'':'none'}}>
                    <div className='w-50'>
                        <div>Start Date</div>
                        <DatePicker
                            minDate={new Date()}
                            selected={engagement?.startDate||new Date()}
                            customInput={<CustomeDatePickerENGT/>} 
                            onChange={(date)=>onDateSelect('startDate',date)}
                        />
                    </div>
                    <div className='w-50'>
                        <div>End Date</div>
                        <DatePicker 
                            minDate={new Date()}
                            selected={engagement?.endDate||new Date()}
                            customInput={<CustomeDatePickerENGT/>}
                            onChange={(date)=>onDateSelect('endDate',date)}
                        />
                    </div>
                </div>
            </div>
            <div className="c-e-campaign-goal-sec w-100 float-left clearfix">
                <div className="c-e-campaign-goal-h">Set Goal for the Campaign</div>
                <div className="c-e-campaign-goal-boxes w-100 float-left clearfix">
                    {goalBoxes && goalBoxes.length > 0 ? (
                        <Fragment>
                            {goalBoxes.map((obj, indx) => (
                                <div 
                                    className={`c-e-campaign-goal-box w-33 float-left clearfix p-relative`} 
                                    key={obj.id} 
                                    onClick={() => goalBoxClick(obj)}
                                    style={{pointerEvents:indx==0?'':'none'}}
                                >
                                    <div className={`c-e-campaign-goal-box-inner w-100 float-left clearfix checkmark ${obj.isActive ? `selectedBox` : ``}  ${indx == 0 ? '' : 'grayed-goals'}`}>
                                        {/* <div className={`${obj.isActive ? `checkmark-circle`: `unmark-circle`}`}></div> */}
                                        <input id={`set-goal-chk${obj.id}`} type="checkbox" checked={obj.isActive} onChange={sgChange}></input>
                                        <div className="c-e-campaign-goal-box-inner-logo">
                                            {obj.id === 1 ? (
                                                <Fragment>
                                                    {obj.isActive ? (
                                                        <img src={i_s_selected_src} alt={obj.heading} />
                                                    ) : (
                                                        <img src={i_s_src} alt={obj.heading} />
                                                    )}
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    {obj.id === 2 ? (
                                                        <Fragment>
                                                            {obj.isActive ? (
                                                                <img src={b_i_selected_src} alt={obj.heading} />
                                                            ) : (
                                                                <img src={b_i_src} alt={obj.heading} />
                                                            )}
                                                        </Fragment>
                                                    ) : (
                                                        <Fragment>
                                                            {obj.id === 3 ? (
                                                                <Fragment>
                                                                    {obj.isActive ? (
                                                                        <img src={b_n_c_selected_src} alt={obj.heading} />
                                                                    ) : (
                                                                        <img src={b_n_c_src} alt={obj.heading} />
                                                                    )}
                                                                </Fragment>
                                                            ) : (
                                                                <Fragment>
                                                                    {obj.id === 4 ? (
                                                                        <Fragment>
                                                                            {obj.isActive ? (
                                                                                <img src={i_r_selected_src} alt={obj.heading} />
                                                                            ) : (
                                                                                <img src={i_r_src} alt={obj.heading} />
                                                                            )}
                                                                        </Fragment>
                                                                    ) : (
                                                                        <Fragment>
                                                                            {obj.id === 5 ? (
                                                                                <Fragment>
                                                                                    {obj.isActive ? (
                                                                                        <img src={b_i_selected_src} alt={obj.heading} />
                                                                                    ) : (
                                                                                        <img src={b_i_src} alt={obj.heading} />
                                                                                    )}
                                                                                </Fragment>
                                                                            ) : (
                                                                                <Fragment>
                                                                                    {obj.id === 6 ? (
                                                                                        <Fragment>
                                                                                            {obj.isActive ? (
                                                                                                <img src={b_n_c_selected_src} alt={obj.heading} />
                                                                                            ) : (
                                                                                                <img src={b_n_c_src} alt={obj.heading} />
                                                                                            )}
                                                                                        </Fragment>
                                                                                    ) : (
                                                                                        null
                                                                                    )}
                                                                                </Fragment>
                                                                            )}
                                                                        </Fragment>
                                                                    )}
                                                                </Fragment>
                                                            )}
                                                        </Fragment>
                                                    )}
                                                </Fragment>
                                            )}
                                        </div>
                                        <div className="c-e-campaign-goal-box-inner-h" style={{fontSize:'18px'}}>{obj.heading}</div>
                                        <div className="c-e-campaign-goal-box-inner-desc" style={{fontSize:'12px'}}>{obj.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </Fragment>
                    ) : null}
                </div>
            </div>
        </div >
    )
}
