const express = require("express");
require("dotenv").config();   // MUST be here before using process.env
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("../routes/usersRoute");
const carRoutes = require("../routes/carsRoute");
const bookingRoutes = require("../routes/bookingsRoute");

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

