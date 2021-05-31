import React from "react";
import { QUERY_RESTAURANT } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";

function DisplayRestaurants() {
    const { loading, error, data } = useQuery(QUERY_RESTAURANT);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
      return (
        <div name="restaurant">
        {data.restaurants.map((oneRestaurant) => (
          <p>
            {oneRestaurant.restaurantName} - {oneRestaurant.cuisine} -
            {oneRestaurant.zipcode}
          </p>
        ))}
      </div>
      );
}

export default DisplayRestaurants;
