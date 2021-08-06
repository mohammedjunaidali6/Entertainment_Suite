import { SET_JWT_DATA, SET_USER_DATA } from '../../constants/actionTypes';

export function dispatchUserData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      payload: data,
    });
  };
}

export function dispatchJwtTokenData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_JWT_DATA,
      payload: data,
    });
  };
}
