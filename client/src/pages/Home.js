import React from "react";

function Nav() {
  function showSearch() {
    //if (Auth.loggedIn()) {
    return (
      <div>
        <textarea
          id="search-text"
          name="search-text"
          rows="1"
          cols="50"
        ></textarea>
        <button id="bttn-search" name="bttn-search">
          Search now!
        </button>
      </div>
    );
    /*} else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }*/
  }

  return (
    <header className="flex-row px-1">
      <nav>{showSearch()}</nav>
    </header>
  );
}

export default Nav;
