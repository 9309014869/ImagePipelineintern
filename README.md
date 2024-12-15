# Image Mask Drawing Application

A web application for uploading images, drawing masks on them, and exporting the mask image. The application also features brush controls and displays the original and mask images side-by-side.

## Features

1. **Image Upload**:
   - Users can upload JPEG/PNG images.
   - The uploaded image is displayed on a canvas.

2. **Mask Drawing**:
   - Users can draw masks on the uploaded image.
   - Masks are represented as white for the drawn areas and black for the background.

3. **Brush Controls**:
   - Users can adjust the brush size for precise mask drawing.

4. **Export Mask**:
   - Users can export the generated mask as a separate image.
   - Option to clear the canvas for new drawings.

5. **Image Display**:
   - The original and mask images are displayed side-by-side below the canvas.

## Technologies Used

### Front-End
- React.js
- Libraries:
  - `react-canvas-draw` or `Fabric.js` (for drawing functionality)
  - `tailwindcss` or `css-modules` (for styling)

### Back-End (Optional)
- **FastAPI**:
  - Endpoints for image storage and retrieval.
  - Stores images (original and mask) in a database or cloud (e.g., Cloudinary).
- **MongoDB**:
  - Stores metadata like image paths or IDs.

## Installation and Setup

### Prerequisites
- Node.js (>= 14.x)
- MongoDB or a cloud storage service for back-end storage (optional)

### Steps to Run Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/9309014869/ImagePipelineintern
   cd image-mask-drawing-app

2.**How to run the project locally frontend.**
    cd frontend 
    npm install 
    start:npm run dev
    all dependancy add 
2.**How to run the project locally backtend.**
cd backend
npm install 
npm i express,mongoose,muilter,cloudanary
3.**Frontend Libraries (React):**
React: The core library for building the user interface.
react-canvas-draw: A React component for creating canvas-based drawings.
Fabric.js: A powerful HTML5 canvas library that provides an interactive object model on top of the canvas element.
react-dropzone: A simple React component for file upload and drag-and-drop functionality.
react-router-dom: For handling routing within your React application.
redux: A state management library (if used for managing complex state, e.g., for image data or drawing tools).
axios: A promise-based HTTP client for making requests to your backend API (used to upload images or save the mask).
4 .**Backend Libraries (Node.js & Express):**
Express.js: A minimal and flexible Node.js web application framework for building the backend API.
multer: Middleware for handling multipart/form-data, used for image uploads.
fastify: An alternative to Express for building fast and low-overhead APIs (if used in place of Express).
mongoose: MongoDB object modeling for Node.js (used to interact with MongoDB databases).
cloudinary: If you're using Cloudinary for storing images in the cloud.
cors: A package for enabling Cross-Origin Request Sharing (CORS), which is necessary when the frontend and backend are on different domains/ports.
dotenv: A zero-dependency module for loading environment variables from a .env file, useful for sensitive credentials.
4.**Challenges Faced and How I Overcame Them**
Handling Image Uploads and Storage:
Challenge: One of the initial challenges was setting up an efficient image upload and storage system. Handling file uploads in a React app requires managing file inputs, proper validation for supported file types, and large file sizes.
Solution: I used the react-dropzone library for drag-and-drop file upload functionality on the frontend. On the backend, I utilized multer middleware to handle file uploads. For storage, I integrated Cloudinary to upload images to the cloud, ensuring scalability and eliminating the need to store images locally.
Canvas Drawing and Masking:

Challenge: Implementing the drawing functionality on an image using a canvas was tricky, particularly for handling dynamic brush sizes and user interactions like drawing masks in real-time.
Solution: To tackle this, I used the react-canvas-draw library, which simplifies drawing on a canvas. For the masking effect, I customized the drawing area to differentiate between the mask (white) and the background (black). This made it easier for users to draw on the image and generate the mask.
Performance Issues with Large Images:

Challenge: When dealing with large image files, rendering and drawing on the canvas became slow, leading to performance issues, especially on lower-end devices.
Solution: I optimized the image handling by resizing large images before rendering them on the canvas, using the sharp library on the backend for server-side image resizing. This helped to reduce the load time and improved the performance of the drawing tool.
Integrating Frontend and Backend:

Challenge: Integrating the React frontend with the Express backend was challenging due to CORS (Cross-Origin Resource Sharing) issues when making API calls for image uploads and retrieving processed images.
Solution: To overcome this, I used the cors middleware in the Express backend to enable cross-origin requests from the React frontend, ensuring smooth communication between the two parts of the application.
Exporting the Mask Image:

Challenge: Generating and exporting the mask as a separate image was a challenging task, particularly ensuring that the mask image had the correct resolution and was saved in a supported format.
Solution: I used the canvas.toDataURL() method in the frontend to export the mask as a PNG image. This allowed the user to download the mask and the original image easily.
Ensuring Responsive UI:

Challenge: Ensuring that the application’s UI remained responsive and user-friendly across different devices, especially mobile, where the drawing canvas could become distorted due to screen size differences.
Solution: I used CSS media queries and Tailwind CSS to design a responsive layout. The canvas and image container automatically adjusted based on the screen size, ensuring that the app was usable on both mobile and desktop.
Handling Large Number of Requests:

Challenge: As the app scales, handling a large number of simultaneous requests for uploading and retrieving images can lead to server crashes or slowdowns.
Solution: I implemented rate-limiting on the backend using the express-rate-limit package and ensured that the backend could handle multiple concurrent uploads efficiently.


