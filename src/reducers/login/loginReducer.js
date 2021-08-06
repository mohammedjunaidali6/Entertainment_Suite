import { SET_JWT_DATA, SET_USER_DATA } from '../../constants/actionTypes';

const initialState = {
  userData: null,
  jwtToken: '',
};
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      const newState = { ...state };
      newState.userData = action.payload ? action.payload : null;
      return newState;
    }
    case SET_JWT_DATA: {
      const newState = { ...state };
      newState.jwtToken = action.payload ? action.payload : null;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default LoginReducer;
