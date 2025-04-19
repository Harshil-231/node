require('dotenv').config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer'); // Import Multer
const path = require('path');   // Import path

const app = express();

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Rename the file
    }
});

const upload = multer({ storage: storage }); // Multer instance

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files (if needed)
// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// import role routes
const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

const categoryRoutes = require("./src/routes/CategoryRoutes");
app.use("/category", categoryRoutes);

const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

const adminRoutes = require("./src/routes/adminRoutes");
app.use('/admin', adminRoutes); // Mount the admin routes under /

const servicesRoutes = require("./src/routes/ServicesRoutes");
app.use("/services", servicesRoutes);

const stateRoutes = require("./src/routes/StateRoutes");
app.use("/state", stateRoutes);

const cityRoutes = require("./src/routes/CityRoutes");
app.use("/city", cityRoutes);

const areaRoutes = require("./src/routes/AreaRoutes");
app.use("/area", areaRoutes);

const salonRoutes = require("./src/routes/SalonRoutes");
app.use("/salons", salonRoutes);

const OwnerRoutes = require("./src/routes/OwnerRoutes");
app.use("/owners", OwnerRoutes);

const customerRoutes = require("./src/routes/CustomerRoutes");
app.use("/customers", customerRoutes);

const staffRoutes = require("./src/routes/StaffRoutes");
app.use("/staff", staffRoutes);

const appointmentRoutes = require("./src/routes/AppointmentRoutes");
app.use( appointmentRoutes);


mongoose.connect("mongodb://localhost:27017/sample").then(() => {
    console.log("database created...");
});

const PORT = 3200;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});