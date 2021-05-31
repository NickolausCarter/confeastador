import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { QUERY_RESTAURANT } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


function ViewRestaurant() {

  function clikedMakeReservation(){
    console.log("ADD CODE TO MAKE RESERVATION AND REDIRECT TO USER HOME");
  }

  const [startDate, setStartDate] = useState(new Date());
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
