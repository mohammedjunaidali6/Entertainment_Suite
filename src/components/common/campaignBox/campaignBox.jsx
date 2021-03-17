import React, { useState } from 'react';
import { BsCalendar, BsThreeDotsVertical } from "react-icons/bs";
import classnames from 'classnames';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import './campaignBox.css'

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
                <div key={obj.id} className="campaign-box-outer float-left clearfix mb-3">
                    <div className="campaign-box">
                        <div className={classnames('c-b-discount pl-3 pt-2', {
                            'c-b-discount-live': obj.status === 'live',
                            'c-b-discount-paused': obj.status === 'paused',
                            'c-b-discount-expired': obj.status === 'expired',
                            'c-b-discount-upcoming': obj.status === 'upcoming'
                        })}>
                            <span className={`c-b-offer ${obj.status === 'upcoming' ? `c-b-offer-upcoming` : ``}`}>{obj.offer}</span>
                        </div>
                        <div className="w-100 float-left clearfix p-relative">
                            {obj.isRecent ? (
                                <div className="c-b-ribbon">
                                    <span className="c-b-ribbon-inner c-b-ribbon-txt">R<br></br>e<br></br>c<br></br>e<br></br>n<br></br>t</span>
                                </div>
                            ) : null}
                            <div className="w-50 float-left clearfix pl-3 pt-4">
                                <div className="c-b-t-head">{obj.customer}</div>
                                <div className="c-b-t-body">Customer Participated</div>
                            </div>
                            <div className="w-50 float-left clearfix pl-3 pt-4">
                                <div className="c-b-t-head">{obj.sales}</div>
                                <div className="c-b-t-body">Customer Participated</div>
                            </div>
                        </div>
                        <div className="w-100 float-left clearfix">
                            <div className="w-50 float-left clearfix pl-3 pt-4">
                                <div className="c-b-t-head">{obj.customer}</div>
                                <div className="c-b-t-body">Customer Participated</div>
                            </div>
                            <div className="w-50 float-left clearfix pl-3 pt-4">
                                <div className="c-b-t-head">{obj.sales}</div>
                                <div className="c-b-t-body">Customer Participated</div>
                            </div>
                        </div>
                        <div className="c-b-dotted"></div>
                        <div className="w-100 c-b-footer pl-3 pr-3 pt-2">
                            <BsCalendar></BsCalendar>
                            <span className="pl-2 c-b-lbl-expiry">Expire On : {obj.expiredOn}</span>
                            <BsThreeDotsVertical onClick={campaignActionClick} className="float-right ml-2 mt-1" style={{cursor: "pointer"}}></BsThreeDotsVertical>
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
                                        <div>Pause</div>
                                        <div>Edit</div>
                                        <div>View Report</div>
                                        <div>Delete</div>
                                    </div>
                                </Typography>
                            </Popover>
                            <span className="c-b-status float-right mt-1"><div className={classnames('mr-2', {
                                'logo-live': obj.status === 'live',
                                'logo-paused': obj.status === 'paused',
                                'logo-expired': obj.status === 'expired',
                                'logo-upcoming': obj.status === 'upcoming'
                            })}></div>{obj.status}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}