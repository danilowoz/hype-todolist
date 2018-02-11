import React from "react";
import { graphql } from "react-apollo";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import LinkFilter from "./link-filter";
import { filterTodo } from "./actions";
import { GetTodo, UpdateItem, DeleteItem, DeleteTodo } from "./queries";
import AddItem from "./add-item";

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

const Content = ({
  list,
  updateItem,
  deleteItem,
  filter,
  removeTodo,
  style
}) => {
  const renderList = VisibilityFilter(list.todolists, filter[list.id]);

  return (
    <div style={style}>
      {
        <h1>
          <Link to={`/${list.id}`}>
            {list.name} <button onClick={() => removeTodo(list.id)}>x</button>
          </Link>
        </h1>
      }

      <AddItem currentList={list.id} />
      {renderList.map(item => (
        <p key={item.id}>
          <span
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
            onClick={() => updateItem(item.id, !item.completed)}
          >
            {item.text}
          </span>

          <button onClick={() => deleteItem(item.id, list.id)}>x</button>
        </p>
      ))}

      <br />
      <LinkFilter filter="ALL" list={list.id}>
        All
      </LinkFilter>
      <LinkFilter filter="ACTIVE" list={list.id}>
        Active
      </LinkFilter>
      <LinkFilter filter="COMPLETED" list={list.id}>
        Completed
      </LinkFilter>
    </div>
  );
};

const setItem = graphql(UpdateItem, {
  props: ({ mutate }) => ({
    updateItem: (id, completed) =>
      mutate({
        variables: { id, completed },
        optimisticResponse: {
          __typename: "Mutation",
          updateItem: {
            __typename: "Item",
            id,
            completed
          }
        }
      })
  })
});

const deleteItem = graphql(DeleteItem, {
  props: ({ mutate }) => ({
    deleteItem: (id, todoId) =>
      mutate({
        variables: { id },
        optimisticResponse: {
          __typename: "Mutation",
          deleteItem: {
            __typename: "Item",
            id
          }
        },
        update: (proxy, { data: { deleteItem } }) => {
          const data = proxy.readQuery({ query: GetTodo });
          const list = data.allTodoes.find(x => x.id === todoId).todolists;
          const listFiltered = list.filter(item => item.id !== id);

          data.allTodoes.find(x => x.id === todoId).todolists = listFiltered;

          proxy.writeQuery({ query: GetTodo, data });
        }
      })
  })
});

const removeTodo = graphql(DeleteTodo, {
  props: ({ mutate }) => ({
    removeTodo: id =>
      mutate({
        variables: { id },
        optimisticResponse: {
          __typename: "Mutation",
          removeTodo: {
            __typename: "Todo",
            id
          }
        },
        update: (proxy, { data: { removeTodo } }) => {
          const data = proxy.readQuery({ query: GetTodo });
          const listFiltered = data.allTodoes.filter(item => item.id !== id);

          data.allTodoes = listFiltered;

          proxy.writeQuery({ query: GetTodo, data });
        }
      })
  })
});

const lifeComponent = lifecycle({
  componentWillMount() {
    this.props.filterTodo({ filter: "ALL", list: this.props.list.id });
  }
});

const mapStateToProps = state => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => ({
  filterTodo(data) {
    dispatch(filterTodo(data));
  }
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  setItem,
  deleteItem,
  removeTodo,
  lifeComponent
);

export default enhance(Content);
