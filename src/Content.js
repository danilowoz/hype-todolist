import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import "./App.css";
import { addTodo, toggleTodo } from "./actions";
import LinkFilter from "./link-filter";

const Content = ({
  data: { loading, allTodoes, UpdateItem },
  updateItem,
  ...other
}) => {
  console.log(other);
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

const query = graphql(gql`
  query Todo {
    allTodoes {
      id
      name
      todolists {
        id
        text
        completed
        updatedAt
      }
    }
  }
`);

const UpdateItem = graphql(
  gql`
    mutation UpdateItem($id: ID!, $completed: Boolean) {
      updateItem(id: $id, completed: $completed) {
        completed
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateItem: (id, completed) =>
        mutate({
          variables: { id, completed }
        })
    }),
    options: {
      refetchQueries: ["Todo"]
    }
  }
);
const enhance = compose(query, UpdateItem);

export default enhance(Content);
