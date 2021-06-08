import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import p_rule_src from "../../../../assets/img/Setting_option.svg";
import './targetAudience.css';
import { getData, postData } from '../../../../api/ApiHelper';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const rule1options = [
    { value: 'Has Purchased', label: 'Has Purchased' }
]
const rule2options = [
    { value: 'Greater than or Equal To', label: 'Greater than or Equal To' },
    { value: 'Less Than Or Equal To', label: 'Less Than Or Equal To' }
]
const rule4options = [
    { value: 'In Last', label: 'In Last' }
]
const rule6options = [
    { value: 'Days', label: 'Days' },
    { value: 'Week', label: 'Week' },
    { value: 'Month', label: 'Month' }
]

export default function TargetAudience(props) {

    const [rule1, setRule1] = useState(rule1options[0]);
    const rule1Change = (event) => {
        setRule1(event);
    }
    const [rule2, setRule2] = useState(rule2options[0]);
    const rule2Change = (event) => {
        setRule2(event);
    }
    const [rule3, setRule3] = useState("");
    const rule3Change = (event) => {
        setRule3(event.target.value);
    }
    const [rule4, setRule4] = useState(rule4options[0]);
    const rule4Change = (event) => {
        setRule4(event);
    }
    const [rule5, setRule5] = useState("2");
    const rule5Change = (event) => {
        if (event.target.value && (event.target.value > 99 || event.target.value < 1)) { return false }
        setRule5(event.target.value);
    }
    const [rule6, setRule6] = useState(rule6options[0]);
    const rule6Change = (event) => {
        console.log('event', event)
        setRule6(event);
    }
    const [selectedTABox, setSelectedTABox] = useState("All");
    function taBoxSelect(val) {
        setSelectedTABox(val);
    }
    const fetchCustomerSegments = () => {
        try {
            getData(`/engt/customersbyfilters`)
                .then(response => {
                    if (response && Array.isArray(response.data.data)) {
                        console.log('***', response)
                    } else {
                        console.log('***', response)
                    }
                })
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchCustomerSegments();
    }, []);

    return (
        <div id="target-audience-container" className="c-e-target-sec w-100 float-left clearfix">
            <div className="w-100 float-left clearfix c-e-target-h">Select Target Audience for the Engagement</div>
            <div className="c-e-target-content w-100 float-left clearfix">
                <div className="w-85 float-left clearfix c-e-target-left-box-con">
                    <div className="w-100 float-left clearfix">
                        <div className="w-60 float-left clearfix c-e-t-box c-e-target-g-box" onClick={() => taBoxSelect('All')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n">All Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left">5345</div>
                                <div className="c-r-t-box-per float-left">28%</div>
                                {selectedTABox && selectedTABox === 'All' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-40 float-left clearfix c-e-t-box c-e-target-b-box" onClick={() => taBoxSelect('New')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n">New Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left">5345</div>
                                <div className="c-r-t-box-per float-left">28%</div>
                                {selectedTABox && selectedTABox === 'New' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="w-100 float-left clearfix">
                        <div className="w-45 float-left clearfix c-e-t-box c-e-target-pur-box" onClick={() => taBoxSelect('Inactive')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n" style={{ fontSize: "18px" }}>Inactive Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left" style={{ fontSize: "28px" }}>4231</div>
                                <div className="c-r-t-box-per float-left">15%</div>
                                {selectedTABox && selectedTABox === 'Inactive' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-30 float-left clearfix c-e-t-box c-e-target-l-pur-box" onClick={() => taBoxSelect('HVC1')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n" style={{ fontSize: "16px" }}>High Volume Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left" style={{ fontSize: "26px" }}>3122</div>
                                <div className="c-r-t-box-per float-left">15%</div>
                                {selectedTABox && selectedTABox === 'HVC1' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-25 float-left clearfix c-e-t-box c-e-target-dp-box" onClick={() => taBoxSelect('HVC2')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n" style={{ fontSize: "16px" }}>High Volume Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left" style={{ fontSize: "26px" }}>3122</div>
                                <div className="c-r-t-box-per float-left">15%</div>
                                {selectedTABox && selectedTABox === 'HVC2' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-15 float-left clearfix c-e-target-p-box" style={{ paddingTop: "80px" }} onClick={() => taBoxSelect('HVC3')}>
                    <div className="w-100 float-left clearfix" style={{ marginBottom: "10px" }}>
                        <div className="c-r-t-box-c float-left" style={{ fontSize: "26px" }}>3122</div>
                        <div className="c-r-t-box-per float-left">15%</div>
                    </div>
                    <div className="w-100 float-left clearfix c-r-t-box-n" style={{ fontSize: "16px", marginBottom: "30px" }}>High Volume Customers</div>
                    {selectedTABox && selectedTABox === 'HVC3' ? (
                        <div className="c-r-t-box-select float-left c-center mr-2">Selected</div>
                    ) : null}
                </div>
            </div>
            <div className="w-100 float-left clearfix c-e-target-p-rule">
                <img src={p_rule_src} alt="Purchase Rule" className="mr-1" />Purchase Rule
            </div>
            <div className="w-100 float-left clearfix c-e-target-p-rule-opt">
                <Select options={rule1options} value={rule1} onChange={rule1Change} className="w-30 p-r-10 float-left clearfix" />
                <Select options={rule2options} value={rule2} onChange={rule2Change} className="w-12 p-r-10 float-left clearfix" />
                <div className="w-15 m-r-10 float-left clearfix">
                    <div className="w-30 s-b-left float-left clearfix text-center">
                        <span className="w-100 s-b-l-txt">$</span>
                    </div>
                    <div className="w-70 s-b-right float-left clearfix">
                        <input type="text"
                            value={rule3}
                            onChange={rule3Change}
                            className='searchBar'
                            placeholder="Value"
                        />
                    </div>
                </div>
                <Select options={rule4options} value={rule4} className="w-10 p-r-10 float-left clearfix" />
                <div className="w-5 m-r-10 float-left clearfix s-b-only-search t-a-r-5">
                    <input type="number" id="t-a-r-5"
                        value={rule5}
                        onChange={rule5Change}
                        max={99}
                        min={1}
                        className='searchBar'
                    />
                </div>
                <Select options={rule6options} value={rule6} onChange={rule6Change} className="w-10 p-r-10 float-left clearfix" />
            </div>
        </div>
    )
}
