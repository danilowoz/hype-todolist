import React from "react";
import { connect } from "react-redux";
import { filterTodo } from "./actions";

const LinkFilter = ({ filter, current, children, filterTodo }) =>
  current ? (
    <span>{children}</span>
  ) : (
    <button onClick={() => filterTodo(filter)}>{children}</button>
  );

const mapStateToProps = (state, ownProps) => {
  return {
    current: ownProps.filter === state.filter
  };
};

const mapDispatchToProps = dispatch => ({
  filterTodo(data) {
    dispatch(filterTodo(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkFilter);
