import { SET_SUMMARY_TOTALS } from '../../constants/actionTypes';

const initialState = {

};
const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMARY_TOTALS: {
      const newState = { ...state };
      newState.summaryTotals = action.payload ? action.payload : null;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default DashboardReducer;
