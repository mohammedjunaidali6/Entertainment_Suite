import React, { Fragment, useEffect, useState } from 'react';
import { FormBuilder, FieldGroup, FieldControl, Validators } from "react-reactive-form";
import { TextInput } from "../../../common/utils/textInput";
import icon_src from "../../../../assets/img/Engagements.svg";

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
    campaignName: ["", Validators.required],
    displayName: ["", Validators.required],
    goal: ["", Validators.required]
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
        boxData.isActive = true;
        setGoalForm.patchValue({
            campaignName: setGoalForm.controls.campaignName.value,
            displayName: setGoalForm.controls.displayName.value,
            goal: boxData
        });
        // console.log('setGoalForm', setGoalForm);
        props.getSetGoalsFormValues(setGoalForm.value, setGoalForm.status);
    }

    return (
        <div id="set-goals-container" >
            <div className="c-e-campaign-sec">
                <FieldGroup
                    control={setGoalForm}
                    render={({ get, invalid }) => (
                        <form>
                            <div className="w-50 float-left clearfix setGoalForm-input-sec">
                                <FieldControl name="campaignName" 
                                    render={TextInput} 
                                    meta={{ label: "Campaign Name" , maxlen: 100, showError: true }} />
                            </div>
                            <div className="w-50 float-left clearfix setGoalForm-input-sec">
                                <FieldControl name="displayName" 
                                    render={TextInput} 
                                    meta={{ label: "Display Name" , maxlen: 300, showError: true }} />
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
                                <div className="c-e-campaign-goal-box w-33 float-left clearfix p-relative" key={obj.id} onClick={() => goalBoxClick(obj)}>
                                    <div className="c-e-campaign-goal-box-inner w-100 float-left clearfix checkmark">
                                        {/* <div className={`${obj.isActive ? `checkmark-circle`: `unmark-circle`}`}></div> */}
                                        <div className="c-e-campaign-goal-box-inner-logo">
                                            <img src={icon_src} alt={obj.heading} />
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
