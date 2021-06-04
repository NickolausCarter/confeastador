import React from "react";
import { QUERY_RESTAURANTS_YELP } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import '../../assets/css/Search-results.css';
import { yelpClient } from "../../App";

function DisplayRestaurants() {
  const searchString = localStorage.getItem("restaurantSearchString");
  const showResultsStr = localStorage.getItem("showRestResults")
  let args = {};
  let showResults = false;
  
  if(showResultsStr == "false"){
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

  if (searchString == ""){
    args = { term: "restaurants", limit: 50 };
  }else if (is_usZipCode(searchString) == true) {
      args += { postal_code: searchString };
  } else  {
      args = { name: searchString.toLowerCase() };
  }
  const { loading, error, data } = useQuery(QUERY_RESTAURANTS_YELP, {
    variables: args,
    client:yelpClient,
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
              {data.search.business.map((oneRestaurant) => (
                    <tr key={"/viewrestaurant/"+oneRestaurant.id}>
                        <td>
                          <Link to={"/viewrestaurant/"+oneRestaurant.id}>{oneRestaurant.name.toLowerCase()}</Link>
                        </td>
                        <td>
                            {oneRestaurant.categories.title[0]}
                        </td>
                        <td>
                            {oneRestaurant.postal_code}
                        </td>
                    </tr>
              ))}
            </tbody>
          </table>):(<p></p>)}
        </div>
      );
}

export default DisplayRestaurants;
