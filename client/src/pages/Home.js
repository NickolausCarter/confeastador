import React from "react";

function Home() {
  return (
      <div>
        <textarea
          id="search-text"
          name="search-text"
          rows="1"
          cols="50"
        ></textarea>
        <button id="bttn-search" name="bttn-search">
          Search now!
        </button>
      </div>
    );
}

  
export default Home;
