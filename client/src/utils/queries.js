import gql from "graphql-tag";

export const QUERY_RESTAURANTS_YELP = gql`
  query search(term: $term, limit: $limit, location: $location) {
      business {
        id
        name
        rating
        price
        categories {
          title
        }
        photos
        location {
          address1
          state
          postal_code
        }
      }
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

export const QUERY_RESTAURANTS_ARGS = gql`
  query restaurants(
    $restaurantName: String
    $cuisine: String
    $zipcode: String
    $seats: Int
  ) {
    restaurants(
      restaurantName: $restaurantName
      cuisine: $cuisine
      zipcode: $zipcode
      seats: $seats
    ) {
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
    _id
    username
    email
    reservations{
      _id
      reservationDate
      restaurant{
        _id
      	restaurantName
        cuisine 
        seats
      }
    }
  }
}
`;

export const QUERY_RESERVATION = gql`
  query reservation($_id: ID!) {
    reservation(_id: $_id) {
      _id
      restaurant {
        _id
        restaurantName
        cuisine
        zipcode
        seats
      }
      createdAt
      reservationDate
      username
    }
  }
`;