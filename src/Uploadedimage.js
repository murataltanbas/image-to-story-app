// src/UploadedImage.js
import React from "react";

const UploadedImage = ({ imageContent }) => {
  return (
    <div>
      <h2>Uploaded Image:</h2>
      <img
        src={`data:image/jpeg;base64,${imageContent}`}
        alt="Uploaded"
        width="400"
        style={{ display: "block", margin: "0 auto" }}
      />
    </div>
  );
};

export default UploadedImage;
