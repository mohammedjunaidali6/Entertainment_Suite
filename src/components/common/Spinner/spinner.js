import Spinner from 'react-spinner-material';
import React, { Component } from 'react';
import './spinner.css';


export default function Loader(props) {
    return (
        <div style={{ display: props.show ? 'block' : 'none' }} className='spinner_overlay'>
            <Spinner className='spinner' radius={100} color={"#007BFF"} stroke={2} visible={true} />
        </div>
    );
}


export function SmallLoader(props){

    return(
        <div style={{ display: props.show ? 'block' : 'none' }} className='small-loader'>
            <Spinner className='spinner' radius={30} color={"#007BFF"} stroke={2} visible={true} />
        </div>
    )
}