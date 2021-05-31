import React from "react";
import Auth from "../utils/auth";

function Home() {
  if(Auth.loggedIn()){

    window.location.assign("/reservation");
  }else{
  }
  return (
      <div>
        This is *** HOME *** (stays here if not logged in)
      </div>
    );
}

  
export default Home;
