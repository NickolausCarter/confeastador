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
    //alert("A name was submitted: " + this.state.value);
    localStorage.setItem("restaurantSearchString", this.state.value);
    localStorage.setItem("flagShowRestaurants", true);
    //event.preventDefault();
  }

  render() {
    localStorage.setItem("flagShowRestaurants", false);
    var showResults = localStorage.getItem("flagShowRestaurants");
    return (
      <div>
      <div>
          <DisplayReservations />
      </div>
        <p>Search your Restaurant by Name or zipcode.</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Search"/>
        </form>
        <div>
          {showResults?(
            <DisplayRestaurants />
          ):(<p></p>)}
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