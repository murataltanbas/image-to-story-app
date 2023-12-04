// src/App.js
import React, { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import "./App.css";

const App = () => {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = async (formData) => {
    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setWords(data.generatedStory.split(" "));
      setIndex(0);

      setUploadedImage(URL.createObjectURL(formData.get("image")));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const typewriterTimeoutRef = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex < words.length) {
          return prevIndex + 1;
        } else {
          clearInterval(typewriterTimeoutRef);
          return prevIndex;
        }
      });
    }, 100); // Adjust the interval (milliseconds) as needed

    return () => {
      clearInterval(typewriterTimeoutRef); // Cleanup interval on component unmount
    };
  }, [words]);

  const displayedStory = words.slice(0, index).join(" ");

  return (
    <div className="App">
      <ImageUploader onImageUpload={handleImageUpload} />
      <div className="image-container">
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
        )}
      </div>
      <div className="story-container">
        <p>{displayedStory}</p>
      </div>
    </div>
  );
};

export default App;
