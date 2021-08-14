import { GET_ROLES, GET_USERS } from '../../../constants/actionTypes';

const initialState = {
  users: [],
  roles: []
};
const TeamReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS: {
      const newState = { ...state };
      newState.users = payload || null;
      return newState;
    }
    case GET_ROLES: {
      const newState = { ...state };
      newState.roles = payload
      return newState
    }
    default: {
      return state;
    }
  }
};
export default TeamReducer;
