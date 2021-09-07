import { GET_USERS, GET_ROLES } from '../../../constants/actionTypes';

export function dispatchUsersData(data) {
  return (dispatch) => {
    dispatch({
      type: GET_USERS,
      payload: data,
    });
  };
}

export function dispatchUserRoles(data) {
  return (dispatch) => {
    dispatch({
      type: GET_ROLES,
      payload: data,
    });
  };
}
