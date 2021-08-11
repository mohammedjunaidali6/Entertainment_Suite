import {
  SET_SUMMARY_TOTALS,
  SET_LINE_CANVAS_SALES,
  SET_LINE_CANVAS_DAY_WISE_ACTIVE_ENGAGED,
  SET_LINE_CANVAS_MONTH_WISE_ACTIVE_ENGAGED,
  SET_CUSTOMER_OVERVIEW_TOTALS
} from '../../constants/actionTypes';

const initialState = {
  summaryTotals: null,
  lineCanvasSalesData: null,
};
const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMARY_TOTALS: {
      const newState = { ...state };
      newState.summaryTotals = action.payload ? action.payload : null;
      return newState;
    }
    case SET_CUSTOMER_OVERVIEW_TOTALS: {
      const newState = { ...state };
      newState.customerOverviewTotals = action.payload ? action.payload : null;
      return newState;
    }
    case SET_LINE_CANVAS_SALES: {
      const newState = { ...state };
      newState.lineCanvasSalesData = action.payload ? action.payload : null;
      return newState;
    }
    case SET_LINE_CANVAS_DAY_WISE_ACTIVE_ENGAGED: {
      const newState = { ...state };
      newState.lineCanvasDayWiseActiveAndEngagedCustomers = action.payload ? action.payload : null;
      return newState;
    }
    case SET_LINE_CANVAS_MONTH_WISE_ACTIVE_ENGAGED: {
      const newState = { ...state };
      newState.lineCanvasMonthWiseActiveAndEngagedCustomers = action.payload ? action.payload : null;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default DashboardReducer;
