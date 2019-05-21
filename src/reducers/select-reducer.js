import { ActionTypes } from '../actions';

const SelectReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_TIMELINE:
      return action.selected;
    default:
      return state;
  }
};

export default SelectReducer;
