// src/ImageUploader.js
import React, { useRef } from "react";

const ImageUploader = ({ onImageUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageContent = reader.result.split(",")[1];
        formData.append("imageContent", imageContent);
        onImageUpload(formData);
      };
    }
  };

  return (
    <div className="ImageUploader">
      {" "}
      {/* Use consistent case for class name */}
      <button onClick={handleClick}>upload image to generate story</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUploader;
