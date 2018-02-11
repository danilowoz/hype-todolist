import gql from "graphql-tag";

export const GetTodo = gql`
  query Todo {
    allTodoes {
      id
      name
      todolists {
        id
        text
        completed
      }
    }
  }
`;

export const CreateItem = gql`
  mutation createItem($text: String!, $todoId: ID!, $completed: Boolean!) {
    createItem(text: $text, completed: $completed, todoId: $todoId) {
      id
      text
      completed
    }
  }
`;

export const UpdateItem = gql`
  mutation updateItem($id: ID!, $completed: Boolean) {
    updateItem(id: $id, completed: $completed) {
      id
      completed
      __typename
    }
  }
`;

export const DeleteItem = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
      __typename
    }
  }
`;
