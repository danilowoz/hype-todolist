import { defineAction } from "redux-define";

export const ADD_TODO = defineAction("ADD_TODO", [
  "PENDING",
  "FULFILLED",
  "REJECTED"
]);
export const TOGGLE_TODO = defineAction("TOGGLE_TODO", [
  "PENDING",
  "FULFILLED",
  "REJECTED"
]);
export const SET_FILTER = defineAction("SET_FILTER", [
  "PENDING",
  "FULFILLED",
  "REJECTED"
]);

let index = 0;

export const addTodo = payload => ({
  type: ADD_TODO.ACTION,
  payload: { text: payload.text, index: index++, completed: false }
});

export const toggleTodo = payload => ({
  type: TOGGLE_TODO.ACTION,
  payload: payload
});

export const filterTodo = payload => ({
  type: SET_FILTER.ACTION,
  payload: payload
});
