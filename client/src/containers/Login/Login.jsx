import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

function LogIn() {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["username"]);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(cookies["username"]);

  const handleFormSubmit = (e, musicianLogin) => {
    e.preventDefault();
    console.log(email, password);
    axios
      .post("/api/login", { email, password })
      .then((response) => {
        console.log(response.data);
        setCookie("username", response.data.username);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="login col s6">
        {/* <img
          style={{ height: "auto" }}
          id="navImage"
          src={logoBand100}
          alt="band nomad logo"
        /> */}
        <h3 className="loginTitle">Login to Band Nomad</h3>
        <form onSubmit={handleFormSubmit}>
          <label for="Email">Email</label>
          <input
            name="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <label for="Password">Password</label>
          <input
            name="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button className="submitButton btn waves-effect waves-light">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
function SignUp() {
  return (
    <div className="signup col s6">
      {/* <div style={{ marginTop: "100px" }}> */}
      <h3 className="hello">Hello Friend!</h3>
      <h5>Sign-up for Band Nomad </h5>
      <div style={{ textAlign: "center" }}>
        <h6>Start a band</h6>
        <h6>Add a new band member</h6>
        <h6>Connect with local musicians</h6>
      </div>
      <Link to="create/">
        <button className="signUpButton btn waves-effect waves-light">
          Sign-Up!
        </button>
      </Link>
    </div>
    // </div>
  );
}

const Login = () => {
  return (
    <div className="login-container row">
      <LogIn></LogIn>
      <SignUp></SignUp>
    </div>
  );
};

export default Login;