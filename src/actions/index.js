// keys for actiontypes
import axios from 'axios';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=r_yan';

export function fetchPosts() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // remember (arg) => { } is a function
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
        console.log('done fetching');
        console.log(response.data);
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        console.log('did not fetch');
        console.log(error);
        // might you also want an ERROR_CLEAR action?
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      console.log('this is post', response.data);
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    // const fields = {
    //   title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url,
    // };
    console.log('starting to post');
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
      history.push('/');
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updatePost(id, fields, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields).then((response) => {
      history.push('/');
      dispatch({ type: ActionTypes.FETCH_POST, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}


export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}
