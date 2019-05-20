// keys for actiontypes
import axios from 'axios';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_EXPLORE: 'FETCH_EXPLORE',
  SELECT_TIMELINE: 'SELECT_TIMELINE',
  SELECT_TIMELINE_DETAIL: 'SELECT_TIMELINE_DETAIL',
};

// SERVER URLS
// Regina's API url
// const ROOT_URL = 'https://lab5-regina-yan-1.herokuapp.com/api';
// local testing api url
const ROOT_URL = 'http://localhost:9090/api';
// Abhi's Database
// const ROOT_URL = 'https://cs52-abhi-blog.herokuapp.com/';
// Tim's blog API
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=r_yan';

const token = localStorage.getItem('token');
if (token) {
  console.log(`token  ${token}`);
}

export function fetchTimeline() {
  return (dispatch) => {
    // server call
    console.log('making server call');
    axios.get('https://timimeline.herokuapp.com/api/explore')
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
      });
  };
}

export const selectTimeline = timeline => ({
  type: ActionTypes.SELECT_TIMELINE,
  selected: timeline,
});

export function fetchTimelineDetail(id) {
  return (dispatch) => {
    axios.get('https://timimeline.herokuapp.com/api/explore')
      .then((response) => {
        // console.log('from action, post: ', response.data);
        dispatch({ type: ActionTypes.SELECT_TIMELINE_DETAIL, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
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

// add a post
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
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      console.log('Sign in failed.');
      console.log(error);
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

// sign up -> set auth state again
export function signupUser({ username, email, password }, history) {
  return (dispatch) => {
    const user = { username, email, password };
    // console.log('in signup user');
    axios.post(`${ROOT_URL}/signup`, user).then((response) => {
      // console.log('lab4 axios post');
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      console.log('Sign up failed.');
      console.log('error data', error.response.data);
      console.log('full error: ', error);
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// Sign out -> deletes token from localstorage and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
