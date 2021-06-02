import React from "react";
import Auth from "../utils/auth";
import '../assets/css/Home.css';

function Home() {
  if(Auth.loggedIn()){

    window.location.assign("/reservation");
  }else{
  }
  return (
      <div className='homepage'>
        <h1 className="content">Find a<br></br>restaurant for<br></br>any occasion.</h1>
      </div>
    );
}

export default Home;
