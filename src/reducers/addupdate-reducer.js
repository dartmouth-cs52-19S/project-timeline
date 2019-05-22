import { ActionTypes } from '../actions';

const AddUpdateReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.ON_ADDUPDATE:
      console.log(`action.addupdate${action.addupdate}`);
      return action.addupdate;
    default:
      return state;
  }
};

export default AddUpdateReducer;
