import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';


export default function CustomTooltip(props){
    console.log('title',props);
    return(
        <Tooltip title={props.tooltipText}>
            {props.children}
        </Tooltip>
    );  
}