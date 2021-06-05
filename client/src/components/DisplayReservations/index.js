import React from "react";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import '../../assets/css/Reservations.css';

function DisplayReservations() {
    const { loading, error, data } = useQuery(QUERY_ME);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    let haveReservations = true;
    if((data == null)||(data.me == null)||(data.me.reservations == null)||(data.me.reservations.length === 0)){
      haveReservations = false;
    }

      return (
        <div className="reservations">
          <h2>Existing Reservations</h2>
          {haveReservations ? (
            <table>
              <thead key="thead">
                <tr>
                  <td>Restaurant</td>
                  <td>Cuisine</td>
                  <td>Date / Time</td>
                  <td>Action</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody key="tbody">
                {data.me.reservations.map((oneReservation) => (
                  <tr key={"__" + oneReservation._id}>
                    <td>{oneReservation.restaurant[0].restaurantName}</td>
                    <td>{oneReservation.restaurant[0].cuisine}</td>
                    <td>
                      {new Date(
                        oneReservation.reservationDate
                      ).toLocaleDateString()}&nbsp;
                      {new Date(
                        oneReservation.reservationDate
                      ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>
                      <Link to={"/deletereservation/" + oneReservation._id}>
                        Delete
                      </Link>
                    </td>
                    <td>
                      <Link to={"/updatereservation/" + oneReservation._id}>
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No existing reservations</p>
          )}
        </div>
      );
}

export default DisplayReservations;
