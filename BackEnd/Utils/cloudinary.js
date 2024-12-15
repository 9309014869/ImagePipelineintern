import { v2 as cloudinary } from 'cloudinary';

import { unlinkSync } from 'fs';




cloudinary.config({ 
    cloud_name: "dvosf7ajl", 
    api_key: 821293723233931, 
    api_secret: "MiDvYe6DnYAn5kO83XQRluD1NfI"           
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, { 
            resource_type: 'auto' ,
            resource_type: 'auto',
            max_file_size: 500000000 // 50MB
        });

        console.log("File has been uploaded successfully", response.url);

        unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error("Error during Cloudinary upload:", error);
        if (localFilePath) {
            unlinkSync(localFilePath);
        }
        return null;
    }
}


export default uploadOnCloudinary;


