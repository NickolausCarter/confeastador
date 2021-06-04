import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { QUERY_RESERVATION } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UPDATE_RESERVATION } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import "../assets/css/Restaurant.css";

function UpdateReservation() {
  const [updateReservation, { data_mutation }] =
    useMutation(UPDATE_RESERVATION);

  function clickedUpdateReservation() {
    const reservId = idParam;
    updateReservation({
      variables: { _id: reservId, reservationDate: startDate.toString() },
    });
    window.location.assign("/reservation");
  }

  const { _id: idParam } = useParams();
  const [startDate, setStartDate] = useState(new Date()); 
  const { loading, error, data } = useQuery(QUERY_RESERVATION, {
    variables: { _id: idParam },
  });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

  return (
    <div className="restaurant-info">
      <div className="details">
        <p>
          <span>Restaurant:</span>{" "}
          {data.reservation.restaurant[0].restaurantName}
        </p>
        <p>
          <span>Cuisine:</span> {data.reservation.restaurant[0].cuisine}
        </p>
        <p>
          <span>ZIP Code:</span> {data.reservation.restaurant[0].zipcode}
        </p>
        <p>
          <span>Current:</span> {new Date(data.reservation.reservationDate).toLocaleDateString()}
          &nbsp;
          {new Date(data.reservation.reservationDate).toLocaleTimeString()}
        </p>
        <hr></hr>
        <div className="selections">
          <p>Select new date and time for your reservation</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
          <button
            id="bttn-make-reservation"
            name="bttn-make-reservation"
            onClick={clickedUpdateReservation}
          >
            Update Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateReservation;
