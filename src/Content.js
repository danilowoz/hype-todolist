import React from "react";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import { addTodo, toggleTodo } from "./actions";
import LinkFilter from "./link-filter";
import { GetTodo, UpdateItem, DeleteItem } from "./queries";
import AddItem from "./add-item";

const Content = ({
  data: { loading, allTodoes },
  updateItem,
  deleteItem,
  ...other
}) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {<h1>{allTodoes[0].name}</h1>}

      <AddItem currentList={allTodoes[0].id} />
      {allTodoes[0].todolists.map(item => (
        <p key={item.id}>
          <span
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
            onClick={() => updateItem(item.id, !item.completed)}
          >
            {item.text}
          </span>

          <button onClick={() => deleteItem(item.id, allTodoes[0].id)}>
            x
          </button>
        </p>
      ))}
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

const enhance = compose(graphql(GetTodo), setItem, deleteItem);

export default enhance(Content);
