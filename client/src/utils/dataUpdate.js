import ApolloClient from "apollo-boost";
import { ADD_RESTAURANT } from "./utils/mutations";
import { QUERY_RESTAURANTS_YELP } from "./utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

export function dataUpdate(query) {

  const yelpClient = new ApolloClient({
    request: (operation) => {
      const apiKey = process.env.REACT_APP_YELP_API_KEY;
  
      operation.setContext({
        headers: {
          authorization: apiKey ? `Bearer ${apiKey}` : "",
          'accept-language': 'en_US',
        },
      });
    },
    uri: 'https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/graphql',
  });
  
  const [addRestaurant] = useMutation(ADD_RESTAURANT);
  
    // update database when search results return
  const updateDatabase = data => {
      addRestaurant({
      variables: { restaurantName: data.name, alias: data.alias, cuisine: data.categories[0].title, zipcode: data.location.postal_code, seats: 20 },
      })
  };
  const args = { term: "restaurants", location: query, limit: 50 };
  const { loading, error, data } = useQuery(QUERY_RESTAURANTS_YELP, {
    variables: args,
    client: yelpClient,
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  data.search.business.map(data => updateDatabase(data));
};