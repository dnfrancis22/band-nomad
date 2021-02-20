import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import logoBand100 from "../../assets/images/nomadLogo100.jpg";
import M from "materialize-css/dist/js/materialize.min.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const [cookies, setCookie] = useCookies(["username"]);
  useEffect(() => {
    //initialize materialize
    M.AutoInit();
  });
  function LoggedIn() {
    const [cookies, setCookie] = useCookies(["username"]);
    const history = useHistory();
    function handleClick(e) {
      e.preventDefault();
      axios
        .get("api/logout")
        .then(function (response) {
          console.log(typeof response.status);
          if (response.status === 200) {
            console.log("here");
            setCookie("username", "");
            history.push("/");
          }
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log(cookies);
    if (cookies.username === "") {
      return (
        <NavLink
          to="/login"
          activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        >
          Login
        </NavLink>
      );
    } else {
      return (
        <a
          onClick={handleClick}
          activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        >
          Logout
        </a>
      );
    }
  }
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="container-fluid" id="navContainer">
          <Link to="/" className="brand-logo center blue-text text-darken-2">
            <img
              id="navImage"
              src={logoBand100}
              className="image-fluid"
              alt="band nomad logo"
            />
          </Link>
          <Link to="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </Link>

          <ul id="link-align" className="right hide-on-med-and-down">
            <li>
              <NavLink
                to="/"
                activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <LoggedIn></LoggedIn>
            </li>
            <li>
              <NavLink
                to="/update"
                activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              >
                My Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <NavLink to="/" activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Contact"
            activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <LoggedIn></LoggedIn>
        </li>
        <li>
          <NavLink
            to="/Update"
            activeStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          >
            My Account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
