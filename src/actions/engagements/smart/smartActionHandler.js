import {
  E_S_SET_GOALS,
  E_S_TARGET_AUDIENCE,
  E_S_DEFINE_JOURNEY,
  E_S_REWARDS_AND_BUDGET,
  SET_ENGAGEMENTS
} from '../../../constants/actionTypes';

export function dispatchEngagementsData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_ENGAGEMENTS,
      payload: data,
    });
  };
}

export function dispatchSetGoalsData(data) {
  return (dispatch) => {
    dispatch({
      type: E_S_SET_GOALS,
      payload: data,
    });
  };
}

export function dispatchTargetAudienceData(data) {
  return (dispatch) => {
    dispatch({
      type: E_S_TARGET_AUDIENCE,
      payload: data,
    });
  };
}

export function dispatchDefineJourneyData(data) {
  return (dispatch) => {
    dispatch({
      type: E_S_DEFINE_JOURNEY,
      payload: data,
    });
  };
}

export function dispatchRewardsAndBudgetData(data) {
  return (dispatch) => {
    dispatch({
      type: E_S_REWARDS_AND_BUDGET,
      payload: data,
    });
  };
}
