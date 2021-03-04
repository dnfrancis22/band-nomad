import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Home/Home.css";
const Home = () => {
  const [instrument, setInstrument] = useState("");
  const [genre, setGenre] = useState("");
  const [city, setCity] = useState("");
  const [musicians, setMusicians] = useState([]);
  const handleFormSubmit = (event) => {
    // When the form is submitted, prevent its default behavior,
    event.preventDefault();
    searchProfiles();
  };
  const searchProfiles = () => {
    let baseURL = "/api/musician/?";
    if (instrument) {
      baseURL = baseURL + `instrument=${instrument}&`;
    }
    if (genre) {
      baseURL = baseURL + `genre=${genre}&`;
    }
    if (city) {
      baseURL = baseURL + `city=${city}&`;
    }

    console.log(baseURL);
    axios
      .get(baseURL)
      .then(function (response) {
        setMusicians(response.data);
        console.log(response.data);
        console.log(instrument);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  let musicianRows =
    musicians.length > 0
      ? musicians.map((musician) => (
          <tr className="bg-colorizinger" key={musician._id}>
            <td style={{ maxWidth: "50px" }}>
              <img
                src={musician.imageURL}
                style={{ width: "30%" }}
                alt={musician.name}
              />
            </td>
            <td style={{ maxWidth: "50px" }}>{musician.name}</td>
            <td style={{ maxWidth: "50px" }}>{musician.instrument}</td>
            <td style={{ maxWidth: "50px" }}>{musician.genre}</td>
            <td style={{ maxWidth: "50px" }}>{musician.city}</td>
            <td>
              {" "}
              <Link to={`/Profile/${musician._id}`}>
                <button
                  className="btn waves-effect"
                  style={{ backgroundColor: "#004AAD", color: "ffff" }}
                >
                  view profile
                </button>
              </Link>
            </td>
          </tr>
        ))
      : "";
  return (
    <>
      <div className="container" style={{ marginTop: 20 }}>
        <div className="Row">
          <div className="col s12">
            <div className="Row">
              <div className="col s12">
                <ul id="uHome">
                  <h1
                    style={{
                      textAlign: "center",
                      fontSize: "54px",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                    }}
                  >
                    Getting Started
                  </h1>
                  <li id="startList" style={{ listStyleType: "disc" }}>
                    Start a band
                  </li>
                  <li id="startList" style={{ listStyleType: "disc" }}>
                    Add a new band member
                  </li>
                  <li id="startList" style={{ listStyleType: "disc" }}>
                    Connect with local musicians
                  </li>
                </ul>
              </div>
            </div>
            <div className="row" style={{ marginBottom: 0 }}>
              <div className="input-field col s12">
                <select
                  id="instrument"
                  value={instrument}
                  onChange={(e) => {
                    setInstrument(e.target.value);
                  }}
                  className="browser-default"
                >
                  <option value="">Musician Instrument</option>
                  <option value="bass">Bass Player</option>
                  <option value="guitar">Guitar Player</option>
                  <option value="drums">Drummer</option>
                  <option value="singer">Lead Singer</option>
                </select>
              </div>
            </div>
            <div className="row" style={{ marginBottom: 0 }}>
              <div className="input-field col s12">
                <select
                  placeholder="Genre"
                  id="genre"
                  name="genre"
                  value={genre}
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                  className="browser-default"
                >
                  <option value="">Musician Genre</option>
                  <option value="blues">Rhythm and Blues</option>
                  <option value="country">Country Music</option>
                  <option value="jazz">Jazz Music</option>
                  <option value="pop">Pop Music</option>
                  <option value="rock">Rock Music</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <select
                  placeholder="City"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  className="browser-default"
                >
                  <option value="">City</option>
                  <option value="Atlanta">Atlanta</option>
                  <option value="Midtown">Midtown</option>
                  <option value="Buckhead">Buckhead</option>
                  <option value="Decatur">Decatur</option>
                  <option value="Alpharetta">Alpharetta</option>
                  <option value="Marrietta">Marrietta</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleFormSubmit}
              type="submit"
              className="btn waves-effect"
              style={{ backgroundColor: "#004AAD", color: "ffff" }}
            >
              Search Profiles
            </button>
            <button
              onClick={() => {
                setCity("");
                setGenre("");
                setInstrument("");

              }}
              type="submit"
              className="btn waves-effect"
              style={{ backgroundColor: "#004AAD", color: "ffff" }}
            >
              Reset
            </button>

            <div
              className="container"
              style={{
                width: "100%",
                marginTop: "10px",
                backgroundColor: "#ffff",
                opacity: "0.90",
              }}
            >
              <div className="row">
                <div
                  className="background col s12"
                  style={{ fontSize: "18px" }}
                >
                  <table className="responsive-table">
                    <thead>
                      <tr>
                        <th>Profile Image</th>
                        <th>Name</th>
                        <th>Instrument</th>
                        <th>Genre</th>
                        <th>City</th>
                      </tr>
                    </thead>
                    <tbody>{musicianRows}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
