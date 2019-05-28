import { ActionTypes } from '../actions';

const UserTimelineReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.USER_TIMELINE:
      return action.user_timeline;
    default:
      return state;
  }
};

export default UserTimelineReducer;
