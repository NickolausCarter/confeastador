import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { QUERY_RESTAURANT } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ADD_RESERVATION } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import '../assets/css/Restaurant.css';


function ViewRestaurant() {
  const [addReservation, { data_mutation }] = useMutation(ADD_RESERVATION);

  function clikedMakeReservation(){
    const restId = localStorage.getItem("restaurant-id");
    addReservation({ variables: { restaurant: restId, reservationDate: startDate.toString()} });
    window.location.assign("/reservation");
  }

  const {_id: idParam} = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const { loading, error, data } = useQuery(QUERY_RESTAURANT, {
    variables: { _id: idParam },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  localStorage.setItem("restaurant-id", data.restaurant._id);

  return (
    <div className='restaurant-info'>
      <div id="details">
        <p><span>Restaruant:</span> {data.restaurant.restaurantName}</p>
        <p><span>Cuisine:</span> {data.restaurant.cuisine}</p>
        <p><span>ZIP Code:</span> {data.restaurant.zipcode}</p>
        <p><span>Number of seats:</span> {data.restaurant.seats}</p>
        <hr></hr>
        <div className='selections'>
          <p>Select a date and time for your reservation</p>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date) } showTimeSelect dateFormat="Pp" />
          <button id="bttn-make-reservation" name="bttn-make-reservation" onClick={clikedMakeReservation}>
            Make Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewRestaurant;
