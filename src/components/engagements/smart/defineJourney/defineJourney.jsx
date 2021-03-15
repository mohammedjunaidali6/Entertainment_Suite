import React, { Fragment, useState } from 'react';

import './defineJourney.css';

const tempArray = [
    {id: 1, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false},
    {id: 2, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false},
    {id: 3, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false},
    {id: 4, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false},
    {id: 5, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false},
    {id: 6, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false}
];

export default function DefineJourney(props) {

    const [journeyBoxes, setJourneyBoxes] = useState(tempArray);

    function journeyBoxClick(boxData) {
        journeyBoxes.forEach((loopObj) => { loopObj.isActive = false });
        boxData.isActive = true;
        props.getDefineJourney(boxData);
        console.log('journeyBoxes', journeyBoxes);
    }

    const djChange = () => {
        
    }

    return (
        <div id="define-journey-container" className="c-e-journey-sec w-100 float-left clearfix">
            <div className="c-e-journey-h">Choose User Journey </div>
            <div className="c-e-journey-boxes w-100 float-left clearfix">
                {journeyBoxes && journeyBoxes.length > 0 ? (
                    <Fragment>
                        {journeyBoxes.map((obj, idx) => (
                            <div className="c-e-journey-box w-33 float-left clearfix p-relative" key={obj.id} onClick={() => journeyBoxClick(obj)}>
                                <div className="c-e-journey-box-inner w-100 float-left clearfix checkmark">
                                    {/* <div className={`${obj.isActive ? `checkmark-circle`: `unmark-circle`}`}></div> */}
                                    <input id={`define-journey-chk${obj.id}`} className="define-journey-chk" type="checkbox" checked={obj.isActive ? true : false} onChange={djChange}></input>
                                    <div className="w-100 float-left clearfix c-e-journey-box-inner-h">Journey {idx + 1}</div>
                                    <div className="w-100 float-left clearfix c-e-journey-box-inner-tags">
                                        {obj.tags && obj.tags.length > 0 ? (
                                            <Fragment>
                                                {obj.tags.map((tagObj) => (
                                                    <div className="c-e-journey-box-tag mt-2" key={tagObj}>
                                                        <span className="c-e-journey-box-tag-text">{tagObj}</span>
                                                    </div>
                                                ))}
                                            </Fragment>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Fragment>
                ) : null}
            </div>
        </div>
    )
}