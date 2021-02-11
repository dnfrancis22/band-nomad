import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Form from "../../components/Form/Form";

const CreateProfile = () => {
  const history = useHistory();

  const handleFormSubmit = (e, musicianData) => {
    e.preventDefault();
    axios
      .post("/api/musician", musicianData)
      .then((response) => {
        console.log(response.data);
        history.push("/results");
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
          <Form handleFormSubmit={handleFormSubmit} buttonText="Create Profile"/>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
