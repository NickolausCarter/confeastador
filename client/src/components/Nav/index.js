import React from "react";

function Nav() {
  return (
    <header>
      <h2>
        <a href="/">conFEASTador</a>
      </h2>
      <nav>
        <ul className="flex-row">
          <li className="mx-2">
            <a href="#signup">Signup</a>
          </li>
          <li className="mx-2">
            <a href="#login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
