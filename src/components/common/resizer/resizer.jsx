import React, { useEffect, useState } from 'react';
import { getLinearGradientCSS } from "../global";

import './resizer.css';

export default function Resizer(props) {
    const [ballSize, setBallSize] = useState(props.initialSize);
    const [formattedBallSize,setFormattedBallSize]=useState();
    const handleChange = (e) => {
        if (e.target.id === 'budgetResizer') {
            props.updateBudget(e.target.value)
        } else {
            props.updateBudgetDuration(e.target.value)
        }
        setBallSize(e.target.value);
        setFormattedBallSize(parseInt(e.target.value).toLocaleString())
        calculateFn(e.target);
    }

    const valueTotalRatio = (value, min, max) => {
        return ((value - min) / (max - min)).toFixed(2);
    }

    const calculateFn = (el) => {
        let ratio = valueTotalRatio(props.fromCEStepper ? props.initialSize : el.value, el.min, el.max);
        el.style.backgroundImage = getLinearGradientCSS(ratio, '#6b9cf3', '#D8D8D8');
    }

    useEffect(() => {
        if (props.id) {
            calculateFn(document.getElementById(props.id));
        }
    });

    return (
        <div id="resizer-container">
            <div className={`float-left clearfix ${props.valText !== undefined ? `w-80` : `w-100`}`} style={{ position: "relative" }}>
                <input id={props.id ? props.id : 'resizer'}
                    type="range"
                    className="slider"
                    min={props.minSize}
                    max={props.maxSize}
                    value={ballSize}
                    onChange={handleChange} />
            </div>
            {props.valText !== undefined ? (
                <div className="w-20 float-left clearfix">
                    <div className="v-box w-80">
                        {/* <input className='v-box-t' value={ballSize}/> */}
                        <span className="v-box-t">{formattedBallSize} {props.valText}</span>
                    </div>
                </div>
            ) : null}
        </div>
    )
}