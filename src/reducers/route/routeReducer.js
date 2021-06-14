import { SET_SHOW_LOADER, SET_OPEN_ALERT_DIALOG } from '../../constants/actionTypes';

const initialState = {
    showLoader: false,
    alertDialog: { open: false, title: '', text: '', handleClose: () => { } },
};
const RouteReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOW_LOADER: {
            const newState = { ...state };
            newState.showLoader = action.payload || false;
            return newState;
        }
        case SET_OPEN_ALERT_DIALOG: {
            const newState = { ...state };
            newState.alertDialog = action.payload || false;
            return newState;
        }
        default: {
            return state;
        }
    }
};
export default RouteReducer;

