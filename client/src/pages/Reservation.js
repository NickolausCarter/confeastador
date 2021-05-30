import React, { useState } from 'react';

import DisplayRestaurants from "../components/DisplayRestaurants";

function Reservation() {
  const [showRest, setShowRest] = useState(0);
  function clikedSearch(){
    console.log("SEARCH HAS BEEN CLICKED");
    setShowRest(true);
  }
  
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
      <div>
        {showRest
          ?<DisplayRestaurants />
          : 'nothing to see'
        }
      </div>
    </div>
  );
}

export default Reservation;
