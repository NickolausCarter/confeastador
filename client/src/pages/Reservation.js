import React, { useState } from 'react';

import DisplayRestaurants from "../components/DisplayRestaurants";
import DisplayReservations from "../components/DisplayReservations";
import { ADD_RESERVATION } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

function Reservation() {
  //>>> const [addReservation, { data }] = useMutation(ADD_RESERVATION);  

  const [showRest, setShowRest] = useState(0);
  function clikedSearch(){
    //>>> addReservation({ variables: { restaurant: "60b545f02de84a72918d5743", reservationDate: "07/01/2021 11:30 AM"} });
    setShowRest(true);
  }

  return (
    <div>
      <div>
        CURRENT RESERVATIONS WILL GO HERE<br />
        <DisplayReservations />
      </div>
      <textarea
        id="search-text"
        name="search-text"
        rows="1"
        cols="50"
      ></textarea>
      <button id="bttn-search" name="bttn-search" onClick={clikedSearch}>
        Search for a restaurant
      </button>
      <div>
        {showRest
          ?<DisplayRestaurants />
          : ''
        }
      </div>
    </div>
  );
}

export default Reservation;
