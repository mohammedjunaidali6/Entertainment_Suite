import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { BsChevronDown, BsX, BsFillBellFill, BsSearch } from 'react-icons/bs';
import './header.css';
import logo_src from '../../assets/img/blaash-logo.png';
import default_user_src from '../../assets/img/default_user.png';
import product_tour_src from '../../assets/img/product_tour.svg';
import support_src from '../../assets/img/support.svg';
import settings_src from '../../assets/img/Property_Settings.svg';
import help_src from '../../assets/img/User Guide.svg';
import logout_src from '../../assets/img/logout.svg';
import { Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function Header(props) {
    let history = useHistory();
    const classes = useStyles();
    const [searchOpen, setSearchOpen] = useState(false);
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

    // for notification poper
    const [notifyEl, setNotifyEl] = useState(null);
    const notifyOpen = Boolean(notifyEl);
    const notifyId = notifyOpen ? 'notification-popover' : undefined;
    const notifyClick = (event) => {
        setNotifyEl(event.currentTarget);
    };
    const notifyClose = () => {
        setNotifyEl(null);
    };

    const handleChange = (event) => {
        setCompany(event.target.value);
    };
    function redirectFn(param) {
        history.push(param);
    }
    const logOutFn = () => {
        setAnchorEl(null);
        Auth.signOut()
            .then(res => redirectFn('/login'))
            .catch(err => console.error(err));
    }
    function settingsRedirectFn() {
        setAnchorEl(null);
        redirectFn('/settings');
    }

    return (
        <div id="header-container">
            <div className="w-50 float-left clearfix">
                <img src={logo_src} alt="Divanor" className="h-logo" onClick={() => redirectFn('/')} />
                {/* <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={company}
                    onChange={handleChange} className="h-dd" style={{ marginTop: "12px", marginLeft: "40px" }} >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
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
                            <div onClick={settingsRedirectFn}>
                                <img src={settings_src} alt="Settings" />
                                <Link className="pl-2 pt-2">Settings</Link>
                            </div>
                            <div>
                                <img src={help_src} alt="Help" />
                                <Link className="pl-2 pt-2">Help</Link>
                            </div>
                            <div style={{ borderBottom: "1px solid #DBDDDE" }} onClick={logOutFn}>
                                <img src={logout_src} alt="logout" />
                                <Link className="pl-2 pt-2">Logout</Link>
                            </div>
                            <div>Last Login 12th Jan 21, 10:30am</div>
                        </div>
                    </Typography>
                </Popover>
                <BsFillBellFill className="h-icons float-right clearfix" onClick={notifyClick} ></BsFillBellFill>
                {/* {searchOpen === true ? (
                    <div className="h-s-sec float-right clearfix">
                        <BsSearch className="h-icons float-left clearfix m-0 h-s-sec-img mr-2"></BsSearch>
                        <input type="text" className="h-s-sec-input" placeholder="Search" />
                        <BsX className="h-icons float-right clearfix m-0 c-pointer h-s-sec-img" onClick={() => setSearchOpen(false)}></BsX>
                    </div>
                ) : (
                    <BsSearch className="h-icons float-right clearfix" onClick={() => setSearchOpen(true)} style={{ marginLeft: "40px" }}></BsSearch>
                )} */}
                {/* <div className="h-links float-right clearfix">
                    <img src={product_tour_src} className="mb-1" />
                    <span className="ml-2">Product Tour</span>
                </div> */}
                {/* <div className="h-links float-right clearfix">
                    <img src={support_src} className="mb-1" />
                    <span className="ml-2">Support Request</span>
                </div> */}
                <Popover
                    id={notifyId}
                    open={notifyOpen}
                    anchorEl={notifyEl}
                    onClose={notifyClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Typography className={classes.typography}>
                        <div className="h-notifications">
                            <div className="h-n-h">
                                <span className="h-n-h-lbl">Notifications</span>
                                <span className="h-n-h-lbl-read float-right pt-2">Mark as read</span>
                            </div>
                        </div>
                    </Typography>
                </Popover>
            </div>
        </div>
    )
}
