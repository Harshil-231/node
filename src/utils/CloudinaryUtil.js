const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {
    try {
        // Configuration
       
        // Upload the image
        const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
            folder: "owner_profiles"  // Optional:  Organize your images in Cloudinary
        });

        return cloudinaryResponse;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;  // Re-throw the error to be handled in the controller
    }
};

module.exports = {
    uploadFileToCloudinary
};