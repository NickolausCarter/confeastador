import React from "react";
import { QUERY_RESTAURANT } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

function Reservation() {
  
  function clikedSearch(){
    console.log("SEARCH HAS BEEN CLICKED");
  }
  
  
  const { loading, error, data } = useQuery(QUERY_RESTAURANT);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
 
  return (
    <div>
      <textarea
        id="search-text"
        name="search-text"
        rows="1"
        cols="50"
      ></textarea>
      <button id="bttn-search" name="bttn-search" onClick={clikedSearch}>
        Search for a restaurant
      </button>

      <div name="restaurant">
        {data.restaurants.map((oneRestaurant) => (
          <p>
            {oneRestaurant.restaurantName} - {oneRestaurant.cuisine} -
            {oneRestaurant.zipcode}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Reservation;
