import { E_S_SET_GOALS } from '../../../constants/actionTypes';

const initialState = {
    setGoals: null,
    targetAudience: null,
    defineJourney: null,
    rewardsAndBudget: null,
    review: null,
};
const EngagementsSmartReducer = (state = initialState, action) => {
  switch (action.type) {
    case E_S_SET_GOALS: {
      const newState = { ...state };
      newState.setGoals = action.payload ? action.payload: null;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default EngagementsSmartReducer;
