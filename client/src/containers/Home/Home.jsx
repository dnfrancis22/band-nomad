import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState([]);
  const [musicians, setMusicians] = useState([]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    console.log(value)
    
  };

  const handleFormSubmit = (event) => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    searchProfiles();
    
  };

  const searchProfiles = () => {
    axios
      .get(`/api/musician/?instrument=${search}`)
      .then(function (response) {
        setMusicians(response.data);
        console.log(response.data);
        console.log(search)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let musicianRows =
    musicians.length > 0
      ? musicians.map((musician) => (
          <tr className=" bg-colorizinger">
            <td style={{ maxWidth: "25px" }}>
              <img
                src={musician.imageURL}
                style={{ width: "30%" }}
                alt={musician.name}
              />
            </td>
            <td style={{ maxWidth: "30px" }}>{musician.name}</td>
            <td style={{ maxWidth: "25px" }}>{musician.instrument}</td>
            <td style={{ maxWidth: "25px" }}>{musician.genre}</td>
            <td style={{ maxWidth: "25px" }}>{musician.location}</td>
            <td>
              {" "}
              <Link to={`/inProfile/${musician._id}`}>
                <button className="btn waves-effect waves-light">
                  view profile
                </button>
              </Link>
            </td>
          </tr>
        ))
      : "";

  return (
    <>
      <div className="container">
        <div className="Row">
          <div className="col-sm-12">
            <div className="input-field">
              {/* TODO: Convert this to a dropdown for better search results */}
              <input
                id="search"
                type="text"
                value={search}
                onChange={handleInputChange}
                required
              />
              <button onClick={handleFormSubmit} className="btn waves-effect waves-light">
                Search Profiles
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="row">
          <div className="col">
            <label>Browser Select</label>
            <select className="browser-default">
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
        </div>
      </div> */}
      <div>
        <table>
          <tr>
            <th>Profile Pic</th>
            <th>Name</th>
            <th>Instrument</th>
            <th>Genre</th>
            <th>Location</th>
          </tr>
          {musicianRows}
        </table>
      </div>
    </>
  );
};

export default Home;
