import React, { useState, Fragment } from 'react';
import './MessageBox.css';

export default function MessageBox(props) {

    var rectType = props.type == 'success' ? 'rectangle rectangle-success' :
        props.type == 'error' ? 'rectangle rectangle-error' :
            props.type == 'warning' ? 'rectangle rectangle-warning' : '';

    var labelType = props.type == 'success' ? 'label label-success' :
        props.type == 'error' ? 'label label-error' :
            props.type == 'warning' ? 'label label-warning' : '';

    return (
        <div className={rectType} style={{ display: props.display, position: 'absolute' }}>
            <label className={labelType}>
                {props.text}
            </label>
        </div>
    )
}