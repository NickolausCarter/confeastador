import React from "react";
import { QUERY_RESTAURANT } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

function DisplayRestaurants() {
    const { loading, error, data } = useQuery(QUERY_RESTAURANT);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
      return (
        <div name="restaurant">
          <table>
            <thead>
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
          </thead>
        {data.restaurants.map((oneRestaurant) => (
          <tbody>
              <tr>
                  <td>
                    <Link to={"/viewrestaurant/"+oneRestaurant._id}>{oneRestaurant.restaurantName}</Link>
                  </td>
                  <td>
                      {oneRestaurant.cuisine} 
                  </td>
                  <td>
                      {oneRestaurant.zipcode}
                  </td>
              </tr>
          </tbody>
         
        ))}
         </table>
      </div>
      );
}

export default DisplayRestaurants;
