import gql from "graphql-tag";

export const GetTodo = gql`
  query Todo {
    allTodoes {
      id
      name
      __typename
      todolists {
        id
        text
        completed
        __typename
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
      __typename
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

export const CreateTodo = gql`
  mutation createTodo($name: String!) {
    createTodo(name: $name) {
      id
      name
      __typename
      todolists {
        id
        text
        completed
        __typename
      }
    }
  }
`;

export const DeleteTodo = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      __typename
    }
  }
`;
