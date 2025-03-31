require('dotenv').config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// import role routes
const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

const servicesRoutes = require("./src/routes/ServicesRoutes");
app.use("/services", servicesRoutes);

const stateRoutes = require("./src/routes/StateRoutes");
app.use("/state", stateRoutes);

const cityRoutes = require("./src/routes/CityRoutes");
app.use("/city", cityRoutes);

const areaRoutes = require("./src/routes/AreaRoutes");
app.use("/area", areaRoutes);

const salonRoutes = require("./src/routes/SalonRoutes");
app.use("/salon", salonRoutes);

const OwnerRoutes = require("./src/routes/OwnerRoutes");
app.use("/salon-owners", OwnerRoutes);

const customerRoutes = require("./src/routes/CustomerRoutes");
app.use("/customers", customerRoutes);

const staffRoutes = require("./src/routes/StaffRoutes");
app.use("/staff", staffRoutes);

mongoose.connect("mongodb://localhost:27017/sample").then(() => {
    console.log("database created...");
});

const PORT = 3200;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});