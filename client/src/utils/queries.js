import gql from "graphql-tag";

export const QUERY_RESTAURANT = gql`
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

