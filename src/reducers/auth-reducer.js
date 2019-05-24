import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  user: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, { authenticated: true, user: action.payload });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, { authenticated: false, user: {} });
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state, { authenticated: false, user: {} });
    case ActionTypes.UPDATE_USER:
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
};

export default AuthReducer;
