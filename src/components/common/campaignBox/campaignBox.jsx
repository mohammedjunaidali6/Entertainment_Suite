import React, { useState } from 'react';
import { BsCalendar, BsThreeDotsVertical } from "react-icons/bs";
import classnames from 'classnames';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import './campaignBox.css';
import delete_src from "../../../assets/img/delete.svg";
import pause_src from "../../../assets/img/pause.svg";
import resume_src from "../../../assets/img/resume.svg";
import edit_engmt__src from "../../../assets/img/edit_engmt.svg";

export default function CampaignBox(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'campaign-action-popover' : undefined;

    const campaignActionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const campaignActionClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="w-100 float-left clearfix">
            {props.campaigndata.map((obj) => (
                <div key={obj.EngagementID} className="campaign-box-outer float-left clearfix mb-3">
                    <div className="campaign-box">
                        <div className={classnames('c-b-discount pl-3 pt-2', {
                            'c-b-discount-live': obj.Status === 1,
                            'c-b-discount-paused': obj.Status === 2,
                            'c-b-discount-expired': obj.Status === 3,
                            'c-b-discount-upcoming': obj.Status === 4
                        })}>
                            <span className={`c-b-offer ${obj.Status === 4 ? `c-b-offer-upcoming` : ``}`}>{obj.DisplayName}</span>
                        </div>
                        <div className="w-100 float-left clearfix p-relative">
                            {obj.isRecent ? (
                                <div className="c-b-ribbon">
                                    <span className="c-b-ribbon-inner c-b-ribbon-txt">R<br></br>e<br></br>c<br></br>e<br></br>n<br></br>t</span>
                                </div>
                            ) : null}
                            <div className="w-50 float-left clearfix pl-3 pt-4">
                                <div className="c-b-t-head">{obj.CustomersParticipatedCount}</div>
                                <div className="c-b-t-body">Customer Participated</div>
                            </div>
                            <div className="w-50 float-left clearfix pl-3 pt-4" style={{ alignItems: 'center' }}>
                                <div className="c-b-t-head">{obj.WinnersCount}</div>
                                <div className="c-b-t-body">Winners</div>
                            </div>
                        </div>
                        <div className="w-100 float-left clearfix">
                            <div className="w-50 float-left clearfix pl-3 pt-4">
                                <div className="c-b-t-head">{obj.RepeatedCustomersCount}</div>
                                <div className="c-b-t-body">Repeated Customers</div>
                            </div>
                            <div className="w-50 float-left clearfix pl-3 pt-4">
                                <div className="c-b-t-head">{obj.ToBeDiscussed}</div>
                                <div className="c-b-t-body">To Be Discussed</div>
                            </div>
                        </div>
                        <div className="c-b-dotted"></div>
                        <div className="w-100 c-b-footer pl-3 pr-3 pt-2">
                            <BsCalendar></BsCalendar>
                            <span className="pl-2 c-b-lbl-expiry">Expire On : {new Date(obj.CompletedDate).toLocaleDateString('en-US')}</span>
                            <img src={delete_src} alt='Delete' onClick={() => props.onDeleteClick(obj)} className="float-right ml-2 mt-1" style={{ height: '12px', width: '12px' }} />
                            <img src={resume_src} alt='Resume' onClick={() => props.onViewReportClick(obj)} className="float-right ml-2 mt-1" style={{ height: '14px', width: '14px' }} />
                            <img src={pause_src} alt='Pause' onClick={() => props.onPauseClick(obj)} className="float-right ml-2 mt-1" style={{ height: '14px', width: '14px' }} />
                            <img src={edit_engmt__src} alt='Resume' onClick={() => props.onEditClick(obj)} className="float-right ml-2 mt-1" style={{ height: '12px', width: '12px' }} />
                            {/* <BsThreeDotsVertical onClick={campaignActionClick} className="float-right ml-2 mt-1" style={{ cursor: "pointer" }}></BsThreeDotsVertical>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={campaignActionClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <Typography className="">
                                    <div className="c-b-campaign-options p-0">
                                        <div onClick={() => { setAnchorEl(null); props.onPauseClick(obj) }}>Pause</div>
                                        <div onClick={() => { setAnchorEl(null); props.onEditClick(obj) }}>Edit</div>
                                        <div onClick={() => { setAnchorEl(null); props.onViewReportClick(obj) }}>View Report</div>
                                        <div onClick={() => { setAnchorEl(null); props.onDeleteClick(obj) }}>Delete</div>
                                    </div>
                                </Typography>
                            </Popover> */}
                            <span className="c-b-status float-right mt-1"><div className={classnames('mr-2', {
                                'logo-live': obj.Status === 1,
                                'logo-paused': obj.Status === 2,
                                'logo-expired': obj.Status === 3,
                                'logo-upcoming': obj.Status === 4
                            })}></div>{obj.Status == 1 ? 'Live' : obj.Status == 2 ? 'Paused' : obj.Status == 3 ? 'Expired' : obj.Status == 4 ? 'Upcoming' : 'Completed'}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}