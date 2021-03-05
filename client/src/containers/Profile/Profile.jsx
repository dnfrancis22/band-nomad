import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.css";

const InProfile = () => {
  const [musician, setMusician] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getInProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    <div>
      <div>
        <main className="container cont">
          <div className="row">
            <div className="col">
              <img
                className="img"
                src={musician.imageURL}
                alt={musician.name}
              />
            </div>
            <div className="col s9">
              <h3 className="musicianName">{musician.name}</h3>
              <p>{musician.bio}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>
                {musician.contact}
                <span>
                  <Link to={`/contact/${musician._id}`}>
                    <button
                      className="btn waves-effect waves-light"
                      style={{ backgroundColor: "#004AAD", color: "ffff" }}
                    >
                      contact me
                    </button>
                  </Link>
                </span>
              </h4>
              <h4>{musician.phone}</h4>
              <h4>{musician.email}</h4>
              <h4>{musician.city}</h4>
              <h4>{musician.genre}</h4>
              <h4>{musician.instrument}</h4>
              {/* <Link to={`/update/${musician._id}`}>
                <button
                  className="btn waves-effect waves-light"
                  style={{ backgroundColor: "#004AAD", color: "ffff" }}
                >
                  update profile
                </button>
              </Link> */}
              {/* <Link to={"/"}>
                <button
                  className="btn waves-effect waves-light" style={{ backgroundColor: "#004AAD", color: "ffff" }}
                  onClick={() => {
                    deleteProfile(musician._id);
                  }}
                  // eslint-disable-next-line
                  style={{ backgroundColor: "#004AAD", color: "ffff" }}
                >
                  delete profile
                </button>
              </Link> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InProfile;
