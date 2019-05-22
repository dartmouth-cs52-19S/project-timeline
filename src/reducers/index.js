// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import TimelineReducer from './timeline-reducer';
import SelectReducer from './select-reducer';
import UserReducer from './user-reducer';
import AddUpdateReducer from './addupdate-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  timeline: TimelineReducer,
  selected: SelectReducer,
  user: UserReducer,
  addupdate: AddUpdateReducer,
});

export default rootReducer;
