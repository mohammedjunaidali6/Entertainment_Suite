import { ACTION_TYPE} from '../../constants/actionTypes';

export function dispatchData(data) {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPE,
      payload: data,
    });
  };
}
