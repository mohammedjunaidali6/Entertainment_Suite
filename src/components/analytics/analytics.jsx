import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import AnalyticsReportContatiner from "../../containers/analytics/report/reportContainer";
import AnalyticsTrendsContatiner from "../../containers/analytics/trends/trendsContainer";
import AnalyticsGamePerformanceContatiner from "../../containers/analytics/gamePerformance/gamePerformanceContainer";

import share_src from '../../assets/img/share.svg';
import filter_src from '../../assets/img/filter_main.svg';
import download_src from '../../assets/img/download_main.svg';
import './analytics.css';

export default function Analytics(props) {
    let history = useHistory();
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
    
    return (
        <div id="analytics-container" className="pr-2">
            <div className="pr-3">
                <span className="a-h">Analytics</span>
                <img src={download_src} alt="Download" className="float-right ml-2 a-h-img" onClick={handleClick} />
                <img src={filter_src} alt="Filter" className="float-right ml-2 a-h-img" />
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
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                center
                classNames={{
                    overlayAnimationIn: 'customEnterOverlayAnimation',
                    overlayAnimationOut: 'customLeaveOverlayAnimation',
                    modalAnimationIn: 'customEnterModalAnimation',
                    modalAnimationOut: 'customLeaveModalAnimation',
                }}
                animationDuration={800}
                showCloseIcon={false}
            >
                <div id="a-r-modal-container">
                    <div className="modal-h">
                        Share the Report
                    </div>
                    <div className="w-100 text-center">
                        <button id="modal-no" type="button" className="modal-no mr-4" onClick={closeModal}>
                            <span className="button-text">Cancel</span>
                        </button>
                        <button id="modal-yes" type="button" className="modal-yes">
                            <span className="button-text">Send</span>
                        </button>
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
