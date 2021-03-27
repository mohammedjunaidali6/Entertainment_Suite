import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import Table from "../common/reactTable/table";
import { segmentColumns, segmentData} from '../common/reactTable/tempArray';
import SearchBar from "../common/searchBar/searchBar"
import './segments.css';

export default function Segments(props) {
    let history = useHistory();
    const[ createClick, setCreateClick] = useState(false);
    
    return (
        <div id="segments-container">
            <div className='disp-inline-block'>
                <div className='m-s-title'>Manage Segments</div>
                <div className='m-s-subtitle'>6/18 Segments are part of running campaign</div>
            </div>
            <button type="button" className='create-segment-btn disp-inline-block float-right'>+ Create Segments</button>
            
            <Table columns={segmentColumns} data ={segmentData} actions={<SearchBar/>} />
        </div>
    )
}
