import {
  E_S_SET_GOALS,
  E_S_TARGET_AUDIENCE,
  SET_PURCHASE_RULE,
  E_S_DEFINE_JOURNEY, SET_JOURNEY_BOX,
  SET_BUDGET, SET_BUDGET_DURATION,
  E_S_REWARDS_AND_BUDGET, SET_REWARDS,
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
export function dispatchPurchaseRuleData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_PURCHASE_RULE,
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

export function dispatchJourneyBoxData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_JOURNEY_BOX,
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

export function dispatchRewardsData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_REWARDS,
      payload: data,
    });
  };
}
export function dispatchBudget(data) {
  return (dispatch) => {
    dispatch({
      type: SET_BUDGET,
      payload: data,
    });
  };
}
export function dispatchBudgetDuration(data) {
  return (dispatch) => {
    dispatch({
      type: SET_BUDGET_DURATION,
      payload: data,
    });
  };
}

