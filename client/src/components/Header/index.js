import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import '../../assets/css/Header.css';
import logo from '../../assets/images/logo192.png';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const currEmail = localStorage.getItem("current_email");
  return (
    <header>
      <div className="container">
        <div class="wrapper">
          <Link to="/">
            <img src={logo}></img>
            <h1>con<span>FEAST</span>ador</h1>
          </Link>
        </div>

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
