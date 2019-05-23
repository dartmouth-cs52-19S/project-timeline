import { ActionTypes } from '../actions';

const MetaReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_META:
      return action.meta;
    default:
      return state;
  }
};

export default MetaReducer;