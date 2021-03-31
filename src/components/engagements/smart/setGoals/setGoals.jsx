import React, { Fragment, useEffect, useState } from 'react';
import { FormBuilder, FieldGroup, FieldControl, Validators } from "react-reactive-form";
import { TextInput } from "../../../common/utils/textInput";
import icon_src from "../../../../assets/img/Engagements.svg";
import i_s_src from "../../../../assets/img/Goal_icon1.svg";
import i_s_selected_src from "../../../../assets/img/Goal_icon1_hover.svg";
import b_i_src from "../../../../assets/img/boost_icon2.svg";
import b_i_selected_src from "../../../../assets/img/boost_icon2_hover.svg";
import b_n_c_src from "../../../../assets/img/newcustomers.svg";
import b_n_c_selected_src from "../../../../assets/img/newcustomers_hover.svg";
import i_r_src from "../../../../assets/img/referral.svg";
import i_r_selected_src from "../../../../assets/img/referral_hover.svg";
import { storeDataFn } from "../../../common/global";

import './setGoals.css';

const tempArray = [
    {id: 1, heading: "Increase sales volume", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false},
    {id: 2, heading: "Boost Inactive Customers", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false},
    {id: 3, heading: "Bring New Customers", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false},
    {id: 4, heading: "Increase Referral", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false},
    {id: 5, heading: "Boost Inactive Customers", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false},
    {id: 6, heading: "Increase sales volume", desc: "This is a campaign to increase sales activity .Lorem Ipsum is simply dummy text of the printing and typesetting industry.", isActive: false}
];

const setGoalForm = FormBuilder.group({
    campaignName: [storeDataFn('EngagementsSmartReducer', 'setGoals') ? storeDataFn('EngagementsSmartReducer', 'setGoals')['campaignName'] : "", Validators.required],
    displayName: [storeDataFn('EngagementsSmartReducer', 'setGoals') ? storeDataFn('EngagementsSmartReducer', 'setGoals')['displayName'] : "", Validators.required],
    goal: [storeDataFn('EngagementsSmartReducer', 'setGoals') ? storeDataFn('EngagementsSmartReducer', 'setGoals')['goal'] : "", Validators.required]
});

export default function SetGoals(props) {
    const [goalBoxes, setGoalBoxes] = useState(tempArray);
    function changeHandler() {
        setGoalForm.patchValue({
            campaignName: setGoalForm.controls.campaignName.value,
            displayName: setGoalForm.controls.displayName.value
        });
        props.getSetGoalsFormValues(setGoalForm.value, setGoalForm.status);
    }
    function goalBoxClick(boxData) {
        goalBoxes.forEach((obj) => {
            obj.isActive = false;
        });
        boxData.isActive = true;
        setGoalForm.patchValue({
            campaignName: setGoalForm.controls.campaignName.value,
            displayName: setGoalForm.controls.displayName.value,
            goal: boxData
        });
        props.getSetGoalsFormValues(setGoalForm.value, setGoalForm.status);
        console.log('goalBoxes', goalBoxes);
    }
    const sgChange = () => {
        
    }

    return (
        <div id="set-goals-container" >
            <div className="c-e-campaign-sec">
                <FieldGroup
                    control={setGoalForm}
                    render={({ get, invalid }) => (
                        <form>
                            <div className="w-50 float-left clearfix setGoalForm-input-sec">
                                <span className="setGoalForm-input-lbl">Campaign Name*</span>
                                <FieldControl name="campaignName" className="pt-0"
                                    render={TextInput} 
                                    meta={{ label: "Campaign Name" , maxlen: 100, showError: true, placeholder: false }} />
                            </div>
                            <div className="w-50 float-left clearfix setGoalForm-input-sec">
                                <span className="setGoalForm-input-lbl">Display Name*</span>
                                <FieldControl name="displayName"  className="pt-0"
                                    render={TextInput} 
                                    meta={{ label: "Display Name" , maxlen: 300, showError: true, placeholder: false }} />
                            </div>
                        </form>
                    )}
                />
            </div>
            <div className="c-e-campaign-goal-sec w-100 float-left clearfix">
                <div className="c-e-campaign-goal-h">Set Goal for the Campaign</div>
                <div className="c-e-campaign-goal-boxes w-100 float-left clearfix">
                    {goalBoxes && goalBoxes.length > 0 ? (
                        <Fragment>
                            {goalBoxes.map((obj) => (
                                <div className={`c-e-campaign-goal-box w-33 float-left clearfix p-relative`} key={obj.id} onClick={() => goalBoxClick(obj)}>
                                    <div className={`c-e-campaign-goal-box-inner w-100 float-left clearfix checkmark ${obj.isActive ? `selectedBox` : ``}`}>
                                        {/* <div className={`${obj.isActive ? `checkmark-circle`: `unmark-circle`}`}></div> */}
                                        <input id={`set-goal-chk${obj.id}`} type="checkbox" checked={obj.isActive ? true : false} onChange={sgChange}></input>
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
                                        <div className="c-e-campaign-goal-box-inner-h">{obj.heading}</div>
                                        <div className="c-e-campaign-goal-box-inner-desc">{obj.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </Fragment>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
