import store from "../../store/store";
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

export function storeDataFn(reducerName, objName) {
    return store && store.getState([reducerName]) && store.getState([reducerName][objName]) ? store.getState([reducerName][objName]) : "";
}
