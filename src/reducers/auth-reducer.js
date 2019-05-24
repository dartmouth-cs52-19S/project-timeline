import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  user: {},
  chkUsername: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true, user: action.payload };
      // return Object.assign({}, state, { authenticated: true, user: action.payload });
    case ActionTypes.DEAUTH_USER:
      return { ...state };
      // return Object.assign({}, state, { authenticated: false, user: {} });
    case ActionTypes.AUTH_ERROR:
      return { ...state };
      // return Object.assign({}, state, { authenticated: false, user: {} });
    case ActionTypes.CHECK_NAME:
      return { ...state, chkUsername: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
