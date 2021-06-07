import { GET_ROLES, GET_USERS } from '../../../constants/actionTypes';
import user from '../../../assets/img/user.svg';

const initialState = {
  users: [],
  roles: []
};
const TeamReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS: {
      if (payload && payload.length) {
        const newState = { ...state };
        let usersArr = [];
        payload?.forEach(obj => {
          let userObj = {};
          userObj.user_id = obj.user_id;
          userObj.userName = obj.user_name;
          userObj.firstName = obj.first_name;
          userObj.lastName = obj.last_name;
          userObj.middleName = obj.middle_name;
          userObj.imgSrc = user;
          userObj.email = obj.email;
          userObj.mobileNumber = obj.mobile_number;
          userObj.role = obj.groups[0]?.name;
          userObj.status = obj.is_enabled ? 'Active' : 'Inactive';
          usersArr.push(userObj);
        });
        newState.users = usersArr ?? null;
        return newState;
      } else {
        return state;
      }
    }
    case GET_ROLES: {
      if (payload && payload.length) {
        const newState = { ...state };
        newState.roles = payload
        return newState
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};
export default TeamReducer;
