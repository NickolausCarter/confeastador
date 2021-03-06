import React from "react";
import { QUERY_RESTAURANTS_ARGS } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import '../../assets/css/Search-results.css';

function DisplayRestaurants() {
  const searchString = localStorage.getItem("restaurantSearchString");
  const showResultsStr = localStorage.getItem("showRestResults")
  let args = {};
  let showResults = false;
  
  if(showResultsStr === "false"){
    showResults = false;
  }else{
    showResults = true;
  }
  
  function is_usZipCode(str) {
    const regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  if (searchString === ""){
    args = {};
  }else if (is_usZipCode(searchString) === true) {
      args = { zipcode: searchString };
  } else  {
      args = { restaurantName: searchString };
  }
  const { loading, error, data } = useQuery(QUERY_RESTAURANTS_ARGS, {
    variables: args,
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

      return (
        <div className="restaurant">
          <hr></hr>
          {showResults ? (
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
                  ZIP Code
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
          </table>):(<p></p>)}
        </div>
      );
}

export default DisplayRestaurants;
