const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
require("dotenv").config();

const app = express();
app.use(cors()); // Enable CORS

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static("public"));

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    // Check if req.file is defined
    if (!req.file) {
      console.error("Error: No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Access the buffer directly for base64 encoding
    const content = req.file.buffer.toString("base64");

    console.log("Request to Google Vision API:", {
      method: "POST",
      url: "https://vision.googleapis.com/v1/images:annotate",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers...
      },
      data: {
        requests: [
          {
            image: {
              content: content,
            },
            features: [
              {
                type: "LABEL_DETECTION",
              },
            ],
          },
        ],
      },
    });

    // Call Google Vision API here using your API key
    const googleVisionResponse = await axios.post(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        process.env.GOOGLE_VISION_API_KEY,
      {
        requests: [
          {
            image: {
              content: content,
            },
            features: [
              {
                type: "LABEL_DETECTION",
              },
            ],
          },
        ],
      }
    );

    // Extract labels from the Google Vision API response
    const labels = googleVisionResponse.data.responses[0].labelAnnotations.map(
      (label) => label.description
    );

    // Console log for labels from Google Vision API
    console.log("Labels from Google Vision API:", labels);

    // Call GPT-3.5 Turbo API here using your OpenAI API key
    const gptResponse = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: `Generate a short 130-word story based on: ${labels.join(
          ", "
        )}`,
        max_tokens: 200,
        model: "gpt-3.5-turbo-instruct", // Adjust the model if needed
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        },
      }
    );

    // Extract the generated story from the GPT-3.5 Turbo API response
    const generatedStory = gptResponse.data.choices[0].text;

    // Console log for GPT API response
    console.log("GPT API Response:", gptResponse.data);

    res.json({ labels, generatedStory });
  } catch (error) {
    console.error("Error processing image:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Google Vision API error response:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from Google Vision API");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(
        "Error setting up the request to Google Vision API:",
        error.message
      );
    }

    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
