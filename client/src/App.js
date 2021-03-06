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

export default App;
