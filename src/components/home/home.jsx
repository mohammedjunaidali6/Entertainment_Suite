import React, { useState } from 'react';
import SideMenu from "../common/sideMenu/sideMenu";
import './home.css';
import { containerHeightCalcFn } from "../common/global";

export default function Home(props) {
    return (
        <div id="home-container">
            <SideMenu></SideMenu>
            <div className="w-80 float-left clearfix" style={{height: containerHeightCalcFn()}}>
                {props.children}    
            </div>
        </div>
    )
}
