import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";


export default function ActionMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = (event) => {
        props.onAction(event);
        setAnchorEl(null);
    }

    return (
        <div>
            <div role="button" onClick={handleClick}><BsThreeDotsVertical /></div>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} style={{fontSize:'12px',fontFamily:'Roboto, sans-serif'}}>Edit</MenuItem>
                <MenuItem onClick={handleClose} style={{fontSize:'12px',fontFamily:'Roboto, sans-serif'}}>Delete</MenuItem>
                <MenuItem onClick={handleClose} style={{fontSize:'12px',fontFamily:'Roboto, sans-serif'}}>Exit</MenuItem>
            </Menu>
        </div>
    );
}

export function RewardContextMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = (event) => {
        props.onAction(event);
        setAnchorEl(null);
    }

    return (
        <div>
            <div role="button" onClick={handleClick}><BsThreeDotsVertical /></div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} style={{fontSize:'12px',fontFamily:'Roboto, sans-serif'}}>Edit</MenuItem>
                <MenuItem onClick={handleClose} style={{fontSize:'12px',fontFamily:'Roboto, sans-serif'}}>Delete</MenuItem>
                <MenuItem onClick={handleClose} style={{fontSize:'12px',fontFamily:'Roboto, sans-serif'}}>Reports</MenuItem>
            </Menu>
        </div>
    );
}