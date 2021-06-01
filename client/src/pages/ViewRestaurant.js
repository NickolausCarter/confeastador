import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { QUERY_RESTAURANT } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ADD_RESERVATION } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";


function ViewRestaurant() {
  const [addReservation, { data2 }] = useMutation(ADD_RESERVATION);  

  function clikedMakeReservation(){
    const restId = localStorage.getItem("restaurant-id");
    const restCuisine = localStorage.getItem("restaurant-cuisine");
    addReservation({ variables: { restaurant: restId, reservationDate: startDate.toString()} });
    window.location.assign("/reservation");
  }

  const {_id: idParam} = useParams();
  const { loading, error, data } = useQuery(QUERY_RESTAURANT, {
    variables: { _id: idParam },
  });
  const [startDate, setStartDate] = useState(new Date());
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  localStorage.setItem("restaurant-id", data.restaurant._id);
  localStorage.setItem("restaurant-cuisine", data.restaurant.cuisine);

  console.log(data);
  return (
    <div>
      <div id="restaurant-info">
        {data.restaurant.restaurantName},
        {data.restaurant.cuisine},
        {data.restaurant.zipcode},
        {data.restaurant.seats}
      </div>
      <div>
        <br />
        Select a date and time for your reservation <br />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date) } showTimeSelect dateFormat="Pp" /><br />
        <button id="bttn-make-reservation" name="bttn-make-reservation" onClick={clikedMakeReservation}>
        Make Reservation
      </button>
      </div>
    </div>
  );
    
}

export default ViewRestaurant;
