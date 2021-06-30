import { ES_SET_JOURNEY_DETAILS, ES_SET_ALL_JOURNEYS_DATA, ES_SET_ALL_JOURNEYS_TASKS } from '../../../constants/actionTypes';

const initialState = {
  journeyDetails: null,
  journeysData: []
};

const EngagementsJourneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ES_SET_JOURNEY_DETAILS: {
      const newState = { ...state };
      newState.journeyDetails = action.payload ? action.payload : null;
      return newState;
    }
    case ES_SET_ALL_JOURNEYS_DATA: {
      const newState = { ...state };
      newState.allJourneysData = action.payload ? action.payload : null;
      return newState;
    }
    case ES_SET_ALL_JOURNEYS_TASKS: {
      const newState = { ...state };
      newState.allJourneyTasks = action.payload ? action.payload : null;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default EngagementsJourneyReducer;
