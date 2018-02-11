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
        updatedAt
      }
    }
  }
`;

export const UpdateItem = gql`
  mutation updateItem($id: ID!, $completed: Boolean) {
    updateItem(id: $id, completed: $completed) {
      id
      __typename
      completed
    }
  }
`;
