import React from "react";

import Resizer from "../../../common/resizer/resizer";
import './stepper.css';

export default function EStepper(props) {
    console.log('props', props);
    return (
        <div id="e-stepper-container" className={`w-40 ${props.thumbHide ? `thumb-hide` : ``}`}>
            <div className="c-s-stepper-h">{props.stepName ? props.stepName : 'Step Name'}</div>
            {props.stepCount ? (
                <div className="w-100 float-left clearfix c-s-stepper-m">
                    <div className="w-10 float-left clearfix c-s-stepper-sub-lbl">Step - {props.stepCount}</div>
                    <div className="w-80 float-left clearfix">
                        <Resizer 
                            minSize={0} 
                            maxSize={5 * 20} 
                            initialSize={props.stepCount * 20} 
                            id='stepIndicationResizer'
                            fromCEStepper={true} />
                    </div>
                    <div className="w-10 float-left clearfix">
                        <span className="c-s-stepper-sub-lbl">{props.stepCount * 20}%</span>
                    </div>
                </div>
            ) : null}
        </div>
    )
}