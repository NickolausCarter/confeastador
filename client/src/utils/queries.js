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

export const QUERY_RESERVATIONS = gql`
query reservations($username:String) {
  reservations(username:$username) {
    _id,
    restaurant{
      _id,
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

export const QUERY_ME = gql`
query me {
  me{
    _id,
    email,
    username,
    reservations{
      restaurant{
        _id,
      	restaurantName,
        cuisine,
        zipcode
      },
      createdAt,
      reservationDate
    }
  }
}
`;