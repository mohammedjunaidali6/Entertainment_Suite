import { SET_ROLES_WITH_PERMISSION_COUNT, SET_PERMISSIONS } from '../../../constants/actionTypes';

const initialState = {
  roleData: [],
  permissions: []
};
const NotificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ROLES_WITH_PERMISSION_COUNT: {
      const newState = { ...state };
      newState.roleData = payload ?? null;
      return newState;
    }
    case SET_PERMISSIONS: {
      const newState = { ...state };
      newState.permissions = payload ?? null;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default NotificationReducer;
