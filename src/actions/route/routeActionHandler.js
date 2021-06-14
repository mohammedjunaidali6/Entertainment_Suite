import { SET_SHOW_LOADER, SET_OPEN_ALERT_DIALOG } from '../../constants/actionTypes';

export function dispatchLoaderData(data) {
    return (dispatch) => {
        dispatch({
            type: SET_SHOW_LOADER,
            payload: data,
        });
    };
}

export function dispatchAlertDialogData(data) {
    return (dispatch) => {
        dispatch({
            type: SET_OPEN_ALERT_DIALOG,
            payload: data,
        });
    };
}
