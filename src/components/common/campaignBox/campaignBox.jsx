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
    const [openedPopoverId, setOpenedPopoverId] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'campaign-action-popover' : undefined;

    const campaignActionClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setOpenedPopoverId(id);
    };
    const campaignActionClose = () => {
        setAnchorEl(null);
        setOpenedPopoverId(null);
    };
    const pauseClick = (obj, status) => {
        setAnchorEl(null);
        setOpenedPopoverId(null);
        props.onPauseClick(obj, status);
    }
    const editClick = (obj) => {
        setAnchorEl(null);
        setOpenedPopoverId(null);
        props.onEditClick(obj);
    }
    const deleteClick = (obj) => {
        setAnchorEl(null);
        setOpenedPopoverId(null);
        props.onDeleteClick(obj);
    }
    const viewClick = (obj) => {
        setAnchorEl(null);
        setOpenedPopoverId(null);
        props.onViewReportClick(obj);
    }
    let arr1 = ['1,945', '2,630', '8,621', '4,320', '1,587', '3,560']
    let arr2 = ['145', '230', '821', '420', '187', '360']
    let arr3 = ['195', '120', '21', '240', '287', '160']
    let arr4 = ['2,745', '2,630', '6,821', '4,990', '1,554', '3,220']

    return (
        <div className="w-100 float-left clearfix">
            {props.campaigndata.map((obj, idx) => (
                console.log('***', obj),
                <div key={idx} className="campaign-box-outer float-left clearfix mb-3">
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
                                <div className="c-b-t-head">{arr1[Math.floor(Math.random() * arr1.length)]}</div>
                                <div className="c-b-t-body">Customer Participated</div>
                            </div>
                            <div className="w-50 float-left clearfix pl-3 pt-4" style={{ alignItems: 'center' }}>
                                <div className="c-b-t-head">{arr2[Math.floor(Math.random() * arr2.length)]}</div>
                                <div className="c-b-t-body">Winners</div>
                            </div>
                        </div>
                        <div className="w-100 float-left clearfix">
                            <div className="w-50 float-left clearfix pl-3 pt-4">
                                <div className="c-b-t-head">{arr3[Math.floor(Math.random() * arr3.length)]}</div>
                                <div className="c-b-t-body">Repeated Customers</div>
                            </div>
                            <div className="w-50 float-left clearfix pl-3 pt-4">
                                <div className="c-b-t-head">{arr4[Math.floor(Math.random() * arr4.length)]}</div>
                                <div className="c-b-t-body">Number of Gameplays</div>
                            </div>
                        </div>
                        <div className="c-b-dotted"></div>
                        <div className="w-100 c-b-footer pl-3 pr-3 pt-2">
                            <BsCalendar></BsCalendar>
                            <span className="pl-2 c-b-lbl-expiry">
                                Expire On : {new Date(obj.CompletedDate).toLocaleDateString('en-US')}
                            </span>
                            <BsThreeDotsVertical onClick={(e) => campaignActionClick(e, obj.EngagementID)} className="float-right ml-2 mt-1" style={{ cursor: "pointer" }}></BsThreeDotsVertical>

                            <Popover
                                id={id}
                                open={openedPopoverId === obj.EngagementID}
                                anchorEl={anchorEl}
                                onClose={campaignActionClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                            >
                                <Typography className="">
                                    <span className="c-b-campaign-options p-0">
                                        {obj.Status === 1 ?
                                            <span onClick={() => pauseClick(obj, 2)}>Pause</span>
                                            :
                                            <span onClick={() => pauseClick(obj, 1)}>Resume</span>
                                        }
                                        < span onClick={() => editClick(obj)}>Edit</span>
                                        <span onClick={() => viewClick(obj)}>View Report</span>
                                        <span onClick={() => deleteClick(obj)}>Delete</span>
                                    </span>
                                </Typography>
                            </Popover>
                            <span className="c-b-status float-right mt-1"><div className={classnames('mr-2', {
                                'logo-live': obj.Status === 1,
                                'logo-paused': obj.Status === 2,
                                'logo-expired': obj.Status === 3,
                                'logo-upcoming': obj.Status === 4
                            })}></div>{obj.Status == 1 ? 'Live' : obj.Status == 2 ? 'Paused' : obj.Status == 3 ? 'Expired' : obj.Status == 4 ? 'Upcoming' : 'Completed'}</span>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}