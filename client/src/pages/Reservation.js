import React from "react";
import { QUERY_RESTAURANT } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

function Reservation() {
  function clikedSearch(){
    console.log("SEARCH HAS BEEN CLICKED");
  }
  const { data } = useQuery(QUERY_RESTAURANT);
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
        {data.restaurants.map(oneRestaurant => (
          <p>
            {oneRestaurant.restaurantName} - {oneRestaurant.cuisine} - {oneRestaurant.zipcode}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Reservation;
