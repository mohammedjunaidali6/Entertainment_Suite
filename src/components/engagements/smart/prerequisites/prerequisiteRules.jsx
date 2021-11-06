import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import Select from 'react-select';
import './prerequisiteRules.css';
import p_rule_src from "../../../../assets/img/Setting_option.svg";
import { BUDGET_CURRENCY } from '../../../../constants/globalConstants';
import createNotification from '../../../common/reactNotification';
import { TextField } from '@material-ui/core';

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

export default function PreRequisiteRules(props){
  console.log('***',props);
  const preRules = props.props?.preRules;
  const [costEnable, setCostEnable] = useState(preRules?.costToPlay?true:false);
  const [purchaseRuleEnable, setPurchaseRuleEnable] = useState(preRules?.purchaseValue||preRules?.purchaseRuleId?true:false);
  const [purchaseValue, setPurchaseValue] = useState(preRules?.purchaseValue);
  const [durationNum, setDurationNum] = useState(preRules?.durationNum || "7");
  const [rule1, setRule1] = useState(rule1options[0]);
  const [rule2, setRule2] = useState(rule2options[0]);
  const [rule4, setRule4] = useState(rule4options[0]);
  const [daysType, setDaysType] = useState(preRules ? { value: preRules?.daysType, label: preRules?.daysType } : DaysTypeOptions[0]);
  const [costToPlay,setCostToPlay]=useState(preRules?.costToPlay);
  
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

  const onCostChange=e=>{
    if(e.target.value<=999){
      setCostToPlay(e.target.value);
      props.setDefineCost({enable:true,value:e.target.value});
    }
  }
      
  const onPurchaseRuleCheck=e=>{
    setPurchaseRuleEnable(e.target.checked);
    let checked=e.target.checked;
    props.setDefinePurchaseRule({enable:checked,value:''});
    if(!checked){
        setPurchaseValue();
        setDurationNum();
    }
  }
  const onCostCheck=e=>{
    setCostEnable(e.target.checked);
    let checked=e.target.checked;
    props.setDefineCost({enable:checked,value:''});
  }

  useEffect(()=>{
    
    return () => {
      let preRulesData = {
          purchaseRuleId: preRules?.purchaseRuleId || 0,
          purchaseValue: purchaseValue,
          durationNum: durationNum,
          daysType: daysType.value,
          costToPlay:costToPlay
      };
      props.props.engagementsSmartActionHandler.dispatchPreRules(preRulesData);
  }
}, [costToPlay,purchaseValue, durationNum, daysType,purchaseRuleEnable]);

  useEffect(()=>{
    if(costEnable&&purchaseRuleEnable){
      createNotification('warning','Adding Too Many Pre-requisites may reduce the participation');
    }
    props.setDefinePurchaseRule({enable:purchaseRuleEnable,value:purchaseValue});
    props.setDefineCost({enable:costEnable,value:costToPlay});

  },[costEnable,purchaseRuleEnable])


  return (
    <div id="define-journey-container" className="c-e-journey-sec w-100 float-left clearfix">
      <div className="c-e-journey-h">Choose Prerequisite Rules</div>
      <div>
        <span style={{fontSize:'14px'}}>Cost to Play</span>
        <span>
          <input type='checkbox' checked={costEnable} onChange={onCostCheck} style={{margin:'8px',opacity:props?.updateEngagement?'0.4':''}} disabled={props?.updateEngagement}/>
        </span>
        <span className={`${costEnable?'':'disable-purchase-rule'}`}>
          <input 
            type="number"
            value={costToPlay}
            onChange={onCostChange}
            className='cost-to-play'
            placeholder="Enter Cost"
          />
        </span>
      </div>
      <div className="c-e-journey-boxes w-100 float-left clearfix">
        <div className="w-100 float-left clearfix c-e-target-p-rule pb-4">
          <img src={p_rule_src} alt="Purchase Rule" className="mr-1" />
          Purchase Rule&nbsp;&nbsp;&nbsp;
          <input type='checkbox' checked={purchaseRuleEnable} onChange={onPurchaseRuleCheck} disabled={props?.updateEngagement} style={{opacity:props?.updateEngagement?'0.4':''}}/>
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
  </div>
 )
}