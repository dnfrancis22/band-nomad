import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          Home
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink
              to="/create"
              activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              Create
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/update"
              activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              Update
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;