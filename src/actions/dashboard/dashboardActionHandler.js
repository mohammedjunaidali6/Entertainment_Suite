import {
  SET_SUMMARY_TOTALS,
  SET_LINE_CANVAS_SALES,
  SET_LINE_CANVAS_MONTH_WISE_ACTIVE_ENGAGED,
  SET_LINE_CANVAS_DAY_WISE_ACTIVE_ENGAGED,
  SET_INCREMENTAL_SALES_TOTALS,
  SET_BRAND_HEALTH_TOTALS,
  SET_BAR_CANVAS_BRAND_HEALTH_DATA
} from '../../constants/actionTypes';

export function dispatchSummaryTotalsData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_SUMMARY_TOTALS,
      payload: data,
    });
  };
}
export function dispatchIncrementalSalesTotalsData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_INCREMENTAL_SALES_TOTALS,
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
export function dispatchBrandHealthData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_BRAND_HEALTH_TOTALS,
      payload: data,
    });
  };
}
export function dispatchBarCanvasBrandHealthData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_BAR_CANVAS_BRAND_HEALTH_DATA,
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
