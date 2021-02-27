import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import SideMenu from "../common/sideMenu/sideMenu";
import './home.css';
import { containerHeightCalcFn } from "../common/global";

export default function Home(props) {
    const path = useLocation();
    const [sideMenuFlag, setSideMenuFlag] = useState(true);
    useEffect(() => {
        console.log('path', path);
        if(path.pathname === '/settings') {
            setSideMenuFlag(false);
        } else {
            setSideMenuFlag(true);
        }
    }, [path.pathname]);
    return (
        <div id="home-container">
            {sideMenuFlag ? (
                <SideMenu></SideMenu>
            ) : null}
            <div className={`float-left clearfix ${sideMenuFlag ? `w-80` : `w-100`}`} style={{height: containerHeightCalcFn()}}>
                {props.children}    
            </div>
        </div>
    )
}
