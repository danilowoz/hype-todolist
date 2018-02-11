import { combineReducers } from "redux";
import todo from "./todo";
import filter from "./filter";

const Reducer = combineReducers({ filter });

export default Reducer;
