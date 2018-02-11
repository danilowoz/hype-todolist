import { SET_FILTER } from "../actions";

const initialState = {};

const filter = (state = initialState, action) => {
  if (action.type === SET_FILTER.ACTION) {
    const id = action.payload.list;
    const filter = action.payload.filter;
    const newState = { [id]: filter };

    return { ...state, ...newState };
  }

  return state;
};

export default filter;
