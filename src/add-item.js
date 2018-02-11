import React, { Fragment } from "react";
import { graphql } from "react-apollo";
import { compose, withState } from "recompose";
import { CreateItem, GetTodo } from "./queries";

const AddItem = ({ createItem, currentList, value, setValue }) => {
  const handle = () => {
    if (value && value.length) {
      createItem({
        text: value,
        completed: false,
        todoId: currentList
      });

      setValue("");
    }

    return false;
  };

  return (
    <Fragment>
      <input
        placeholder="add item"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <button onClick={handle}>+</button>
    </Fragment>
  );
};

const state = withState("value", "setValue", "");

const create = graphql(CreateItem, {
  props: ({ mutate }) => ({
    createItem: ({ text, completed, todoId }) =>
      mutate({
        variables: { text, completed, todoId },
        optimisticResponse: {
          __typename: "Mutation",
          createItem: {
            __typename: "allTodoes",
            text,
            id: todoId,
            completed,
            updatedAt: new Date()
          }
        },
        update: (proxy, { data: { createItem } }) => {
          const data = proxy.readQuery({ query: GetTodo });
          data.allTodoes.find(x => x.id === todoId).todolists.push(createItem);

          proxy.writeQuery({ query: GetTodo, data });
        }
      })
  })
});

const enhance = compose(create, state);

export default enhance(AddItem);
