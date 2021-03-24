import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from "react-router-dom";
import SideMenu from "../common/sideMenu/sideMenu";
import './home.css';
import { containerHeightCalcFn } from "../common/global";

export default function Home(props) {
    const path = useLocation();
    const [sideMenuFlag, setSideMenuFlag] = useState(true);
    useEffect(() => {
        if(path.pathname === '/login' || path.pathname === '/register' || path.pathname === '/verify' || path.pathname === '/settings') {
            setSideMenuFlag(false);
        } else {
            setSideMenuFlag(true);
        }
    }, [path.pathname]);
    return (
        <div id="home-container">
            {window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/verify' ? (
                <Fragment>
                    {sideMenuFlag ? (
                        <SideMenu></SideMenu>
                    ) : null}
                </Fragment>
            ) : null}
            <div id="home-content" className={`float-left clearfix ${path.pathname !== '/settings' ? `pt-4 pl-4 pb-4 pr-2` : ``} ${sideMenuFlag ? `w-80` : `w-100`}`} style={{height: containerHeightCalcFn()}}>
                {props.children}    
            </div>
        </div>
    )
}
