import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import '../../assets/css/Header.css';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const currEmail = localStorage.getItem("current_email");
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>conFEASTador</h1>
        </Link>

        <nav>
          {Auth.loggedIn() ? (
            <>
              <span>Welcome: {currEmail}</span>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
