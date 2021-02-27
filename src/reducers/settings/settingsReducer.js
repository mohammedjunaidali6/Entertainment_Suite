import { ACTION_TYPE } from '../../constants/actionTypes';

const initialState = {
  settingdata: undefined
};
const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE: {
      const newState = { ...state };
      newState.settingdata = action.payload ? action.payload: null;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default SettingsReducer;
