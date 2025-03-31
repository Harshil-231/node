const cloundinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {

    //conif
    cloundinary.config({
        cloud_name: "dhxgxqwf6",
        api_key: "832717434777328",
        api_secret: "dN4sIMYKfO8SYWSFWt8n0qgrl1E"
    })

    const cloundinaryResponse = await cloundinary.uploader.upload(file.path);
    return cloundinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}