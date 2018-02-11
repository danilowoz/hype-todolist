import React, { Component } from "react";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { addTodo, toggleTodo } from "./actions";
import LinkFilter from "./link-filter";

const VisibilityFilter = (todo, filter) => {
  switch (filter) {
    case "ACTIVE":
      return todo.filter(item => !item.completed);

    case "COMPLETED":
      return todo.filter(item => item.completed);

    case "ALL":
    default:
      return todo;
  }
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  addItem = () => {
    if (this.input.value.trim().length === 0) {
      return false;
    }
    this.props.addTodo({ text: this.input.value });
    this.input.value = "";
  };

  render() {
    return (
      <div className="App">
        <input ref={node => (this.input = node)} />
        <button onClick={this.addItem}>Add</button>

        {this.props.todo.map(item => (
          <p
            onClick={() => this.props.toggleTodo(item.index)}
            key={item.index}
            style={{ textDecoration: item.completed ? "line-through" : "" }}
          >
            {item.text}
          </p>
        ))}

        <br />
        <LinkFilter filter="ALL">All</LinkFilter>
        <LinkFilter filter="ACTIVE">Active</LinkFilter>
        <LinkFilter filter="COMPLETED">Completed</LinkFilter>
      </div>
    );
  }
}

App.defaultProps = {
  todo: []
};

const mapStateToProps = state => {
  return {
    todo: VisibilityFilter(state.todo, state.filter)
  };
};

const mapDispatchToProps = dispatch => ({
  addTodo(data) {
    dispatch(addTodo(data));
  },
  toggleTodo(data) {
    dispatch(toggleTodo(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
