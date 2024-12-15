import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiResponse } from '../Utils/ApiResponse.js';
import { ApiError } from "../Utils/ApiError.js";
import ImageUrlStore from '../Models/image.model.js';
import  User from "../Models/user.model.js";
import  uploadOnCloudinary  from '../Utils/cloudinary.js';
  console.log("i am in iamgecotroler");
export const ImagePush= asyncHandler(async (req, res) => {
    try{
    const media = req.file?.path;
    if (!media) {
        throw new ApiError("Media is required", 400);
      }

      const imageStore = await uploadOnCloudinary(media);


      if (!imageStore || !imageStore.url) {
        throw new ApiError("Image/Video upload failed", 400);
      }
      const owner = req.user._id;
     const ImageStore = await ImageUrlStore.create({
        owner: owner,
        ImageUrl: imageStore.url 
      });
      
      
      if (!ImageStore) {
        throw new ApiError("Failed to create post", 500);
      }

      await User.findByIdAndUpdate(
        owner,
        {  
           $push: { 
            ImageUrlUser:ImageStore._id,
            }
        },
        {
           new: true,
        }
      )
  
      return res.status(201).json(new ApiResponse(true, "Image created successfully", ImageStore));
    }catch (error) {
      console.error("Error in pushPost:", error);
      throw new ApiError(error.message || "Failed to create post", error.statusCode || 500);
    }
}

)

