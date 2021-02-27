import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import './manage.css';
import ManageRewardsContatiner from "../../containers/manage/rewards/rewardsContainer";
import ManageGamePlayContatiner from "../../containers/manage/gamePlay/gamePlayContainer";

export default function Manage(props) {
    let history = useHistory();
    
    return (
        <div id="manage-container">
            <span>Manage Component</span>
            {history.location.pathname === '/manage/rewards' ? (
                <ManageRewardsContatiner />
            ) : null}
            {history.location.pathname === '/manage/gameplay' ? (
                <ManageGamePlayContatiner />
            ) : null}
        </div>
    )
}
