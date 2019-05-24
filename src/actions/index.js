// keys for actiontypes
import axios from 'axios';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  GET_USER: 'GET_USER',
  ERR_USER: 'ERR_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_EXPLORE: 'FETCH_EXPLORE',
  FETCH_META: 'FETCH_META',
  SELECT_TIMELINE: 'SELECT_TIMELINE',
  CREATE_TIMELINE: 'CREATE_TIMELINE',
  SELECT_TIMELINE_DETAIL: 'SELECT_TIMELINE_DETAIL',
  ON_ADDUPDATE: 'ON_ADDUPDATE',
  DO_NOTHING: 'DO_NOTHING',
  BANNER_SET: 'BANNER_SET',
  BANNER_CLEAR: 'BANNER_CLEAR',
  UPDATE_USER: 'UPDATE_USER',
};

// SERVER URLS
// Regina's API url
// const ROOT_URL = 'https://lab5-regina-yan-1.herokuapp.com/api';

// local testing api url
const ROOT_URL = 'http://localhost:9090/api';

// timeline api url
// const ROOT_URL = 'https://timimeline.herokuapp.com/api';

const API_KEY = '';

const token = localStorage.getItem('token');
if (token) {
  console.log(`token  ${token}`);
}

// this one works though
export function clearBanner() {
  return ({ type: ActionTypes.BANNER_CLEAR });
}
// NOT sure this is working...
export function createBanner(message) {
  return ({ type: ActionTypes.BANNER_SET, payload: message });
}


export function fetchTimeline() {
  return (dispatch) => {
    // server call
    console.log('making server call');
    axios.get(`${ROOT_URL}/explore`)
      .then((response) => {
        // dispatch action w/ payload
        dispatch({ type: ActionTypes.FETCH_EXPLORE, payload: response.data });
        console.log('done fetching');
        console.log(response.data);
      })
      .catch((error) => {
        // TODO: dispatch an error, make reducer, show error component
        console.log('did not fetch');
        console.log(error);
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function fetchMeta() {
  return (dispatch) => {
    // server call
    console.log('making server call');
    axios.get(`${ROOT_URL}/timeline/5ce5bf1be5057b0034c8a87c`)
      .then((response) => {
        // dispatch action w/ payload
        dispatch({ type: ActionTypes.FETCH_META, meta: response.data });
        console.log('done fetching meta');
        console.log(response.data);
      })
      .catch((error) => {
        // TODO: dispatch an error, make reducer, show error component
        console.log('did not fetch');
        console.log(error);
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

// export const selectTimeline = timeline => ({
//   type: ActionTypes.SELECT_TIMELINE,
//   selected: timeline,
// });

export function selectTimeline(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/timeline/${id}`)
      .then((response) => {
        // console.log('from action, post: ', response.data);
        dispatch({ type: ActionTypes.SELECT_TIMELINE, selected: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function saveToTimeline(timelineID) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/personal`, timelineID)
      .then((response) => {
        console.log('from action, create timeline response: ', response.data);
        dispatch({ type: ActionTypes.BANNER_SET, payload: 'You successfully added a post!' });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function createTimeline(fields, addNextUnder) {
  return (dispatch) => {
    console.log('Fields in action creator: ', fields);
    axios.post(`${ROOT_URL}/timeline`, fields)
      .then((response) => {
        console.log('from action, create timeline response: ', response.data);
        console.log('ADDNEXTUNDER: ', addNextUnder);
        if (addNextUnder) {
          dispatch({ type: ActionTypes.SELECT_TIMELINE, selected: response.data });
          console.log('Calling create banner');
          dispatch({ type: ActionTypes.BANNER_SET, payload: 'You successfully added a post!' });
        } else {
          dispatch(selectTimeline(response.data.parent));
          dispatch({ type: ActionTypes.BANNER_SET, payload: 'You successfully added a post!' });
        }
        // history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function updateTimeline(fields, addNextUnder, history) {
  return (dispatch) => {
    console.log('Fields in action creator: ', fields);
    console.log('field.id: ', fields.id);
    axios.post(`${ROOT_URL}/timeline/${fields.id.toString()}`, fields)
      .then((response) => {
        console.log('from action, update timeline response: ', response.data);
        console.log('ADDNEXTUNDER: ', addNextUnder);
        // can't use response to set because it is not populated with
        // the titles and times of its events
        dispatch(selectTimeline(response.data._id));
        console.log('dispatching banner_set');
        dispatch({ type: ActionTypes.BANNER_SET, payload: 'You successfully added a post!' });
        if (history) {
          history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function deleteTimeline(timeline, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/timeline/${timeline._id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.BANNER_SET, payload: response.data });
        dispatch(selectTimeline(timeline.parent));
      });
  };
}

export function fetchTimelineDetail(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/timeline/${id}`)
      .then((response) => {
        // console.log('from action, post: ', response.data);
        dispatch({ type: ActionTypes.SELECT_TIMELINE_DETAIL, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function onAddUpdate(i) {
  console.log('in onAddUpdate action');
  return {
    type: ActionTypes.ON_ADDUPDATE,
    addupdate: i,
  };
}

// Get all of the post previews
export function fetchPosts() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // remember (arg) => { } is a function
  return (dispatch) => {
    // server call
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        // dispatch action w/ payload
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
        // console.log('done fetching');
        // console.log(response.data);
      })
      .catch((error) => {
        // TODO: dispatch an error, make reducer, show error component
        console.log('did not fetch');
        console.log(error);
      });
  };
}

// Get single, full post
export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      // console.log('this is post', response.data);
    }).catch((error) => {
      console.log(error);
    });
  };
}

// Get user info
export function fetchUserInfo() {
  return (dispatch) => {
    console.log('IN FETCH');
    axios.get(`${ROOT_URL}/personal${API_KEY}`,
      { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        console.log('SUCCESS IN FETCH, bout to dispatch');
        dispatch({ type: ActionTypes.GET_USER, payload: response.data });
      }).catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERR_USER, error });
      });
  };
}

// USELESS DELETE LATER
// TODO: Check against server for sending post v. destructured
export function createPost(post, history) {
  return (dispatch) => {
    const fields = {
      title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url,
    };
    axios.post(`${ROOT_URL}/posts`, fields,
      { headers: { authorization: localStorage.getItem('token') } })
      .then(() => {
        history.push('/');
      }).catch((error) => {
        console.log(error);
      });
  };
}

// USELESS DELETE LATER
// send updated post info to replace old
export function updatePost(id, fields, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields,
      { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
        dispatch({ type: ActionTypes.FETCH_POST, payload: response });
      }).catch((error) => {
        console.log(error);
      });
  };
}

// USELESS DELETE LATER
// Delete post + push to home
export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`,
      { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      }).catch((error) => {
        console.log(error);
      });
  };
}

// trigger to deauth if there is error
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// sign in -> set authorization state
export function signinUser({ email, password }, history) {
  const user = { email, password };
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, user).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: user });
      localStorage.setItem('token', response.data.token);
      history.push('/explore/start');
    }).catch((error) => {
      console.log('Sign in failed.');
      console.log(error);
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
      dispatch({ type: ActionTypes.BANNER_SET, payload: 'Sign in failed.' });
    });
  };
}

// sign up -> set auth state again
export function signupUser({
  username, email, password, startTime,
}, history) {
  return (dispatch) => {
    const user = {
      username, email, password, startTime,
    };
    // console.log('in signup user');
    axios.post(`${ROOT_URL}/signup`, user).then((response) => {
      // console.log('lab4 axios post');
      dispatch({ type: ActionTypes.AUTH_USER, payload: user });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
      history.push('/explore/start');
    }).catch((error) => {
      console.log('Sign up failed.');
      console.log('error data', error.response.data);
      console.log('full error: ', error);
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      dispatch({ type: ActionTypes.BANNER_SET, payload: 'Sign up failed.' });
    });
  };
}

// Sign out -> deletes token from localstorage and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER, payload: {} });
    history.push('/');
  };
}

// save a timeline to a user's profile timeline
// get the user's user object from server
// then POST to user/link with the two timeline id's
export function saveTimeline(timelineID) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/personal`).then((user) => {
      axios.post(`${ROOT_URL}/user/link`, { parentID: user.timeline, childID: timelineID })
        .then((resp) => {
          dispatch(createBanner(resp));
        })
        .catch(err => dispatch(createBanner(err.message)));
    })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

// ask backend to send me user
// and do a check to see if username taken (for sign up too)
export function updateUser(fields, history) {
  return (dispatch) => {
    console.log('getting user fields', fields);
    axios.post(`${ROOT_URL}/personal`, fields).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_USER, payload: response });
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
      history.push('/explore/start');
    }).catch((error) => {
      dispatch(authError(`Update settings failed: ${error.response.data}`));
      dispatch({ type: ActionTypes.BANNER_SET, payload: 'Updating user settings failed.' });
    });
  };
}
