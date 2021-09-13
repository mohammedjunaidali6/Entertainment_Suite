import { SET_MASTER_REWARDS} from '../../../constants/actionTypes';

export function dispatchMasterRewards(data) {
  return (dispatch) => {
    dispatch({
      type: SET_MASTER_REWARDS,
      payload: data,
    });
  };
}
