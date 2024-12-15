import axios from "axios";
import React, { useRef, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function EditPhoto() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [brushRadius, setBrushRadius] = useState(10);
  const [brushColor, setBrushColor] = useState("white");
  const canvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const token = sessionStorage.getItem('token');
  // if (!token) {
  //   toast.error("Authorization token missing. Please log in.");
  //   return;
  // }
  // const handleChange = async(event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
      
  //     const formData = new FormData();
  //     formData.append('posts', file);
  //     try {
  //       const response = await axios.post("http://localhost:3000/api/v1/user/create",formData,{
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }});
  //         toast.success('User data fetched successfully!', {
  //           position: 'top-right',
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           style: {
  //             backgroundColor: '#4CAF50', // Green for success
  //             color: '#FFFFFF',          // White text
  //           },
  //         });
  //     } catch (error) {
  //       toast.error('Failed to fetch user data!', {
  //                     position: 'top-right',
  //                     autoClose: 3000,
  //                     hideProgressBar: false,
  //                     closeOnClick: true,
  //                     pauseOnHover: true,
  //                     draggable: true,
  //                     style: {
  //                       backgroundColor: '#FF5252', // Red for error
  //                       color: '#FFFFFF',          // White text
  //                     },
  //         });
  //     }
        
  //   }
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const initializeCanvas = () => {
    if (!uploadedImage) {
      alert("Please upload an image first!");
      return;
    }

    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;

    if (!canvas || !maskCanvas) return;

    const ctx = canvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");

    const img = new Image();
    img.src = uploadedImage;

    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      maskCanvas.width = img.width;
      maskCanvas.height = img.height;

      // Draw the uploaded image on the main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Initialize the mask canvas as transparent
      maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
    };

    img.onerror = () => {
      alert("Failed to load the image. Please try a different image.");
    };
  };

  const handleDrawing = (event) => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;

    if (!canvas || !maskCanvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Draw on the main canvas
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fillStyle = brushColor;
    ctx.fill();

    // Draw on the mask canvas
    const maskCtx = maskCanvas.getContext("2d");
    maskCtx.beginPath();
    maskCtx.arc(x, y, brushRadius, 0, Math.PI * 2);
    maskCtx.fillStyle = "white"; // Mask is drawn in white
    maskCtx.fill();
  };

  const handleBrushRadiusChange = (event) => {
    setBrushRadius(Number(event.target.value));
  };

  const handleBrushColorChange = (event) => {
    setBrushColor(event.target.value);
  };

  const handleMaskExport1 = () => {
    const maskCanvas = maskCanvasRef.current;

    if (!maskCanvas) {
      alert("No mask available to export!");
      return;
    }

    const dataURL = maskCanvas.toDataURL("image/png");

    // Create a temporary anchor element to download the mask
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "mask.png";
    a.click();
    
    
  };

  const handleMaskExport = async () => {
    const maskCanvas = maskCanvasRef.current;
  
    if (!maskCanvas) {
      alert("No mask available to export!");
      return;
    }
  
    const dataURL = maskCanvas.toDataURL("image/png");
  
    // Convert the dataURL to a Blob
    const response = await fetch(dataURL);
    const blob = await response.blob();
  
    const formData = new FormData();
    formData.append("posts", blob, "mask.png"); // Attach the Blob with a filename
  
    try {
      const uploadResponse = await axios.post(
        "http://localhost:3000/api/v1/user/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success("Mask uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
        },
      });
      
    } catch (error) {
      toast.error("Failed to upload mask!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#FF5252",
          color: "#FFFFFF",
        },
      });
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;

    if (!canvas || !maskCanvas) return;

    const ctx = canvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");

    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clear the mask canvas
    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-4">Photo Editor</h1>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageUpload}
        className="mb-6 text-black"
        capture="environment"
        name='media'
      />
      <button
        onClick={initializeCanvas}
        className="mb-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Load Image
      </button>
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-600 z-10"
          onMouseDown={(e) => e.buttons === 1 && handleDrawing(e)}
          onMouseMove={(e) => e.buttons === 1 && handleDrawing(e)}
        ></canvas>
        <canvas
          ref={maskCanvasRef}
          className="absolute top-0 left-0 z-20 pointer-events-none"
          style={{ display: "none" }} // Hide mask canvas from view
        ></canvas>
      </div>
      <div className="flex items-center mb-6">
        <label className="mr-4">Brush Size:</label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushRadius}
          onChange={handleBrushRadiusChange}
          className="mr-4"
        />
        <label className="mr-4">Brush Color:</label>
        <input
          type="color"
          value={brushColor}
          onChange={handleBrushColorChange}
          className="mr-4"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleMaskExport1}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Export Mask on pc
        </button>
        <button
          onClick={handleMaskExport}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          MaskUplodeOnCloud
        </button>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
}

export default EditPhoto;
