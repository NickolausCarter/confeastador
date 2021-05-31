import React from "react";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";

function DisplayReservations() {
    const { loading, error, data } = useQuery(QUERY_ME);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    console.log(data);
      return (
        <div name="reservations">
          <table>
            <thead key="thead">
              <tr>
                  <td>
                    Restaurant Name
                  </td>
                  <td>
                    Cuisine
                  </td>
                  <td>
                    Reservation Date and Time
                  </td>
                  <td>
                    Created On
                  </td>
              </tr>
          </thead>
          <tbody key="tbody">
            
          {/*data.reservations.map((oneReservation) => (
              <tr key={oneReservation._id}>
                  <td>
                      {oneReservation.restaurant[0].restaurantName}
                  </td>
                  <td>
                      {oneReservation.restaurant[0].cuisine}
                  </td>
                  <td>
                      {oneReservation.reservationDate}
                  </td>
                  <td>
                      {oneReservation.createdAt}
                  </td>
              </tr>
          ))*/}
          </tbody>
        </table>
      </div>
      );
}

export default DisplayReservations;