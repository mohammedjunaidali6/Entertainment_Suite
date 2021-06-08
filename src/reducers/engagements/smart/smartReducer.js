import { E_S_SET_GOALS, SET_ENGAGEMENTS } from '../../../constants/actionTypes';

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
    default: {
      return state;
    }
  }
};
export default EngagementsSmartReducer;
