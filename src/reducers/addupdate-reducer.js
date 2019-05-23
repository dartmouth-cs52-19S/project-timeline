import { ActionTypes } from '../actions';

const AddUpdateReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.ON_ADDUPDATE:
      return action.addupdate;
    default:
      return state;
  }
};

export default AddUpdateReducer;
