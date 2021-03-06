import React from 'react';
import Select from 'react-select';

import './targetAudience.css';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export default function TargetAudience(props) {

    return (
        <div id="target-audience-container" className="c-e-target-sec w-100 float-left clearfix">
            <div className="w-100 float-left clearfix c-e-target-h">Select Target Audience for the Engagement</div>
            <div className="c-e-target-content w-100 float-left clearfix">
                <div className="w-85 float-left clearfix c-e-target-left-box-con">
                    <div className="w-100 float-left clearfix">
                        <div className="w-60 float-left clearfix c-e-target-b-box"></div>
                        <div className="w-40 float-left clearfix c-e-target-pur-box"></div>
                    </div>
                    <div className="w-100 float-left clearfix">
                        <div className="w-45 float-left clearfix c-e-target-pur-box"></div>
                        <div className="w-35 float-left clearfix c-e-target-l-pur-box"></div>
                        <div className="w-20 float-left clearfix c-e-target-dp-box"></div>
                    </div>
                </div>
                <div className="w-15 float-left clearfix c-e-target-p-box"></div>
            </div>
            <div className="w-100 float-left clearfix c-e-target-p-rule">Purchase Rule </div>
            <div className="w-100 float-left clearfix c-e-target-p-rule-opt">
                <Select options={options} className="w-40 p-r-10 float-left clearfix" />
                <Select options={options} className="w-15 p-r-10 float-left clearfix" />
                <Select options={options} className="w-15 p-r-10 float-left clearfix" />
                <Select options={options} className="w-5 p-r-10 float-left clearfix" />
                <Select options={options} className="w-10 p-r-10 float-left clearfix" />
            </div>
        </div>
    )
}
