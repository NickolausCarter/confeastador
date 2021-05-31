import gql from "graphql-tag";

export const QUERY_RESTAURANTS = gql`
  query restaurants{
    restaurants{
      _id,
      restaurantName,
      cuisine,
      zipcode,
      seats
    }
  }
`;

export const QUERY_RESTAURANT = gql`
  query restaurant($_id:ID!) {
    restaurant(_id:$_id) {
      _id
      restaurantName
      cuisine
      zipcode
      seats
    }
  }
`;