import { ActionTypes } from '../actions';

const TimelineReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_EXPLORE:
      return action.payload;
    default:
      return state;
  }
};

export default TimelineReducer;
