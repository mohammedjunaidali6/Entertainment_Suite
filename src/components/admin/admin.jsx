import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import './admin.css';

export default function Admin(props) {
    let history = useHistory();
    
    return (
        <div id="admin-container">
            <span>Admin Component</span>
        </div>
    )
}
