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
   git clone 
   cd image-mask-drawing-app
