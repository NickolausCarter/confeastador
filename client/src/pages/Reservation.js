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
        <DisplayReservations />
      </div>
      <input id="search-text" type="text" name="search-text" />
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
