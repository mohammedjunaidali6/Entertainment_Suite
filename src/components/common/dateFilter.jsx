import React from 'react';
import Link from '@material-ui/core/Link';


export default function DateFilter(props) {


return(
    <div className="w-50 float-left clearfix mb-1">
        <Link href="#"
            className="float-right mb-1 mr-4"
            onClick={()=>props.onFilterClick(90)}
            style={{ color: props.selected == 90 ? '#60b3f7' : '',fontSize:'12px' }}>
            Last 90 Days
        </Link>
        <Link href="#"
            className="float-right mb-1 mr-3"
            onClick={()=>props.onFilterClick(30)}
            style={{ color: props.selected == 30 ? '#60b3f7' : '' ,fontSize:'12px'}}>
            Last 30 Days
        </Link>
        <Link href="#"
            className="float-right mb-1 mr-3"
            onClick={()=>props.onFilterClick(7)}
            style={{ color: props.selected == 7 ? '#60b3f7' : '',fontSize:'12px' }}>
            Last 7 Days
        </Link>
    </div>
)
}