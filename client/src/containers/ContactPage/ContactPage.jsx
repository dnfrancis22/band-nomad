import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";

function ConditionalH1({ id }) {
  if (id) {
    return (
      <>
        <h3>User Contact Form!</h3>
        <h6>Fill out the form and send a message!</h6>
      </>
    );
  } else {
    return (
      <>
        <h3>Contact Band Nomad!</h3>
        <h6>Fill out the form and send us message!</h6>
      </>
    );
  }
}

const ContactPage = () => {
  const [name, setName] = useState("");
  const [bandName, setBandName] = useState("");
  const [genre, setGenre] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [musician, setMusician] = useState([]);

  const { id } = useParams();
  const history = useHistory();

  console.log(id, "we found the id");

  useEffect(() => {
    getInProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const getInProfile = () => {
    axios
      .get(`/api/musician/${id}`)
      .then((response) => {
        console.log(response.data);
        setMusician(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 center-align">
          <ConditionalH1 id={id}></ConditionalH1>
          <div>
            <form
              className="col s12"
              style={{
                backgroundColor: "rgba(206, 206, 206, 0.53)",
                marginTop: "15px",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                if (id) {
                  axios
                    .post("/api/contact/user/" + id, {
                      name,
                      bandName,
                      genre,
                      email,
                      phone,
                      message,
                    })
                    .then((response) => {
                      console.log(response.data._id);
                      history.push("/ContactRedirect");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  history.push("/ContactRedirect");
                }
              }}
            >
              <div className="row">
                <div className="input-field col s12">
                  <input
                    style={{
                      borderBottom: "2px dashed hotpink",
                    }}
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="name"
                    style={{
                      color: "black",
                    }}
                  >
                    Name
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    style={{
                      borderBottom: "2px dashed hotpink",
                    }}
                    id="bandName"
                    type="text"
                    name="bandName"
                    value={bandName}
                    onChange={(e) => {
                      setBandName(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="Band Name"
                    style={{
                      color: "black",
                    }}
                  >
                    Band Name
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    style={{
                      borderBottom: "2px dashed hotpink",
                    }}
                    id="genre"
                    type="text"
                    name="genre"
                    value={genre}
                    onChange={(e) => {
                      setGenre(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="Genre"
                    style={{
                      color: "black",
                    }}
                  >
                    Genre
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    style={{
                      borderBottom: "2px dashed hotpink",
                    }}
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="email"
                    style={{
                      color: "black",
                    }}
                  >
                    Email
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    style={{
                      borderBottom: "2px dashed hotpink",
                    }}
                    id="phone"
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="Phone"
                    style={{
                      color: "black",
                    }}
                  >
                    Phone
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    style={{
                      borderBottom: "2px dashed hotpink",
                    }}
                    id="message"
                    type="text"
                    name="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="Message"
                    style={{
                      color: "black",
                    }}
                  >
                    Message
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  {/* <Link to={`/inProfile/${_id}`}>
              <button className="btn waves-effect waves-light">
                {buttonText}
              </button>
            </Link> */}
                  <button
                    className="btn waves-effect waves-light"
                    style={{ backgroundColor: "#004AAD", color: "ffff" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
