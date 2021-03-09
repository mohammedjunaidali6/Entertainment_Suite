import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import Table from "../common/reactTable/table";
import { segmentColumns, segmentData} from '../common/reactTable/tempArray';
import SearchBar from "../common/searchBar/searchBar"
import './segments.css';

export default function Segments(props) {
    let history = useHistory();
    
    return (
        <div id="segments-container">
            <span>Segments Component</span>
            <Table columns={segmentColumns} data ={segmentData} actions={<SearchBar/>} />
        </div>
    )
}
