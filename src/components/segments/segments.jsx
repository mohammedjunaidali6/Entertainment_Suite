import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import Table from "../common/reactTable/table";
import { segmentColumns, segmentData} from '../common/reactTable/tempArray';
import Map from "../common/map/map";
import SearchBar from "../common/searchBar/searchBar";
import SegmentFilter from "./filter/filter";
import { removeObjFromArray, containerHeightCalcFn } from "../common/global";
import { BsSearch } from "react-icons/bs";
import filter_src from "../../assets/img/segment_filter.svg";
import add_src from "../../assets/img/add_gray.svg";
import user_src from "../../assets/img/user.svg";
import location_src from "../../assets/img/segment_location.svg";
import './segments.css';

const tempCustomerTypes = [
    {id: 1, name: 'All Customers', count: 5345, isActive: true},
    {id: 2, name: 'Inactive Customers', count: 4326, isActive: false},
    {id: 3, name: 'High Volume Customers', count: 3422, isActive: false},
    {id: 4, name: 'New Customers', count: 232, isActive: false}
];

export default function Segments(props) {
    let history = useHistory();
    const [createSegment, setCreateSegment] = useState(false);
    const [customerTypes, setCustomerTypes] = useState(tempCustomerTypes);
    const [ctLocationValue, setCtLocationValue] = useState(true);
    const [genderValue, setGenderValue] = useState("");
    const [sFilters, setSFilters] = useState([]);
    
    const createSegmentClick = () => {
        setCreateSegment(true);
    }
    const ctChange = () => {
        
    }
    const addFilterFn = () => {
        let tempObj = {
            id: sFilters.length + 1
        }
        let tempArray = [...sFilters];
        tempArray.push(tempObj);
        setSFilters(tempArray);
    }
    const deleteFilterFn = (data) => {
        console.log('data', data);
        let tempArray = removeObjFromArray(sFilters, data, 'id');
        setSFilters(tempArray);
    }
    function customerTypeBoxClick(data) {
        customerTypes.forEach((obj) => {
            obj.isActive = false;
        });
        data.isActive = true;
        setCustomerTypes(customerTypes);
    }

    const ctLocationChange = (ev) => {
        console.log('ctLocationChange', ev.target.checked);
        setCtLocationValue(ev.target.checked);
    }
    const genderClick = (data) => {
        setGenderValue(data);
    }

    return (
        <div id="segments-container">
            <div>
                <div className="disp-inline-block">
                    <span className="m-s-heading">Manage Segments</span>
                    <br />
                    <span className="m-s-sub-heading">6/18 Segments are part of running campaign</span>
                </div>
                {!createSegment ? (
                    <div className="btn-create-engagement float-right text-center pt-2 mr-3" onClick={createSegmentClick} style={{marginBottom: '20px'}}>
                        <span className="btn-c-e-text">+ Create Segments</span>
                    </div>
                ) : null }
            </div>
            {!createSegment ? (
                <Fragment>
                    <Table columns={segmentColumns} 
                        data ={segmentData} 
                        pagination={true}
                        subHeaderComponent={
                            <SearchBar placeHolder="Search Segments" fromSegments={true} searchFilter="All Segments" />
                        } 
                        subHeader={true} />
                </Fragment>
            ) : (
                <Fragment>
                    <div className="w-100 float-left clearfix s-create" style={{height: containerHeightCalcFn(306), overflowY: "auto"}}>
                        <div className="w-100 float-left clearfix s-c-h">Create Segments</div>
                        <div className="w-100 float-left clearfix s-c-name">
                            <div className="s-c-n-h">Create Segments</div>
                            <div className="s-c-n-input">
                                <input type="text" placeholder="Segment name" />
                            </div>
                        </div>
                        <div className="w-100 float-left clearfix s-c-t-h">Choose customer type</div>
                        <div className="w-100 float-left clearfix s-c-t-sec">
                            {customerTypes && customerTypes.length > 0 ? (
                                <Fragment>
                                    {customerTypes.map((lObj, i) => (
                                        <div className="s-c-t-box float-left clearfix" key={`s-c-t-box-${i}`} onClick={() => customerTypeBoxClick(lObj)}>
                                            <div className="w-15 float-left clearfix" style={{marginTop: '13px'}}>
                                                <input id={`a-format-chk${lObj.id}`} type="checkbox" className="mt-0" checked={lObj.isActive ? true : false} onChange={ctChange}></input>
                                            </div>
                                            <div className="w-85 float-left clearfix mt-2">
                                                <span className="s-c-t-box-txt pl-2">{lObj.name}</span>
                                                <br />
                                                <span className="s-c-t-box-count pl-2">{lObj.count}</span>
                                            </div>
                                        </div>
                                    ))}
                                </Fragment>
                            ) : null}
                        </div>
                        <div className="w-100 float-left clearfix s-c-f-sec">
                            <div className="s-c-f-h">
                                <img src={filter_src} alt="Filter Heading" className="s-c-f-h-img mr-2" />
                                <span className="s-c-f-h-txt" style={{textTransform: "uppercase"}}>Filters</span>
                            </div>
                            <div>
                                {sFilters && sFilters.length > 0 ? (
                                    <Fragment>
                                        {sFilters.map((obj, i) => (
                                            <SegmentFilter currentData={obj} key={`filter${i}`} deleteFilter={deleteFilterFn}></SegmentFilter>
                                        ))}
                                    </Fragment>
                                ) : <div className="s-c-f-h-txt pl-1 mb-2">No filters found!</div>}
                            </div>
                            <div className="s-c-f-add" onClick={addFilterFn}>
                                <img src={add_src} alt="Filter Add" className="s-c-f-h-img mr-2" />
                                <span className="s-c-f-h-txt">Add Filter</span>
                            </div>
                        </div>
                        <div className="w-100 float-left clearfix s-c-ag-sec">
                            <div className="s-c-ag-h">
                                <img src={user_src} alt="Age Gender Heading" className="s-c-ag-h-img mr-2" />
                                <span className="s-c-ag-h-txt" style={{textTransform: "uppercase"}}>Age & Gender</span>
                            </div>
                            <div className="w-50 float-left clearfix">
                                <div className="s-c-ag-content">
                                    <div className="s-c-ag-box float-left clearfix" onClick={() => genderClick('Male')}>
                                        <div className="w-15 float-left clearfix" style={{marginTop: '13px'}}>
                                            <input id={`a-format-chk-male`} type="checkbox" className="mt-0" checked={genderValue === 'Male' ? true : false} onChange={ctChange}></input>
                                        </div>
                                        <div className="w-85 float-left clearfix mt-2">
                                            <span className="s-c-ag-box-txt pl-2">Male</span>
                                        </div>
                                    </div>
                                    <div className="s-c-ag-box float-left clearfix" onClick={() => genderClick('Female')}>
                                        <div className="w-15 float-left clearfix" style={{marginTop: '13px'}}>
                                            <input id={`a-format-chk-female`} type="checkbox" className="mt-0" checked={genderValue === 'Female' ? true : false} onChange={ctChange}></input>
                                        </div>
                                        <div className="w-85 float-left clearfix mt-2">
                                            <span className="s-c-ag-box-txt pl-2">Female</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-50 float-left clearfix">

                            </div>
                        </div>
                        <div className="w-100 float-left clearfix s-c-l-sec">
                            <div className="s-c-l-h">
                                <img src={location_src} alt="Location Heading" className="s-c-l-h-img mr-2" />
                                <span className="s-c-l-h-txt" style={{textTransform: "uppercase"}}>Location</span>
                            </div>
                            <div className="s-c-l-s">
                                <div className="s-c-l-s-h">Search Location</div>
                                <div className="w-100 float-left clearfix" style={{marginBottom: "28px"}}>
                                    <div className="w-50 float-left clearfix s-c-l-s-sec p-2">
                                        <BsSearch className="h-icons float-left clearfix m-0 h-s-sec-img mr-2"></BsSearch>
                                        <input type="text" className="h-s-sec-input" placeholder="" />
                                    </div>
                                    <div className="w-50 float-left clearfix">
                                        <input type="checkbox" className="float-left" checked={ctLocationValue} onChange={ctLocationChange} />
                                        <div className="s-c-l-s-chk-lbl float-left clearfix ml-2" style={{marginTop: "7px"}}>Include my Current Location</div>
                                    </div>
                                </div>
                            </div>
                            <div className="s-c-l-m">
                                <Map className="w-100 float-left clearfix"></Map>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 float-left clearfix s-create-a">
                        <div className="w-50 float-left clearfix"></div>
                        <div className="w-50 float-left clearfix" style={{marginRight: "45px"}}>
                            <div className="s-create-a-s content-c float-right clearfix" onClick={() => setCreateSegment(false)}>Save</div>
                            <div className="s-create-a-c content-c float-right clearfix" onClick={() => setCreateSegment(false)}>Cancel</div>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    )
}
