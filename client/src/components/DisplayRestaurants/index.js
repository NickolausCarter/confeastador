import React from "react";
import { QUERY_RESTAURANTS } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

function DisplayRestaurants() {
    const { loading, error, data } = useQuery(QUERY_RESTAURANTS);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
      return (
        <div name="restaurant">
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
                    Locaiton Zipcode
                  </td>
              </tr>
          </thead>
          <tbody key="tbody">
        {data.restaurants.map((oneRestaurant) => (
              <tr key={"/viewrestaurant/"+oneRestaurant._id}>
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
        ))}
          </tbody>
        </table>
      </div>
      );
}

export default DisplayRestaurants;
