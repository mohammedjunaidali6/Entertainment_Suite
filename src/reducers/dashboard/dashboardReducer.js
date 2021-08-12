import {
  SET_SUMMARY_TOTALS,
  SET_LINE_CANVAS_SALES,
  SET_LINE_CANVAS_DAY_WISE_ACTIVE_ENGAGED,
  SET_LINE_CANVAS_MONTH_WISE_ACTIVE_ENGAGED,
  SET_INCREMENTAL_SALES_TOTALS,
  SET_BRAND_HEALTH_TOTALS,
  SET_BAR_CANVAS_BRAND_HEALTH_DATA,
} from '../../constants/actionTypes';

const initialState = {
  summaryTotals: null,
  lineCanvasSalesData: null,
  funnelIncrementalSalesData: null,
  barCanvasDayWiseBrandHealthData: null,
};
const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMARY_TOTALS: {
      const newState = { ...state };
      newState.summaryTotals = action.payload ? action.payload : null;
      return newState;
    }
    case SET_INCREMENTAL_SALES_TOTALS: {
      const newState = { ...state };
      newState.incrementalSalesTotals = action.payload ? action.payload : null;
      return newState;
    }
    case SET_BRAND_HEALTH_TOTALS: {
      const newState = { ...state };
      newState.brandHealthTotals = action.payload ? action.payload : null;
      return newState;
    }
    case SET_BAR_CANVAS_BRAND_HEALTH_DATA: {
      const newState = { ...state };
      newState.barCanvasDayWiseBrandHealthData = action.payload ? action.payload : null;
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
