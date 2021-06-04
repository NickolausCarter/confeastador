import React from "react";
import { QUERY_RESTAURANTS_YELP } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import '../../assets/css/Search-results.css';
import { yelpClient } from "../../App";
import { ADD_RESTAURANT } from "../../utils/mutations"

function DisplayRestaurants() {
  const searchString = localStorage.getItem("restaurantSearchString");
  const showResultsStr = localStorage.getItem("showRestResults")
  let args = {};
  let showResults = false;
  
  const [addRestaurant, { restData }] = useMutation(ADD_RESTAURANT);

  // update database when search results return
  const updateDatabase = data => {
      addRestaurant({
      variables: { restaurantName: data.name, alias: data.alias, cuisine: data.categories[0].title, zipcode: data.location.postal_code },
      })
  };

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

  if (searchString === "" || searchString === null){
    args = { term: "restaurants", location: "70130", limit: 50 };
  }else if (is_usZipCode(searchString) == true) {
      args = { term: "restaurants", location: searchString, limit: 50 };
  } else  {
      args = { term: searchString };
  }
  const { loading, error, data } = useQuery(QUERY_RESTAURANTS_YELP, {
    variables: args,
    client: yelpClient,
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  data.search.business.map(data => updateDatabase(data));

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
                    <tr key={"/viewrestaurant/"+oneRestaurant.alias}>
                        <td>
                          <Link to={"/viewrestaurant/"+oneRestaurant.alias}>{oneRestaurant.name}</Link>
                        </td>
                        <td>
                            {oneRestaurant.categories[0].title}
                        </td>
                        <td>
                            {oneRestaurant.location.postal_code}
                        </td>
                    </tr>
              ))}
            </tbody>
          </table>):(<p></p>)}
        </div>
      );
}

export default DisplayRestaurants;
