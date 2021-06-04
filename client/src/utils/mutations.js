import gql from "graphql-tag";

//Mutation for log in
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//Mutation for creating a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RESERVATION = gql`
  mutation addReservation($restaurant: ID!, $reservationDate: String! ) {
    addReservation(restaurant: $restaurant , reservationDate: $reservationDate){
      restaurant{
        restaurantName,
        cuisine,
        zipcode
      },
      createdAt,
      reservationDate,
      username
    }
  }
`;



export const REMOVE_RESERVATION = gql`
  mutation removeReservation($_id: ID!) {
    removeReservation(_id: $_id) {
        _id
        createdAt
        reservationDate
        username
    }
  }
`;

export const UPDATE_RESERVATION = gql`
  mutation updateReservation ($_id: ID!, $reservationDate: String!){
    updateReservation(_id: $_id, reservationDate: $reservationDate){
      _id
      restaurant {
        _id
        restaurantName
        cuisine
        zipcode
      }
      createdAt
      reservationDate
      username
    }
  }
`;

export const ADD_RESTAURANT = gql`
  mutation addRestaurant ($restaurantName: String!, $alias: String!, $cuisine: String!, $zipcode: String!) {
    addRestaurant (restaurantName: $restaurantName, alias: $alias, cuisine: $cuisine, zipcode: $zipcode) {
      _id
      restaurantName
      alias
      cuisine
      zipcode
    }
  }
`;
