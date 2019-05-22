import { ActionTypes } from '../actions';

const BannerReducer = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.BANNER_SET:
      return action.payload;
    case ActionTypes.BANNER_CLEAR:
      return null;
    default:
      return state;
  }
};

export default BannerReducer;
