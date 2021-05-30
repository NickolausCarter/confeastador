import React from "react";
import { QUERY_RESTAURANT } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";

function DisplayRestaurants() {
    const { loading, error, data } = useQuery(QUERY_RESTAURANT);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
      return (
        <div name="restaurant">
                      <table>
              <tr>
                  <td>
                    Restaurant Name
                  </td>
                  <td>
                    Cuisine
                  </td>
                  <td>
                    Locaiton Zipcode
                  </td>
              </tr>
        {data.restaurants.map((oneRestaurant) => (

              <tr>
                  <td>
                      {oneRestaurant.restaurantName}
                  </td>
                  <td>
                      {oneRestaurant.cuisine} 
                  </td>
                  <td>
                      {oneRestaurant.zipcode}
                  </td>
              </tr>
         
        ))}
         </table>
      </div>
      );
}

export default DisplayRestaurants;
