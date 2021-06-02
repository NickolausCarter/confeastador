import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import '../assets/css/Login.css';

import Auth from "../utils/auth";

const Login = (props) => {
  localStorage.setItem("showRestResults", "false");
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    localStorage.setItem("current_email",formState.email);
    
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main>
      <div className="login-container">
        <h4>Login</h4>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <input
              className="form-input"
              placeholder="Your email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="form-input"
              placeholder="******"
              name="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button className="btn d-block w-100" type="submit">
              Submit
            </button>
          </form>

          {error && <div>Login failed</div>}
        </div>
      </div>
    </main>
  );
};

export default Login;
