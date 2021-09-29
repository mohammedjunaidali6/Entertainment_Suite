import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';
import p_rule_src from "../../../../assets/img/Setting_option.svg";
import './targetAudience.css';
import { getAuthAndData} from '../../../../api/ApiHelper';
import BasicTreeMap from '../../../common/map/treemap';
import createNotification from '../../../common/reactNotification';
import { BUDGET_CURRENCY } from '../../../../constants/globalConstants';
import { 
    CUSTOMERS_BY_FILTERS,
    SOMETHING_WENT_WRONG 
} from '../../../../api/apiConstants';


const rule1options = [
    { value: 'Has Purchased', label: 'Has Purchased' }
]
const rule2options = [
    { value: 'Greater than or Equal To', label: 'Greater than or Equal To' },
    //{ value: 'Less Than Or Equal To', label: 'Less Than Or Equal To' }
]
const rule4options = [
    { value: 'In Last', label: 'In Last' }
]
const DaysTypeOptions = [
    { value: 'Days', label: 'Days' },
    { value: 'Week', label: 'Week' },
    { value: 'Month', label: 'Month' }
]

export default function TargetAudience(props) {
    console.log('***',props);
    var history = useHistory();
    const targetAudienceData = props.props?.targetAudience;
    const [customerSegments, setCustomerSegments] = useState();
    const [selectedSegment, setSelectedSegment] = useState(targetAudienceData?.targetAudience);
    const [rule1, setRule1] = useState(rule1options[0]);
    const [rule2, setRule2] = useState(rule2options[0]);
    const [purchaseValue, setPurchaseValue] = useState(targetAudienceData?.purchaseValue);
    const [rule4, setRule4] = useState(rule4options[0]);
    const [durationNum, setDurationNum] = useState(targetAudienceData?.durationNum || "7");
    const [daysType, setDaysType] = useState(targetAudienceData ? { value: targetAudienceData?.daysType, label: targetAudienceData?.daysType } : DaysTypeOptions[0]);
    const [purchaseRuleEnable, setPurchaseRuleEnable] = useState(targetAudienceData?.purchaseValue||targetAudienceData?.purchaseRuleId?true:false);

    const rule1Change = (event) => {
        setRule1(event);
    }
    const rule2Change = (event) => {
        setRule2(event);
    }
    const rule3Change = (event) => {
        let val=event.target.value;
        if(!val||val?.length<=7){
            setPurchaseValue(val?parseInt(val.replace(',','')):'');
            props.setDefinePurchaseRule({enable:true,value:val})
        }
    }
    const rule4Change = (event) => {
        setRule4(event);
    }
    const rule5Change = (event) => {
        let val=event.target.value;
        if (val && (val > 99 || val < 1)) { 
            return false 
        }
        setDurationNum(val);
    }
    const rule6Change = (event) => {
        setDaysType(event);
    }

    const onSegmentSelection = (obj) => {
        setSelectedSegment(obj.data);
        props.setDefineSegment(obj.data);
    }
    
    const onCheckBox=e=>{
        setPurchaseRuleEnable(e.target.checked);
        let checked=e.target.checked;
        props.setDefinePurchaseRule({enable:checked,value:''});
        if(!checked){
            setPurchaseValue();
            setDurationNum();
        }
    }

    const fetchCustomerSegments = () => {
        try {
            props.handleLoader(true);
            getAuthAndData(CUSTOMERS_BY_FILTERS, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        const data = {
                            "name": "Target Audience",
                            "color": "hsl(233, 70%, 50%)",
                            "children": []
                        }
                        res.data.map(c => {
                            c.percentage = (c.segment_customers_id == 6 ? 0.45 : c.segment_customers_id == 1 ? 0.25 : c.segment_customers_id == 2 ? 0.1 : c.segment_customers_id == 4 ? 0.07 : c.segment_customers_id == 5 ? 0.08 : 0.05)
                            data.children.push(c);
                        })
                        setCustomerSegments(data);
                    }
                    props.handleLoader(false);
                })
        } catch (error) {
            props.handleLoader(false);
            console.error(error)
        }
    }
    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG+ 'in Target Audience');
            return false;
        }else{
            return true;
        }
    }

    useEffect(() => {
        fetchCustomerSegments();
    }, []);
    useEffect(() => {
        return () => {
            let targetAudience = {
                purchaseRuleId: targetAudienceData?.purchaseRuleId || 0,
                targetAudience: selectedSegment,
                purchaseValue: purchaseValue,
                durationNum: durationNum,
                daysType: daysType.value
            };
            props.props.engagementsSmartActionHandler.dispatchTargetAudienceData(targetAudience);
        }
    }, [selectedSegment, purchaseValue, durationNum, daysType,purchaseRuleEnable]);

    return (
        <div id="target-audience-container" className="c-e-target-sec w-100 float-left clearfix">
            <div className="w-100 float-left clearfix c-e-target-h">Select Target Audience for the Engagement</div>
            <div className="c-e-target-content w-100 float-left clearfix">
                {customerSegments && <BasicTreeMap data={customerSegments} onSegmentSelection={obj => onSegmentSelection(obj)} />}
                <div className="w-100 float-left clearfix pl-2 pt-1" style={{fontSize:'12px'}}>
                    Selected Customer Segment : <b>{selectedSegment?.segment_name || 'No Segment selected'}</b>
                </div>

                {/* <div className="w-85 float-left clearfix c-e-target-left-box-con">
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
                </div> */}
            </div>
            <div className="w-100 float-left clearfix c-e-target-p-rule pb-4">
                <img src={p_rule_src} alt="Purchase Rule" className="mr-1" />
                Purchase Rule&nbsp;&nbsp;&nbsp;
                <input type='checkbox' checked={purchaseRuleEnable} onChange={onCheckBox} />
                {/* <Checkbox checked={purchaseRuleEnable} onChange={e=>setPurchaseRuleEnable(e.target.checked)} defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}/> */}
            </div>

            <div className={`w-100 float-left clearfix c-e-target-p-rule-opt ${purchaseRuleEnable?'':'disable-purchase-rule'}`}>
                <Select 
                    options={rule1options} 
                    value={rule1} 
                    onChange={rule1Change} 
                    className="w-20 p-r-10 float-left clearfix"
                />
                <Select 
                    options={rule2options} 
                    value={rule2} 
                    onChange={rule2Change} 
                    className="w-22 p-r-10 float-left clearfix" 
                />
                <div className="w-15 m-r-10 float-left clearfix">
                    <div className="w-34 float-left clearfix p-rule-value-left">
                        <span className="w-100 p-rule-value-txt">{BUDGET_CURRENCY}</span>
                    </div>
                    <div className="w-60 float-left clearfix p-rule-value-right">
                        <input 
                            type="text"
                            value={purchaseValue?parseInt(purchaseValue).toLocaleString():''}
                            onChange={rule3Change}
                            className='p-rule-input'
                            placeholder="Value"
                            maxLength={6}
                        />
                    </div>
                </div>
                <Select options={rule4options} value={rule4} className="w-10 p-r-10 float-left clearfix "/>
                <div className="w-5 m-r-10 float-left clearfix t-a-r-5 p-rule-duration">
                    <input 
                        type="number"
                        id="t-a-r-5"
                        value={durationNum}
                        onChange={rule5Change}
                        max={90}
                        min={1}
                        className='p-rule-input'
                    />
                </div>
                <Select 
                    options={DaysTypeOptions} 
                    value={daysType} 
                    onChange={rule6Change} 
                    className="w-10 p-r-10 float-left clearfix" 
                />
            </div>
        </div>
    )
}
