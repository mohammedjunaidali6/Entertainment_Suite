import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import AnalyticsReportContatiner from "../../containers/analytics/report/reportContainer";
import AnalyticsTrendsContatiner from "../../containers/analytics/trends/trendsContainer";
import AnalyticsGamePerformanceContatiner from "../../containers/analytics/gamePerformance/gamePerformanceContainer";

import share_src from '../../assets/img/share.svg';
import filter_src from '../../assets/img/filter_main.svg';
import download_src from '../../assets/img/download_main.svg';
import s_filter_src from '../../assets/img/segment_filter.svg';
import plus_src from '../../assets/img/add_gray.svg';
import './analytics.css';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
}));

const tempFormats = [
    {id: 1, name: 'PDF', isActive: true},
    {id: 2, name: 'XML', isActive: false},
    {id: 3, name: 'CSV', isActive: false}
]

export default function Analytics(props) {
    let history = useHistory();
    const classes = useStyles();
    const [formats, setFormats] = useState(tempFormats);
    const [modalOpen, setModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = (event) =>{
        setAnchorEl(null);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const [filterEl, setFilterEl] = useState(null);
    const filterOpen = Boolean(filterEl);
    const filterpoperid = filterOpen ? 'filter-popover' : undefined;
    const filterPoperClick = (event) => {
        setFilterEl(event.currentTarget);
    };
    const filterClose = () => {
        setFilterEl(null);
    };

    const afChange = () => {
        
    }
    function analyticsFormatBoxClick(data) {
        formats.forEach((obj) => {
            obj.isActive = false;
        });
        data.isActive = true;
    }
    
    return (
        <div id="analytics-container" className="pr-2">
            <div className="pr-3">
                <span className="a-h">Analytics</span>
                <img src={download_src} alt="Download" className="float-right ml-2 a-h-img" onClick={handleClick} />
                <img src={filter_src} alt="Filter" className="float-right ml-2 a-h-img" onClick={filterPoperClick} />
                <img src={share_src} alt="Share" className="float-right ml-2 a-h-img" onClick={() => setModalOpen(true)} />
            </div>
            {history.location.pathname === '/analytics/report' ? (
                <AnalyticsReportContatiner />
            ) : null}
            {history.location.pathname === '/analytics/trends' ? (
                <AnalyticsTrendsContatiner />
            ) : null}
            {history.location.pathname === '/analytics/gamePerformance' ? (
                <AnalyticsGamePerformanceContatiner />
            ) : null}
            <Popover
                id={filterpoperid}
                open={filterOpen}
                anchorEl={filterEl}
                onClose={filterClose}
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
                    <div className="a-filter-p p-0">
                        <div>
                            <img src={s_filter_src} alt="Filter" />
                            <span className="a-filter-p-h pl-2">Filters</span>
                        </div>
                        <div>
                            <img src={plus_src} alt="Add Filter" />
                            <span className="a-filter-p-a-f-txt pl-2">Add Filter</span>
                        </div>
                        <div className="a-filter-p-action">
                            <div className="a-filter-p-action-s float-right ml-2"><span className="a-filter-p-action-s-txt" onClick={filterClose}>Apply</span></div>
                            <div className="a-filter-p-action-c float-right"><span className="a-filter-p-action-c-txt" onClick={filterClose}>Cancel</span></div>
                        </div>
                    </div>
                </Typography>
            </Popover>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                center
                classNames={{
                    overlayAnimationIn: 'customEnterOverlayAnimation',
                    overlayAnimationOut: 'customLeaveOverlayAnimation',
                    modalAnimationIn: 'customEnterModalAnimation',
                    modalAnimationOut: 'customLeaveModalAnimation',
                    modal: 'a-r-modal-sec'
                }}
                animationDuration={800}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                closeOnEsc={false}
            >
                <div id="a-r-modal-container">
                    <div className="a-r-modal-h">
                        Share the Report
                    </div>
                    <div className="a-r-modal-c">
                        <div className="a-r-modal-c-i">
                            <div className="a-r-modal-c-i-h">Email ID</div>
                            <div className="a-r-modal-c-i-e">
                                <input type="text" placeholder="Email Id" className="w-100" />
                            </div>
                        </div>
                        <div className="a-r-modal-c-i">
                            <div className="a-r-modal-c-i-h">Add a Note</div>
                            <div className="a-r-modal-c-i-e">
                                <textarea type="text" placeholder="Enter Note" className="w-100" />
                            </div>
                        </div>
                        <div className="a-r-modal-c-i">
                            <div className="a-r-modal-c-i-h">Select format</div>
                            <div className="a-r-modal-c-i-e">
                                {formats && formats.length > 0 ? (
                                    <Fragment>
                                        {formats.map((lObj, i) => (
                                            <div className="a-r-modal-c-i-box float-left clearfix" key={`a-r-modal-c-i-box-${i}`} onClick={() => analyticsFormatBoxClick(lObj)}>
                                                <input id={`a-format-chk${lObj.id}`} type="checkbox" className="mt-0" checked={lObj.isActive ? true : false} onChange={afChange}></input>
                                                <span className="a-r-modal-c-i-box-txt pl-2">{lObj.name}</span>
                                            </div>
                                        ))}
                                    </Fragment>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="w-100 float-left clearfix text-center a-filter-p-action">
                        <div className="a-filter-p-action-s float-right ml-2"><span className="a-filter-p-action-s-txt" onClick={closeModal}>Send</span></div>
                        <div className="a-filter-p-action-c float-right"><span className="a-filter-p-action-c-txt" onClick={() => setModalOpen(false)}>Cancel</span></div>
                    </div>
                </div>
            </Modal>
            <Menu
                id="download-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                 >
                <MenuItem onClick={handleClose} className="a-h-menu-item">PDF</MenuItem>
                <MenuItem onClick={handleClose} className="a-h-menu-item">XML</MenuItem>
                <MenuItem onClick={handleClose} className="a-h-menu-item">CSV</MenuItem>
            </Menu>
        </div>
    )
}
