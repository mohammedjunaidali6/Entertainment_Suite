import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";

export default function EngagementContextMenu(props) {
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
                {
                    props.status == 1 ?
                        <MenuItem onClick={handleClose}>Pause</MenuItem>
                        :
                        <MenuItem onClick={handleClose}>Resume</MenuItem>
                }
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>View Report</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </div>
    );
}