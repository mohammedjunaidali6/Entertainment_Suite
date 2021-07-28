import React, { Fragment, useEffect, useState } from 'react';
import { getData, postData } from '../../../../api/ApiHelper';
import './defineJourney.css';
import _ from 'lodash';
import { JOURNEY_BY_FILTERS } from '../../../../api/apiConstants';


export default function DefineJourney(props) {
    const [journeyBoxes, setJourneyBoxes] = useState();

    function journeyBoxClick(boxData) {
        journeyBoxes.forEach((loopObj) => { loopObj.isActive = false });
        boxData.isActive = true;
        props.getDefineJourney(boxData);
    }

    const djChange = () => {

    }
    const fetchJourneyData = () => {
        props.handleLoader(true);
        getData(JOURNEY_BY_FILTERS)
            .then(journeys => {
                if (journeys) {
                    let journeyArr = [];
                    journeys.forEach(journey => {
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
                    props.getDefineJourney(journeyArr.find(j => j.isActive));
                } else {
                    setJourneyBoxes();
                }
                props.handleLoader(false);
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
        </div>
    )
}