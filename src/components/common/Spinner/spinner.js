import Spinner from 'react-spinner-material';
import React, { Component } from 'react';

export default function Loader(props) {
    return (
        <div style={{ margin: 'auto', left: '50%', top: '50%', position: 'fixed' }}>
            <Spinner radius={100} color={"#333"} stroke={2} visible={true} />
        </div>
    );
}