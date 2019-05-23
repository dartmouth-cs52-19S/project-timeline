import { ActionTypes } from '../actions';


const UserReducer = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default UserReducer;
