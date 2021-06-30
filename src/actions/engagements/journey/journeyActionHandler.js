import { ES_SET_ALL_JOURNEYS_TASKS, ES_SET_ALL_JOURNEYS_DATA, ES_SET_JOURNEY_DETAILS } from '../../../constants/actionTypes';

export function dispatchJourneyDetails(data) {
  return (dispatch) => {
    dispatch({
      type: ES_SET_JOURNEY_DETAILS,
      payload: data,
    });
  };
}

export function dispatchJourneysData(data) {
  return (dispatch) => {
    dispatch({
      type: ES_SET_ALL_JOURNEYS_DATA,
      payload: data,
    });
  };
}

export function dispatchJourneyTasks(data) {
  return (dispatch) => {
    dispatch({
      type: ES_SET_ALL_JOURNEYS_TASKS,
      payload: data,
    });
  };
}

