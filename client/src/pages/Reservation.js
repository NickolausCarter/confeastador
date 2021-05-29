import React from "react";

function Reservation() {
  return (
    <div>
      <textarea
        id="search-text"
        name="search-text"
        rows="1"
        cols="50"
      ></textarea>
      <button id="bttn-search" name="bttn-search">
        Search for a restaurant
      </button>
    </div>
  );
}

export default Reservation;
