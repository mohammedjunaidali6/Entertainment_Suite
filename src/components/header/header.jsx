import React, { Fragment, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { BsChevronDown } from 'react-icons/bs';
import { BsFillBellFill } from "react-icons/bs";
import { BsSearch } from 'react-icons/bs';

import './header.css';
import logo_src from '../../assets/img/header/logo.png';
import default_user_src from '../../assets/img/default_user.png';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const [company, setCompany] = React.useState('');

    const handleChange = (event) => {
        setCompany(event.target.value);
    };

    function notificationFn() {

    }

    function searchFn() {

    }

    return (
        <div id="header-container">
            <div className="w-50 float-left clearfix">
                <img src={logo_src} alt="Divanor" className="h-logo" />
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
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <Fragment>
                            <div className="h-logged-user-sec float-right clearfix" {...bindToggle(popupState)}>
                                <img src={default_user_src} alt="logged user" className="h-logger-user" />
                                <BsChevronDown style={{color: "white"}} />
                            </div>
                            <Popper {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350} className="h-logger-user-options-sec" >
                                    <Paper>
                                        <Typography className={classes.typography} className="p-0">
                                            <div className="h-logger-user-options p-0">
                                                <div>Settings</div>
                                                <div>Help</div>
                                                <div style={{borderBottom: "1px solid #DBDDDE"}}>Logout</div>
                                                <div>Last Login 12th Jan 21, 10:30am</div>
                                            </div>
                                        </Typography>
                                    </Paper>
                                </Fade>
                                )}
                            </Popper>
                        </Fragment>
                    )}
                </PopupState>
                <BsFillBellFill className="h-icons float-right clearfix" onClick={() => notificationFn()} ></BsFillBellFill>
                <BsSearch className="h-icons float-right clearfix" onClick={() => searchFn()} style={{marginLeft: "40px"}}></BsSearch>
                <div className="h-links float-right clearfix">Product Tour</div>
                <div className="h-links float-right clearfix">Support Request</div>
            </div>
        </div>
    )
}
