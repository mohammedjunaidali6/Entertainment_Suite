import React from 'react';
import Select from 'react-select';
import close_src from "../../../assets/img/close.svg";

const firstOptions = [
    { value: 'IF', label: 'IF' },
    { value: 'AND', label: 'AND' },
    { value: 'OR', label: 'OR' },
    { value: 'IN', label: 'IN' }
];
const secondOptions = [
    { value: 'Event', label: 'Event' },
    { value: 'Value', label: 'Value' },
    { value: 'Last', label: 'Last' }
];
const thirdOptions = [
    { value: 'Equals', label: 'Equals' },
    { value: 'Greater than or Equals To', label: 'Greater than or Equals To' },
    { value: 'Lesser Than or Equals To', label: 'Lesser Than or Equals To' }
];
const eventsOptions = [
    { value: 'Logged In', label: 'Logged In' },
    { value: 'Not Logged In', label: 'Not Logged In' },
    { value: 'Pending Cart', label: 'Pending Cart' },
    { value: 'Review Added', label: 'Review Added' },
    { value: 'Signed Up', label: 'Signed Up' },
    { value: 'Social Share', label: 'Social Share' },
    { value: 'Avg Purchase', label: 'Avg Purchase' }
];

export default function SegmentFilter(props) {
    
    return (
        <div className="w-100 float-left clearfix c-e-target-p-rule-opt">
            <img src={close_src} alt="Filter Close" className="float-left mr-3 mb-4" style={{marginTop: "12px"}} onClick={() => props.deleteFilter(props.currentData)} />
            <Select options={firstOptions} className="w-10 p-r-10 float-left clearfix" />
            <Select options={secondOptions} className="w-15 p-r-10 float-left clearfix" />
            <Select options={thirdOptions} className="w-15 p-r-10 float-left clearfix" />
            <Select options={eventsOptions} className="w-15 p-r-10 float-left clearfix" />
        </div>
    )
}