import { GET_USERS, GET_ROLES } from '../../../constants/actionTypes';

export function get_Users(data) {
  return (dispatch) => {
    dispatch({
      type: GET_USERS,
      payload: data,
    });
  };
}

export function get_Roles(data) {
  return (dispatch) => {
    dispatch({
      type: GET_ROLES,
      payload: data,
    });
  };
}
