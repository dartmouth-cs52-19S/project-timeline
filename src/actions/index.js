// keys for actiontypes
import axios from 'axios';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  GET_USER: 'GET_USER',
  ERR_USER: 'ERR_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  CHECK_NAME: 'CHECK_NAME',
  ERROR_CHECK: 'ERROR_CHECK',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_EXPLORE: 'FETCH_EXPLORE',
  FETCH_META: 'FETCH_META',
  SELECT_TIMELINE: 'SELECT_TIMELINE',
  CREATE_TIMELINE: 'CREATE_TIMELINE',
  USER_TIMELINE: 'USER_TIMELINE',
  SELECT_TIMELINE_DETAIL: 'SELECT_TIMELINE_DETAIL',
  ON_ADDUPDATE: 'ON_ADDUPDATE',
  DO_NOTHING: 'DO_NOTHING',
  BANNER_SET: 'BANNER_SET',
  BANNER_CLEAR: 'BANNER_CLEAR',
  UPDATE_USER: 'UPDATE_USER',
};

// SERVER URLS

// local testing api url
// const ROOT_URL = 'http://localhost:9090/api';

// timeline api url
const ROOT_URL = 'https://timimeline.herokuapp.com/api';

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
    // console.log('making server call');
    axios.get(`${ROOT_URL}/explore`)
      .then((response) => {
        // dispatch action w/ payload
        dispatch({ type: ActionTypes.FETCH_EXPLORE, payload: response.data });
      })
      .catch((error) => {
        // TODO: dispatch an error, make reducer, show error component
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function fetchMeta() {
  return (dispatch) => {
    // server call
    axios.get(`${ROOT_URL}/timeline/5ce5bf1be5057b0034c8a87c`)
      .then((response) => {
        // dispatch action w/ payload
        dispatch({ type: ActionTypes.FETCH_META, meta: response.data });
      })
      .catch((error) => {
        // TODO: dispatch an error, make reducer, show error component
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
        dispatch({ type: ActionTypes.SELECT_TIMELINE, selected: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function userTimeline(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/timeline/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.USER_TIMELINE, user_timeline: response.data });
      })
      .catch((error) => {
        // dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
        console.log(error);
      });
  };
}

// export function saveToTimeline(timelineID) {
//   return (dispatch) => {
//     axios.post(`${ROOT_URL}/personal`, timelineID)
//       .then((response) => {
//         console.log('from action, create timeline response: ', response.data);
//         dispatch({ type: ActionTypes.BANNER_SET, payload: 'You successfully added a post!' });
//       })
//       .catch((error) => {
//         dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
//       });
//   };
// }

export function createTimeline(fields, addNextUnder) {
  return (dispatch) => {
    console.log('Fields in action creator: ', fields);
    axios.post(`${ROOT_URL}/timeline`, fields,
      { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        console.log('from action, create timeline response: ', response.data);
        console.log('ADDNEXTUNDER: ', addNextUnder);
        if (addNextUnder) {
          dispatch({ type: ActionTypes.SELECT_TIMELINE, selected: response.data });
          dispatch(
            { type: ActionTypes.BANNER_SET, payload: 'You successfully added timeline content!' },
          );
        } else {
          dispatch(selectTimeline(response.data.parent));
          dispatch(
            { type: ActionTypes.BANNER_SET, payload: 'You successfully added timeline content!' },
          );
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
    axios.post(`${ROOT_URL}/timeline/${fields.id.toString()}`, fields,
      { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        // console.log('from action, update timeline response: ', response.data);
        // console.log('ADDNEXTUNDER: ', addNextUnder);
        // can't use response to set because it is not populated with
        // the titles and times of its events
        dispatch(selectTimeline(response.data._id));
        // console.log('dispatching banner_set');
        dispatch(
          { type: ActionTypes.BANNER_SET, payload: 'You successfully added timeline content!' },
        );
        if (history) {
          console.log('THIS IS THE RESPONSE IN UPDATE_TIMELINE');
          console.log(response.data);
          history.push('/');
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function deleteTimeline(timeline, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/timeline/${timeline._id}`,
      { headers: { authorization: localStorage.getItem('token') } })
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
        dispatch({ type: ActionTypes.SELECT_TIMELINE_DETAIL, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.BANNER_SET, payload: error.message });
      });
  };
}

export function onAddUpdate(i) {
  return {
    type: ActionTypes.ON_ADDUPDATE,
    addupdate: i,
  };
}

// Get user info
export function fetchUserInfo() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/personal${API_KEY}`,
      { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        console.log('IN FETCHUSER INFO', response.data);
        dispatch({ type: ActionTypes.GET_USER, payload: response.data });
      }).catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERR_USER, error });
      });
  };
}

export function checkUsername(username) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/username`, username)
      .then((response) => {
        dispatch({ type: ActionTypes.CHECK_NAME, payload: response.data });
      }).catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_CHECK, error });
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
      dispatch({
        type: ActionTypes.AUTH_USER,
        payload: { email, password, timeline: response.data.timeline },
      });
      localStorage.setItem('token', response.data.token);
      history.push('/explore/start');
    }).catch((error) => {
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
    axios.post(`${ROOT_URL}/signup`, user).then((response) => {
      // console.log('lab4 axios post');
      dispatch({
        type: ActionTypes.AUTH_USER,
        payload: {
          username, email, password, startTime, timeline: response.data.timeline,
        },
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
      // only takes strings, so converts startTime to a string
      // need to redesign to localState
      // const
      localStorage.setItem('startTime', response.data.startTime);
      history.push('/explore/start');
    }).catch((error) => {
      console.log('error data', error.message);
      console.log('full error: ', error);
      dispatch(authError(`Sign Up Failed: ${error.message}`));
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
// then POST to user/link with the timeline id
// user's timeline will be found based on the auth
export function saveTimeline(timelineID) {
  return (dispatch) => {
    // console.log('TIMELINE ID', timelineID);
    axios.post(`${ROOT_URL}/personal`,
      { childID: timelineID },
      { headers: { authorization: localStorage.getItem('token') } })
      .then((resp) => {
        // console.log(resp.data);
        dispatch(createBanner('Timeline saved!'));
        setTimeout(() => {
          dispatch(clearBanner());
        }, 2500);
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(createBanner('failed to link'));
      });
  };
}

// remove a timeline from a user's timeline
// sends timelineID to be removed
// finds user's timeline with auth
export function unsaveTimeline(timelineID) {
  return (dispatch) => {
    console.log('REMOVE from saved TIMELINE ID', timelineID);
    // axios.delete(`${ROOT_URL}/personal`,
    //   { childID: timelineID },
    //   { headers: { authorization: localStorage.getItem('token') } })
    // alt axios call from: https://github.com/axios/axios/issues/509
    axios({
      url: `${ROOT_URL}/personal`,
      method: 'delete',
      data: { childID: timelineID },
      headers: { authorization: localStorage.getItem('token') },
    })
      .then((resp) => {
        dispatch(createBanner('Timeline removed from saved!'));
        setTimeout(() => {
          dispatch(clearBanner());
        }, 2500);
        console.log('response from remove', resp.data);
        dispatch({ type: ActionTypes.USER_TIMELINE, user_timeline: resp.data });
      })
      .catch((err) => {
        console.log('ERROR from UNSAVE timeline: ', err.response);
        dispatch(createBanner('failed to remove from saved'));
      });
  };
}

// ask backend to send me user
export function updateUser(fields, history) {
  return (dispatch) => {
    // console.log('getting user fields', fields);
    axios.put(`${ROOT_URL}/personal`, fields,
      { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_USER, payload: response });
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('password', response.data.password);
      localStorage.setItem('startTime', response.data.startTime);
      history.push('/explore/start');
    }).catch((error) => {
      dispatch(authError(`Update settings failed: ${error.message}`));
      console.log(error);
      dispatch({ type: ActionTypes.BANNER_SET, payload: 'Updating user settings failed.' });
    });
  };
}
