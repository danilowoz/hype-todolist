import { combineReducers } from "redux";
import todo from "./todo";
import filter from "./filter";

const Reducer = combineReducers({ todo, filter });

export default Reducer;
