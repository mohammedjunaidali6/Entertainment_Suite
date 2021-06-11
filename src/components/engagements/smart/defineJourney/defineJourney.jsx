import React, { Fragment, useEffect, useState } from 'react';
import { getData, postData } from '../../../../api/ApiHelper';
import './defineJourney.css';
import _ from 'lodash';
import Loader from '../../../common/Spinner/spinner'

const tempArray = [
    { id: 1, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false },
    { id: 2, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false },
    { id: 3, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false },
    { id: 4, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false },
    { id: 5, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false },
    { id: 6, tags: ['login', 'Add 5 products to cart', 'Add 2 products to Wishlist'], isActive: false }
];

export default function DefineJourney(props) {
    const [journeyBoxes, setJourneyBoxes] = useState();
    const [loading, setLoading] = useState(false);

    function journeyBoxClick(boxData) {
        journeyBoxes.forEach((loopObj) => { loopObj.isActive = false });
        boxData.isActive = true;
        props.getDefineJourney(boxData);
    }

    const djChange = () => {

    }
    const fetchJourneyData = () => {
        setLoading(true);
        getData(`/engt/journeybyfilters`)
            .then(response => {
                if (response && Array.isArray(response.data?.data)) {
                    let journeyArr = [];
                    response.data.data.forEach(journey => {
                        let existedJrny = _.find(journeyArr, j => j.id == journey.JourneyID);
                        if (existedJrny) {
                            existedJrny.tags.push(journey.EventDisplayName);
                        } else {
                            let journObj = {};
                            journObj.id = journey.JourneyID;
                            journObj.name = journey.JourneyName;
                            journObj.isActive = props.props.journeyBox?.id == journey.JourneyID ?? false;
                            journObj.tags = [];
                            journObj.tags.push(journey.EventDisplayName);
                            journeyArr.push(journObj);
                        }
                    })
                    setJourneyBoxes(journeyArr);
                } else {
                    setJourneyBoxes();
                }
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchJourneyData();
        return () => {
            console.log('defineJourney Component Unmount')
        }
    }, []);


    return (
        <div id="define-journey-container" className="c-e-journey-sec w-100 float-left clearfix">
            <div className="c-e-journey-h">Choose User Journey </div>
            {loading ?
                <Loader />
                :
                <div className="c-e-journey-boxes w-100 float-left clearfix">
                    {journeyBoxes && journeyBoxes.length > 0 ? (
                        <Fragment>
                            {journeyBoxes.map((obj, idx) => (
                                <div className="c-e-journey-box w-33 float-left clearfix p-relative" key={obj.id} onClick={() => journeyBoxClick(obj)}>
                                    <div className={`c-e-journey-box-inner w-100 float-left clearfix checkmark ${obj.isActive ? `selectedBox` : ``}`}>
                                        {/* <div className={`${obj.isActive ? `checkmark-circle`: `unmark-circle`}`}></div> */}
                                        <input id={`define-journey-chk${obj.id}`} className="define-journey-chk" type="checkbox" checked={obj.isActive} onChange={djChange}></input>
                                        <div className="w-100 float-left clearfix c-e-journey-box-inner-h">{obj.name}</div>
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
            }
        </div>
    )
}