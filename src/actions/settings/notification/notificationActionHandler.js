import { SET_ROLES_WITH_PERMISSION_COUNT, SET_PERMISSIONS } from '../../../constants/actionTypes';

export function setRolesWithPermissionCount(data) {
  return (dispatch) => {
    dispatch({
      type: SET_ROLES_WITH_PERMISSION_COUNT,
      payload: data,
    });
  };
}
export function setPermissions(data) {
  return (dispatch) => {
    dispatch({
      type: SET_PERMISSIONS,
      payload: data,
    });
  };
}

