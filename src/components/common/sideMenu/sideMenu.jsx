import React, { Fragment, useState } from 'react';
import './sideMenu.css';
import { containerHeightCalcFn } from "../global";
import default_user from "../../../assets/img/default_user.png";

export default function SideMenu(props) {
    const [selectedSM, setSelectedSM] = useState(1);
    const [engagementSM, setEngagementSM] = useState(1);
    const [analyticsSM, setAnalyticsSM] = useState(1);
    const [manageSM, setManageSM] = useState(1);
    
    function engagementClick() {
        setSelectedSM(2);
        setEngagementSM(1);
    }
    return (
        <div id="side-menu-container" className="w-20 float-left clearfix" style={{height: containerHeightCalcFn()}}>
            <div className={`s-m-major float-left clearfix ${selectedSM === 1 || selectedSM === 3 ? `w-100` : `w-25`}`} >
                <div className={`s-m-item ${selectedSM === 1 ? `active` : ``}`} onClick={() => setSelectedSM(1)}>
                    <img src={default_user} className="s-m-item-img" alt="Overview" />
                    {selectedSM === 1 || selectedSM === 3 ? (<span className="s-m-item-lbl">Overview</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 2 ? `active` : ``}`} onClick={() => engagementClick()}>
                    <img src={default_user} className="s-m-item-img" alt="Engagements" />
                    {selectedSM === 1 || selectedSM === 3 ? (<span className="s-m-item-lbl">Engagements</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 3 ? `active` : ``}`} onClick={() => setSelectedSM(3)}>
                    <img src={default_user} className="s-m-item-img" alt="Liveview" />
                    {selectedSM === 1 || selectedSM === 3 ? (<span className="s-m-item-lbl">Live view</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 4 ? `active` : ``}`} onClick={() => setSelectedSM(4)}>
                    <img src={default_user} className="s-m-item-img" alt="Analytics" />
                    {selectedSM === 1 || selectedSM === 3 ? (<span className="s-m-item-lbl">Analytics</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 5 ? `active` : ``}`} onClick={() => setSelectedSM(5)}>
                    <img src={default_user} className="s-m-item-img" alt="CustomerSegment" />
                    {selectedSM === 1 || selectedSM === 3 ? (<span className="s-m-item-lbl">Customer Segment</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 6 ? `active` : ``}`} onClick={() => setSelectedSM(6)}>
                    <img src={default_user} className="s-m-item-img" alt="Manage" />
                    {selectedSM === 1 || selectedSM === 3 ? (<span className="s-m-item-lbl">Manage</span>) : null}
                </div>
                <div className={`s-m-item ${selectedSM === 7 ? `active` : ``}`} onClick={() => setSelectedSM(7)}>
                    <img src={default_user} className="s-m-item-img" alt="Admin" />
                    {selectedSM === 1 || selectedSM === 3 ? (<span className="s-m-item-lbl">Admin</span>) : null}
                </div>
            </div>
            {selectedSM !== 1 || selectedSM !== 3 ? (
                <div className="s-m-sub w-75 float-left clearfix">
                    {selectedSM === 2 ? (
                        <Fragment>
                            <div className="s-m-sub-h">Engagements</div>
                            <div className={`s-m-sub-tab ${engagementSM === 1 ? `active` : ``}`} onClick={() => setEngagementSM(1)} >
                                <span>Smart Engagements</span>
                            </div>
                            <div className={`s-m-sub-tab ${engagementSM === 2 ? `active` : ``}`} onClick={() => setEngagementSM(2)}>
                                <span>Journey</span>
                            </div>
                        </Fragment>
                    ) : null }
                    {selectedSM === 4 ? (
                        <Fragment>
                            <div className="s-m-sub-h">Analytics</div>
                            <div className={`s-m-sub-tab ${analyticsSM === 1 ? `active` : ``}`} onClick={() => setAnalyticsSM(1)} >
                                <span>Report 1</span>
                            </div>
                            <div className={`s-m-sub-tab ${analyticsSM === 2 ? `active` : ``}`} onClick={() => setAnalyticsSM(2)}>
                                <span>Trends</span>
                            </div>
                            <div className={`s-m-sub-tab ${analyticsSM === 3 ? `active` : ``}`} onClick={() => setAnalyticsSM(3)}>
                                <span>Game Performance</span>
                            </div>
                        </Fragment>
                    ) : null }
                    {selectedSM === 6 ? (
                        <Fragment>
                            <div className="s-m-sub-h">Manage</div>
                            <div className={`s-m-sub-tab ${manageSM === 1 ? `active` : ``}`} onClick={() => setManageSM(1)} >
                                <span>Rewards</span>
                            </div>
                            <div className={`s-m-sub-tab ${manageSM === 2 ? `active` : ``}`} onClick={() => setManageSM(2)}>
                                <span>Game Play</span>
                            </div>
                        </Fragment>
                    ) : null }
                </div>
            ) : null }
        </div>
    )
}
