import {
  SET_ENGAGEMENTS,
  E_S_SET_GOALS,
  E_S_TARGET_AUDIENCE,
  SET_JOURNEY_BOX,
  SET_REWARDS, SET_BUDGET, SET_BUDGET_DURATION
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
    case SET_JOURNEY_BOX: {
      const newState = { ...state };
      newState.journeyBox = action.payload ? action.payload : null;
      return newState;
    }
    case SET_REWARDS: {
      const newState = { ...state };
      newState.rewardsData = action.payload ? action.payload : null;
      return newState;
    }
    case SET_BUDGET: {
      const newState = { ...state };
      newState.budget = action.payload ? action.payload : null;
      return newState;
    }
    case SET_BUDGET_DURATION: {
      const newState = { ...state };
      newState.budgetDuration = action.payload ? action.payload : null;
      return newState;
    }
    case E_S_TARGET_AUDIENCE: {
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
