import React from 'react';

import edit_src from '../../../../assets/img/edit.svg'
import './review.css';

export default function Review(props) {

    return (
        <div id="review-container" >
            <div className="w-70 float-left clearfix c-e-r-left">
                <div className="c-e-r-left-h mb-1">Campaign Name</div>
                <div className="c-e-r-left-c-n">
                    New Year Sal 1000 Off
                    <div className="disp-inline-b float-right c-pointer">
                        <img src={edit_src} alt="Edit" />
                        <span className="c-e-r-left-e-txt">Edit</span>
                    </div>
                </div>
                <div className="c-e-r-left-h">Target Audience</div>
                <div className="c-e-r-left-t-a-box">
                    <div className="c-e-r-left-t-a-box-h">User Segment</div>
                    <div className="c-e-r-left-t-a-box-i"></div>
                    <div className="c-e-r-left-t-a-box-i"></div>
                    <div className="c-e-r-left-t-a-box-h">Rule</div>
                    <div className="c-e-r-left-t-a-box-i"></div>
                </div>

                <div className="c-e-r-left-h">
                    Define Journey
                    <div className="disp-inline-b float-right c-pointer">
                        <img src={edit_src} alt="Edit" />
                        <span className="c-e-r-left-e-txt">Edit</span>
                    </div>
                </div>
                <div className="c-e-r-left-d-j-box">
                    <div className="c-e-r-left-t-a-box-h">Journey Name 1</div>
                    <div className="disp-inline-b c-e-r-left-d-j-tag">Login</div>
                    <div className="disp-inline-b c-e-r-left-d-j-tag">Add 5 products to cart</div>
                    <div className="disp-inline-b c-e-r-left-d-j-tag">Add 2 products to Wishlist</div>
                </div>

                <div className="c-e-r-left-h">
                    Rewards & Budget
                    <div className="disp-inline-b float-right c-pointer">
                        <img src={edit_src} alt="Edit" />
                        <span className="c-e-r-left-e-txt">Edit</span>
                    </div>
                </div>
                <div className="c-e-r-left-r-b-box">
                    <div className="c-e-r-left-r-b-box-h">Rewards</div>
                    <div className="c-e-r-left-r-b-box-table clearfix">
                        <div className="c-e-r-left-r-b-box-bd-box-h">Winner Position</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h">Reward Type</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h">No. of Awards</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h">Probability</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h">Display Name</div>
                        <div className="c-e-r-left-r-b-box-bd-box-h">Rewards</div>
                    </div>
                    <div className="c-e-r-left-r-b-box-bd">
                        <div className="c-e-r-left-r-b-box-bd-box"><span className="c-e-r-left-r-b-box-bd-prefix">$</span>2000</div>
                        <div className="c-e-r-left-r-b-box-bd-box"></div>
                        <div className="c-e-r-left-r-b-box-bd-box"></div>
                    </div>
                </div>
            </div>
            <div className="w-30 float-left clearfix c-e-r-right">

            </div>
        </div>
    )
}