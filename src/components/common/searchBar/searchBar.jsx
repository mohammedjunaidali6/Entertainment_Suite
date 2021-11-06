import React, { useState, Fragment } from 'react';
import down_src from "../../../assets/img/down_arrow.svg";
import Select from "react-select";
import "./searchBar.css"

const campaignTypeOptions = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'High Volume', label: 'High Volume' },
    { value: 'New', label: 'New' },
];
const customerTypeOptions = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'High Volume', label: 'High Volume' },
    { value: 'New', label: 'New' },
];

export default function SearchBar(props) {

    const [value, setValue] = useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onKeyPressInSearch = (e) => {
        // setTimeout(() => {
        //     setValue(e.target.value);
        //     if (e.key === 'Enter') {
        //         props.onSearch(e.target.value);
        //     }
        // }, 1)
        setTimeout(() => {
            let val=e.target.value;
            setValue(val);
            props.onSearch(val);
        }, 1)
    }
    const onSearchBlur = e => {
        setValue(e.target.value);
        props.onSearch(e.target.value);
    }

    return (
        <div className="s-b-sec">
            {props.fromAnalyticsReport ? (
                <Fragment>
                    <div className="s-b-a-left float-left clearfix">
                        <span className="s-b-l-txt ml-2">Campaign Type</span>
                        <br />
                        <Select options={campaignTypeOptions} className="s-b-a-select float-left clearfix" />
                    </div>
                    <div className="s-b-a-right float-left clearfix ml-3">
                        <span className="s-b-l-txt ml-2">Customer Type</span>
                        <br />
                        <Select options={customerTypeOptions} className="s-b-a-select float-left clearfix" />
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    {props.fromRewards || props.fromSettingsTeam ? (
                        <div className="s-b-only-search float-left clearfix">
                            <input 
                                type="text"
                                maxLength={40}
                                value={value}
                                onChange={handleChange}
                                placeholder={props.placeHolder ? props.placeHolder : "Search"}
                                className='searchBar'
                                onKeyPress={onKeyPressInSearch}
                                // onBlur={onSearchBlur}
                            />
                        </div>
                    ) : (
                        <Fragment>
                            <div className="s-b-left float-left clearfix">
                                <span className="s-b-l-txt ml-2">{props.searchFilter ? props.searchFilter : 'All'}</span>
                                <img src={down_src} alt="Down Arrow" className="float-right mr-1 ml-2" />
                            </div>
                            <div className="s-b-right float-left clearfix">
                                <input type="text"
                                    maxLength={40}
                                    value={value}
                                    onChange={handleChange}
                                    placeholder={props.placeHolder ? props.placeHolder : "Search"}
                                    className='searchBar'
                                    // onKeyPress={onKeyPressInSearch}
                                    // onBlur={onSearchBlur}
                                />
                            </div>
                        </Fragment>
                    )}
                </Fragment>
            )}
        </div>
    )


}
