import {
  SET_SUMMARY_TOTALS,
  SET_LINE_CANVAS_SALES,
  SET_LINE_CANVAS_MONTH_WISE_ACTIVE_ENGAGED,
  SET_LINE_CANVAS_DAY_WISE_ACTIVE_ENGAGED,
  SET_CUSTOMER_OVERVIEW_TOTALS
} from '../../constants/actionTypes';

export function dispatchSummaryTotalsData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_SUMMARY_TOTALS,
      payload: data,
    });
  };
}
export function dispatchCustomerOverviewTotalsData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_CUSTOMER_OVERVIEW_TOTALS,
      payload: data,
    });
  };
}
export function dispatchLineCanvasSalesData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_LINE_CANVAS_SALES,
      payload: data,
    });
  };
}
export function dispatchLineCanvasDayWiseActiveEngagedUsersData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_LINE_CANVAS_DAY_WISE_ACTIVE_ENGAGED,
      payload: data,
    });
  };
}
export function dispatchLineCanvasMonthWiseActiveEngagedUsersData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_LINE_CANVAS_MONTH_WISE_ACTIVE_ENGAGED,
      payload: data,
    });
  };
}
