import Spinner from 'react-spinner-material';
import React, { Component } from 'react';

export default function Loader(props) {
    return (
        <div style={{ display: props.show ? 'block' : 'none', margin: 'auto', left: '50%', top: '50%', position: 'fixed', zIndex: '9999' }}>
            <Spinner radius={100} color={"#333"} stroke={2} visible={true} />
        </div>
    );
}