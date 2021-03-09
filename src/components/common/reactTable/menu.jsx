import React,{useState}from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";

export default function ActionMenu(){
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = (event) =>{
        setAnchorEl(null);
    }

    return(
        <div>
            <div role="button" onClick={handleClick}><BsThreeDotsVertical /></div>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                 >
                <MenuItem onClick={handleClose}>Pause</MenuItem>
                <MenuItem onClick={handleClose}>Play</MenuItem>
                <MenuItem onClick={handleClose}>Exit</MenuItem>
            </Menu>
        </div>
    );
}