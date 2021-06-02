import React, { useState } from 'react';

import DisplayRestaurants from "../components/DisplayRestaurants";
import DisplayReservations from "../components/DisplayReservations";

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  handleChange(event) {
    this.setState({ value: event.target.value });
    
  }

  handleSubmit(event) {

    localStorage.setItem("restaurantSearchString", this.state.value);
    localStorage.setItem("showRestResults", "true");
    //event.preventDefault();
  }

  render() {
    return (
      <div>
      <div>
          <DisplayReservations />
      </div>
        <p>Search your Restaurant by Name or zipcode.</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter a name or zip code to filter the search of restaurants.
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input id="search-btn" type="submit" value="Search"/>
          <label for="search-btn">Click to conduct search.</label>
        </form>
        <div>
            <DisplayRestaurants />
        </div>
      </div>
    );
  }
}

export default Reservation;


/*

function Reservation() {

  const [showRest, setShowRest] = useState(0);
  function clikedSearch(){
    //localStorage.setItem("restaurantSearchString",)
    console.log(">>>>>>THIS");
    console.log(this);
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
*/