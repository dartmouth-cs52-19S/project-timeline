// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import TimelineReducer from './timeline-reducer';
import SelectReducer from './select-reducer';
import BannerReducer from './banner-reducer';
import AddUpdateReducer from './addupdate-reducer';
import MetaReducer from './meta-reducer';
import UserTimelineReducer from './user-timeline-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  timeline: TimelineReducer,
  selected: SelectReducer,
  message: BannerReducer,
  addupdate: AddUpdateReducer,
  meta: MetaReducer,
  user_timeline: UserTimelineReducer,
});

export default rootReducer;
