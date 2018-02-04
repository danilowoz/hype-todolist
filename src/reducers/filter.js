import { SET_FILTER } from "../actions";

const initialState = "ALL";

const filter = (state = initialState, action) => {
  if (action.type === SET_FILTER.ACTION) {
    return action.payload;
  }

  return state;
};

export default filter;
