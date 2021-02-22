import { } from '../../constants/actionTypes';

const initialState = {
  
};
const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SAMPLE_TYPE: {
    //   const newState = { ...state };
    //   newState.gameDetail = action.payload ? action.payload: null;
    //   return newState;
    // }
    default: {
      return state;
    }
  }
};
export default DashboardReducer;
