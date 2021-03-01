import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Form from "../../components/Form/Form";
import { useCookies } from "react-cookie";

const CreateProfile = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["username"]);

  const handleFormSubmit = (e, musicianData) => {
    e.preventDefault();
    axios
      .post("/api/musician", musicianData)
      .then((response) => {
        setCookie("username", response.data.username);
        history.push(`/inProfile/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 center-align">
          <h1>create your profile.</h1>
          <Form
            handleFormSubmit={handleFormSubmit}
            buttonText="Create Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
