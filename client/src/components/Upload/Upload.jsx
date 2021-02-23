import React, { useState } from "react";
// import { Image } from "cloudinary-react";
// import axios from "axios";
// import { json } from "express";

const Upload = (props) => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [imageURL, setImageURL] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("error");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    let response = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ data: base64EncodedImage }),
      headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data=>{
        setImageURL(data.url);

    });
    //console.log(response.json());

    setFileInputState("");
    setPreviewSource("");
  };

  // const loadImages = () => {
  //   axios
  //     .get(`api/upload/secureURL`)
  //     .then((response) => {
  //       console.log(response);
  //       setImageIds(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="input-field col s12">
          {/* <label htmlFor="Image URL">Image URL</label> */}
          <h6>Upload an Image</h6>
          <form onSubmit={handleSubmitFile}>
            <input
              id="imageURL"
              type="file"
              name="imageURL"
              value={fileInputState}
              onChange={handleFileInputChange}
            />
            <button className="btn waves-effect waves-light" type="submit">
              upload
            </button>
            {/* <button
              className="btn waves-effect waves-light"
              onClick={() => {
                loadImages();
              }}
            >
              preview
            </button> */}
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "100px" }}
              />
            )}
          </form>
          <div>
            <h1 className="title">Cloudinary Gallery</h1>
            <div>
              {/* {imageIds &&
                imageIds.map((imageId, index) => (
                  <Image
                    key={index}
                    cloudName="denniscloud"
                    publicId={imageId}
                    width="300"
                    crop="scale"
                  />
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
