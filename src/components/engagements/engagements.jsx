import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import './engagements.css';
import EngagementsSmartContatiner from "../../containers/engagements/smart/smartContainer";
import EngagementsJourneyContatiner from "../../containers/engagements/journey/journeyContainer";

export default function Engagements(props) {
    let history = useHistory();
    
    return (
        <div id="engagements-container">
            <span>Engagements Component</span>
            {history.location.pathname === '/engagements/smart' ? (
                <EngagementsSmartContatiner />
            ) : null}
            {history.location.pathname === '/engagements/journey' ? (
                <EngagementsJourneyContatiner />
            ) : null}
        </div>
    )
}
