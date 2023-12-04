# README

## Image-to-Story Generator

In this simple web app, both Google Vision API and OpenAI's GPT-3.5 Turbo model are utilized. The initial step involves analyzing the content of uploaded images using Google Vision API to extract labels, which subsequently serve as prompts for story generation using the GPT-3.5 Turbo model.

## Video Demo

https://github.com/murataltanbas/image-to-story-app/assets/53222730/35cfea7f-8507-48bd-ba95-211634e38936

## Instructions

### Setting Up API Keys

1. **Obtain a Google Vision API Key:**

   - Visit the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Enable the "Cloud Vision API" for your project.
   - Create API credentials and copy the API key.
   - Add the API key to the `.env` file under `GOOGLE_VISION_API_KEY`.

2. **Obtain an OpenAI API Key:**
   - Visit the [OpenAI API](https://beta.openai.com/signup/) to get access to the GPT-3.5 Turbo model.
   - Copy the API key.
   - Add the API key to the `.env` file under `OPENAI_API_KEY`.

### Running the Application

1. **Start the Server:**

   ```bash
   node server.js
   ```

2. **Start the React App:**
   Open a new terminal and run:

   ```bash
   npm start
   ```

3. **Access the App:**

   - Open your browser and navigate to `http://localhost:3000`.
   - You should see the Image-to-Story Generator UI.

4. **Upload an Image:**

   - Click the "upload image to generate story" button.
   - Select an image from your local machine.

5. **View the Generated Story:**
   - Once the image is uploaded, the app will display the uploaded image.
   - A typewriter effect will reveal the generated story based on the image content.

### Notes

- The application uses Node.js for the server and React for the front end.
- The server runs on `http://localhost:3001`, and the React app runs on `http://localhost:3000`.
