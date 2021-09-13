import { SET_MASTER_REWARDS } from '../../../constants/actionTypes';

const initialState = {
  masterRewards:[]
};
const ManageRewardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MASTER_REWARDS: {
      const newState = { ...state };
      newState.masterRewards = action.payload ? action.payload : null;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default ManageRewardsReducer;
