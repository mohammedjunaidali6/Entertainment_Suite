
export function ConsoleFn(url) {
    console.log('Try to redirect' + ' ' + url);
}

export function containerHeightCalcFn(param) {
    let tempHt = window.innerHeight - param;
    tempHt = tempHt + 'px';
    return tempHt;
}

export function bodyOverflowHiddenFn() {
    document.body.style.overflow = "hidden";
}
