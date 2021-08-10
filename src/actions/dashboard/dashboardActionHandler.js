import { SET_SUMMARY_TOTALS } from '../../constants/actionTypes';

export function dispatchSummaryTotalsData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_SUMMARY_TOTALS,
      payload: data,
    });
  };
}
