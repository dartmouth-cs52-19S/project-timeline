// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import PostsReducer from './posts-reducer';
import AuthReducer from './auth-reducer';
import TimelineReducer from './timeline-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  timeline: TimelineReducer,
});

export default rootReducer;
