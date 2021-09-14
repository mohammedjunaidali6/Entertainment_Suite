import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';


export default function CustomTooltip(props){
    return(
        <Tooltip title={props.tooltipText} placement='top'>
            {props.children}
        </Tooltip>
    );  
}