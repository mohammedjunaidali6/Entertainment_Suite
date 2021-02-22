import React, { useState } from 'react';

import './home.css';

export default function Home(props) {
    const [contentWrapperHeight] = useState((window.innerHeight - 70) + 'px');
    return (
        <div id="home-container" style={{height: contentWrapperHeight}}>
            {props.children}
        </div>
    )
}
