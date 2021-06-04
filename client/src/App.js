import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reservation from "./pages/Reservation";
import ViewRestaurant from "./pages/ViewRestaurant";
import DeleteReservation from "./pages/DeleteReservation";
import UpdateReservation from "./pages/UpdateReservation";
import NoMatch from "./pages/NoMatch";
import { ADD_RESTAURANT } from "./utils/mutations";
import { QUERY_RESTAURANTS_YELP } from "./utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});
function startApp() {

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
  
  const [addRestaurant, { restData }] = useMutation(ADD_RESTAURANT);
  
    // update database when search results return
  const updateDatabase = data => {
      addRestaurant({
      variables: { restaurantName: data.name, alias: data.alias, cuisine: data.categories[0].title, zipcode: data.location.postal_code },
      })
  };
  const zips = ["76542", "78737", "75233", "70130", "32301", "78228"];
  for (let i = 0; i < zips.length; i++ ) {

    const args = { term: "restaurants", location: zips[i], limit: 50 };
    const { loading, error, data } = useQuery(QUERY_RESTAURANTS_YELP, {
      variables: args,
      client: yelpClient,
    });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    data.search.business.map(data => updateDatabase(data));
  }
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/reservation" component={Reservation} />
          <Route exact path="/viewrestaurant/:_id" component={ViewRestaurant} />
          <Route exact path="/deletereservation/:_id" component={DeleteReservation}/>
          <Route exact path="/updatereservation/:_id" component={UpdateReservation}/>
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}
startApp();

export default App;
