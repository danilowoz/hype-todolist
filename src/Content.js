import React from "react";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import { addTodo, toggleTodo } from "./actions";
import LinkFilter from "./link-filter";
import { GetTodo, UpdateItem } from "./queries";

const Content = ({ data: { loading, allTodoes }, updateItem, ...other }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {<h1>{allTodoes[0].name}</h1>}

      {allTodoes[0].todolists.map(item => (
        <p onClick={() => updateItem(item.id, !item.completed)} key={item.id}>
          <span
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
          >
            {item.text}
          </span>
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
            __typename: "allTodoes",
            id,
            completed
          }
        }
      })
  }),
  options: {
    refetchQueries: ["Todo"]
  }
});
const enhance = compose(graphql(GetTodo), setItem);

export default enhance(Content);
