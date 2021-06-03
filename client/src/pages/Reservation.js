import React from 'react';
import '../assets/css/Reservations.css';

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
      <main>
        <DisplayReservations />
        <div className="search">
          <h2>Search</h2>
          <p>Enter a specific restaurant name or your ZIP Code</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <button type="submit">Search</button>
          </form>
          <DisplayRestaurants />
        </div>
      </main>
    );
  }
}

export default Reservation;