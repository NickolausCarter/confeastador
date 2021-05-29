import React from "react";

function Reservation() {
  function clikedSearch(){
    console.log("SEARCH HAS BEEN CLICKED");
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
    </div>
  );
}

export default Reservation;
