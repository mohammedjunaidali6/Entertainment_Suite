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
                        <div className="w-60 float-left clearfix c-e-t-box c-e-target-b-box">
                            <div className="w-100 float-left clearfix c-r-t-box-n">New Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className=" c-r-t-box-c float-left">5345</div>
                                <div className=" c-r-t-box-per float-left">28%</div>
                            </div>
                        </div>
                        <div className="w-40 float-left clearfix c-e-t-box c-e-target-pur-box">
                            <div className="w-100 float-left clearfix c-r-t-box-n">Inactive Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className=" c-r-t-box-c float-left">4231</div>
                                <div className=" c-r-t-box-per float-left">15%</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 float-left clearfix">
                        <div className="w-45 float-left clearfix c-e-t-box c-e-target-pur-box">
                            <div className="w-100 float-left clearfix c-r-t-box-n" style={{fontSize: "18px"}}>Inactive Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className=" c-r-t-box-c float-left" style={{fontSize: "28px"}}>4231</div>
                                <div className=" c-r-t-box-per float-left">15%</div>
                            </div>
                        </div>
                        <div className="w-35 float-left clearfix c-e-t-box c-e-target-l-pur-box">
                            <div className="w-100 float-left clearfix c-r-t-box-n" style={{fontSize: "16px"}}>High Volume Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className=" c-r-t-box-c float-left" style={{fontSize: "26px"}}>3122</div>
                                <div className=" c-r-t-box-per float-left">15%</div>
                            </div>
                        </div>
                        <div className="w-20 float-left clearfix c-e-t-box c-e-target-dp-box" style={{paddingTop: "21px"}}>
                            <div className="w-100 float-left clearfix c-r-t-box-n" style={{fontSize: "16px", marginBottom: "30px"}}>High Volume Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className=" c-r-t-box-c float-left" style={{fontSize: "26px"}}>3122</div>
                                <div className=" c-r-t-box-per float-left">15%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-15 float-left clearfix c-e-target-p-box" style={{paddingTop: "80px"}}>
                    <div className="w-100 float-left clearfix" style={{marginBottom: "10px"}}>
                        <div className=" c-r-t-box-c float-left" style={{fontSize: "26px"}}>3122</div>
                        <div className=" c-r-t-box-per float-left">15%</div>
                    </div>
                    <div className="w-100 float-left clearfix c-r-t-box-n" style={{fontSize: "16px", marginBottom: "30px"}}>High Volume Customers</div>
                </div>
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
