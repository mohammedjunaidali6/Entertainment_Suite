import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './sideMenu.css';
import { containerHeightCalcFn } from "../global";
import overview_src from "../../../assets/img/overview.svg";
import engagements_src from "../../../assets/img/Engagements.svg";
import liveview_src from "../../../assets/img/Liveview.svg";
import analytics_src from "../../../assets/img/Analytics.svg";
import manage_src from "../../../assets/img/Manage.svg";
import segment_src from "../../../assets/img/Segment.svg";

export default function SideMenu(props) {
    let history = useHistory();
    const [selectedSM, setSelectedSM] = useState(1);
    const [engagementSM, setEngagementSM] = useState(1);
    const [analyticsSM, setAnalyticsSM] = useState(1);
    const [manageSM, setManageSM] = useState(1);

    useEffect(() => {
        if (history && history.location) {
            if (history.location.pathname === '/') {
                setSelectedSM(1);
                // history.push('/');
            } else if (history.location.pathname === '/engagements/smart') {
                setSelectedSM(2);
                setEngagementSM(1);
            } else if (history.location.pathname === '/engagements/journey') {
                setSelectedSM(2);
                setEngagementSM(2);
            } else if (history.location.pathname === '/liveview') {
                setSelectedSM(3);
            } else if (history.location.pathname === '/analytics/report') {
                setSelectedSM(4);
                setAnalyticsSM(1);
            } else if (history.location.pathname === '/analytics/trends') {
                setSelectedSM(4);
                setAnalyticsSM(2);
            } else if (history.location.pathname === '/analytics/gamePerformance') {
                setSelectedSM(4);
                setAnalyticsSM(2);
            } else if (history.location.pathname === '/segments') {
                setSelectedSM(5);
            } else if (history.location.pathname === '/manage/rewards') {
                setSelectedSM(6);
                setManageSM(1);
            } else if (history.location.pathname === '/manage/gameplay') {
                setSelectedSM(6);
                setManageSM(2);
            } else if (history.location.pathname === '/admin') {
                setSelectedSM(7);
            }
        }
    });

    function overviewClick() {
        setSelectedSM(1);
        history.push('/');
    }
    function engagementClick(idx, subIdx, val) {
        setSelectedSM(idx);
        setEngagementSM(subIdx);
        history.push('/engagements/' + val);
    }
    function liveviewClick() {
        setSelectedSM(3);
        history.push('/liveview');
    }
    function analyticsClick(idx, subIdx, val) {
        setSelectedSM(idx);
        setAnalyticsSM(subIdx)
        history.push('/analytics/' + val);
    }
    function segmentClick() {
        setSelectedSM(5);
        history.push('/segments');
    }
    function manageClick(idx, subIdx, val) {
        setSelectedSM(idx);
        setManageSM(subIdx);
        history.push('/manage/' + val);
    }
    function adminClick() {
        setSelectedSM(7);
        history.push('/admin');
    }
    function sideLabelFlag() {
        return selectedSM === 1 || selectedSM === 3 || selectedSM === 5 || selectedSM === 7;
    }

    return (
        <div id="side-menu-container" className="w-20 float-left clearfix" style={{ height: containerHeightCalcFn() }}>
            <div className={`s-m-major float-left clearfix ${sideLabelFlag() ? `w-100` : `w-25`}`} >
                <div className={`s-m-item ${selectedSM === 1 ? `active` : ``}`} onClick={() => overviewClick()}>
                    <img src={overview_src} className="s-m-item-img" alt="Overview" />
                    {sideLabelFlag() ? (<span className="s-m-item-lbl">Overview</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 2 ? `active` : ``}`} onClick={() => engagementClick(2, 1, 'smart')}>
                    <img src={engagements_src} className="s-m-item-img" alt="Engagements" />
                    {sideLabelFlag() ? (<span className="s-m-item-lbl">Engagements</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 3 ? `active` : ``}`} onClick={() => liveviewClick()}>
                    <img src={liveview_src} className="s-m-item-img" alt="Liveview" />
                    {sideLabelFlag() ? (<span className="s-m-item-lbl">
                        Live View &nbsp; 
                        <span className="pill">Coming Soon</span>
                         {/* <img src={comingsoon_src} className="comingsoon-img" /> */}
                    </span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 4 ? `active` : ``}`} onClick={() => analyticsClick(4, 1, 'report')}>
                    <img src={analytics_src} className="s-m-item-img" alt="Analytics" />
                    {sideLabelFlag() ? (<span className="s-m-item-lbl">Analytics</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 5 ? `active` : ``}`} onClick={() => segmentClick()}>
                    <img src={segment_src} className="s-m-item-img" alt="CustomerSegment" />
                    {sideLabelFlag() ? (<span className="s-m-item-lbl">Customer Segment</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 6 ? `active` : ``}`} onClick={() => manageClick(6, 1, 'rewards')}>
                    <img src={manage_src} className="s-m-item-img" alt="Manage" />
                    {sideLabelFlag() ? (<span className="s-m-item-lbl">Manage</span>) : null}
                </div>
                {/* <div className={`s-m-item ${selectedSM === 7 ? `active` : ``}`} onClick={() => adminClick()}>
                    <img src={admin_src} className="s-m-item-img" alt="Admin" />
                    {sideLabelFlag() ? (<span className="s-m-item-lbl">Admin</span>) : null}
                </div> */}
            </div>
            {selectedSM !== 1 || selectedSM !== 3 || selectedSM !== 5 || selectedSM !== 7 ? (
                <div className="s-m-sub w-75 float-left clearfix">
                    {selectedSM === 2 ? (
                        <Fragment>
                            <div className="s-m-sub-h">Engagements</div>
                            <div className={`s-m-sub-tab ${engagementSM === 1 ? `active` : ``}`} onClick={() => engagementClick(2, 1, 'smart')} >
                                <span>Smart Engagements</span>
                            </div>
                            <div className={`s-m-sub-tab ${engagementSM === 2 ? `active` : ``}`} onClick={() => engagementClick(2, 2, 'journey')}>
                                <span>Journey</span>
                            </div>
                        </Fragment>
                    ) : null}
                    {selectedSM === 4 ? (
                        <Fragment>
                            <div className="s-m-sub-h">Analytics</div>
                            <div className={`s-m-sub-tab ${analyticsSM === 1 ? `active` : ``}`} onClick={() => analyticsClick(4, 1, 'report')} >
                                <span>Report</span>
                            </div>
                            {/* <div className={`s-m-sub-tab ${analyticsSM === 2 ? `active` : ``}`} onClick={() => analyticsClick(4, 2, 'trends')}>
                                <span>Trends</span>
                            </div>
                            <div className={`s-m-sub-tab ${analyticsSM === 3 ? `active` : ``}`} onClick={() => analyticsClick(4, 3, 'gamePerformance')}>
                                <span>Game Performance</span>
                            </div> */}
                        </Fragment>
                    ) : null}
                    {selectedSM === 6 ? (
                        <Fragment>
                            <div className="s-m-sub-h">Manage</div>
                            <div className={`s-m-sub-tab ${manageSM === 1 ? `active` : ``}`} onClick={() => manageClick(6, 1, 'rewards')} >
                                <span>Rewards</span>
                            </div>
                            <div className={`s-m-sub-tab ${manageSM === 2 ? `active` : ``}`} onClick={() => manageClick(6, 2, 'gameplay')}>
                                <span>Game Play</span>
                            </div>
                        </Fragment>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}
