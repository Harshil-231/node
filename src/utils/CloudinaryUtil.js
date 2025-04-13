const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {
    try {
        // Configuration
        cloudinary.config({
            cloud_name: "dhxgxqwf6",
            api_key: "832717434777328",
            api_secret: "dN4sIMYKfO8SYWSFWt8n0qgrl1E"
        });

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