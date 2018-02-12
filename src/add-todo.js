import React from "react";
import { graphql } from "react-apollo";
import { compose, withState } from "recompose";
import { CreateTodo, GetTodo } from "./queries";

const AddTodo = ({ createTodo, currentList, value, setValue }) => {
  const handle = e => {
    if (value && value.length) {
      createTodo(value);

      setValue("");
    }

    e.preventDefault();

    return false;
  };

  return (
    <form onSubmit={handle}>
      <br />
      <br />
      <br />
      <hr />
      <br />
      <input
        placeholder="add todo"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <button onClick={handle}>+</button>
    </form>
  );
};

const state = withState("value", "setValue", "");

const create = graphql(CreateTodo, {
  props: ({ mutate }) => ({
    createTodo: (name, id) =>
      mutate({
        variables: { name },
        optimisticResponse: {
          __typename: "Mutation",
          createTodo: {
            __typename: "Todo",
            name,
            id: "",
            todolists: []
          }
        },
        update: (proxy, { data: { createTodo } }) => {
          const data = proxy.readQuery({ query: GetTodo });
          data.allTodoes.push(createTodo);

          proxy.writeQuery({ query: GetTodo, data });
        }
      })
  })
});

const enhance = compose(create, state);

export default enhance(AddTodo);
