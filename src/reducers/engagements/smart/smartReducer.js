import {
  SET_ENGAGEMENTS,
  E_S_SET_GOALS,
  E_S_SET_TARGET_AUDIENCE,
  E_S_SET_JOURNEY_BOX,
  E_S_SET_REWARDS_AND_BUDGET
} from '../../../constants/actionTypes';

const initialState = {
  campaignsData: null,
  setGoals: null,
  targetAudience: null,
  defineJourney: null,
  rewardsAndBudget: null,
  review: null,
};
const EngagementsSmartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENGAGEMENTS: {
      const newState = { ...state };
      newState.campaignsData = action.payload ? action.payload : null;
      return newState;
    }
    case E_S_SET_GOALS: {
      const newState = { ...state };
      newState.setGoals = action.payload ? action.payload : null;
      return newState;
    }
    case E_S_SET_JOURNEY_BOX: {
      const newState = { ...state };
      newState.journeyBox = action.payload ? action.payload : null;
      return newState;
    }
    case E_S_SET_REWARDS_AND_BUDGET: {
      const newState = { ...state };
      newState.rewardsAndBudget = action.payload ? action.payload : null;
      return newState;
    }
    case E_S_SET_TARGET_AUDIENCE: {
      const newState = { ...state };
      newState.targetAudience = action.payload ? action.payload : null;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default EngagementsSmartReducer;
