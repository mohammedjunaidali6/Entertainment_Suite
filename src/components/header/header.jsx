import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { BsChevronDown } from 'react-icons/bs';
import { BsFillBellFill } from "react-icons/bs";
import { BsSearch } from 'react-icons/bs';

import './header.css';
import logo_src from '../../assets/img/logo.png';
import default_user_src from '../../assets/img/default_user.png';
import product_tour_src from '../../assets/img/product_tour.svg';
import support_src from '../../assets/img/support.svg';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
}));

export default function Header(props) {
    let history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [company, setCompany] = useState('');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleChange = (event) => {
        setCompany(event.target.value);
    };

    function notificationFn() {

    }

    function searchFn() {

    }

    function redirectFn(param) {
        history.push(param);
    }
    function settingsRedirectFn(param) {
        setAnchorEl(null);
        redirectFn(param);
    }

    return (
        <div id="header-container">
            <div className="w-50 float-left clearfix">
                <img src={logo_src} alt="Divanor" className="h-logo" onClick={() => redirectFn('/')} />
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={company}
                    onChange={handleChange} className="h-dd" style={{marginTop: "12px", marginLeft: "40px"}} >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>
            <div className="w-50 float-left clearfix">
                <div className="h-logged-user-sec float-right clearfix" onClick={handleClick}>
                    <img src={default_user_src} alt="logged user" className="h-logger-user" />
                    <BsChevronDown style={{color: "white"}} />
                </div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography}>
                        <div className="h-logger-user-options p-0">
                            <div onClick={() => settingsRedirectFn('/settings')}>Pause</div>
                            <div>Help</div>
                            <div style={{borderBottom: "1px solid #DBDDDE"}}>Logout</div>
                            <div>Last Login 12th Jan 21, 10:30am</div>
                        </div>
                    </Typography>
                </Popover>
                <BsFillBellFill className="h-icons float-right clearfix" onClick={() => notificationFn()} ></BsFillBellFill>
                <BsSearch className="h-icons float-right clearfix" onClick={() => searchFn()} style={{marginLeft: "40px"}}></BsSearch>
                <div className="h-links float-right clearfix">
                    <img src={product_tour_src} className="mb-1" />
                    <span className="ml-2">Product Tour</span>
                </div>
                <div className="h-links float-right clearfix">
                    <img src={support_src} className="mb-1" />
                    <span className="ml-2">Support Request</span>
                </div>
            </div>
        </div>
    )
}
