import React, { useState } from 'react';

import DisplayRestaurants from "../components/DisplayRestaurants";
import DisplayReservations from "../components/DisplayReservations";

function Reservation() {

  const [showRest, setShowRest] = useState(0);
  function clikedSearch(){
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
