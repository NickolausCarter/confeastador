import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { QUERY_RESTAURANT } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

function ViewRestaurant() {

  const {_id: idParam} = useParams();
  console.log(idParam);
  const { loading, error, data } = useQuery(QUERY_RESTAURANT, {
    variables: { _id: idParam },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <div>
      {data.restaurant.restaurantName},
      {data.restaurant.cuisine},
      {data.restaurant.zipcode},
      {data.restaurant.seats},
    </div>
  );
    
}

export default ViewRestaurant;
