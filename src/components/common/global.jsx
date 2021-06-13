import { forwardRef } from "react";
import store from "../../store/store";

import calender_src from '../../assets/img/calender.svg';
import down_arrow_src from '../../assets/img/down_arrow.svg';
import { Fragment } from "react";

export function ConsoleFn(url) {
    console.log('Try to redirect' + ' ' + url);
}

export function containerHeightCalcFn(param) {
    param = param ? param : 70;
    let tempHt = window.innerHeight - param;
    tempHt = tempHt + 'px';
    return tempHt;
}

export function bodyOverflowHiddenFn() {
    document.body.style.overflow = "hidden";
}

export function storeStateFn() {
    return store && store.getState();
}
export function storeDataFn(reducerName, objName) {
    return store && store.getState([reducerName]) && store.getState([reducerName][objName]) ? store.getState([reducerName][objName]) : "";
}

export function getLinearGradientCSS(ratio, leftColor, rightColor) {
    return [
        '-webkit-gradient(',
        'linear, ',
        'left top, ',
        'right top, ',
        'color-stop(' + ratio + ', ' + leftColor + '), ',
        'color-stop(' + ratio + ', ' + rightColor + ')',
        ')'
    ].join('');
}

export const CustomDatePickerEL = forwardRef(
    ({ value, onClick }, props, ref) => (props.fromReward ? (
        <Fragment>
            <div className="c-d-p-reward-container float-left" onClick={onClick} ref={ref} >
                <img src={calender_src} alt="Calender" className="mr-2" />
                <span className="c-d-p-lbl pr-2">{value ? value : `MM/DD/YYYY`}</span>
                <img src={down_arrow_src} alt="Down Arrow" />
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="c-d-p-container float-left" onClick={onClick} ref={ref} >
                <img src={calender_src} alt="Calender" className="mr-2" />
                <span className="c-d-p-lbl pr-2">{value ? value : `MM/DD/YYYY`}</span>
                <img src={down_arrow_src} alt="Down Arrow" />
            </div> </Fragment>)
    ),
);

export function removeObjFromArray(array, object, key) {
    var index = array.findIndex(o => o[key] === object[key]);
    if (index === -1) array.push(object);
    else array.splice(index, 1);
    return array;
}