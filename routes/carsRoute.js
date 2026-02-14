const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const upload = require("../server/middleware/upload");

// =======================
// GET ALL CARS
// =======================
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    res.status(500).json(error);
  }
});

// =======================
// ADD NEW CAR
// =======================
router.post("/addcar", upload.single("image"), async (req, res) => {
  try {
    const { name, rentPerDay, capacity, fuelType } = req.body;

    if (!name || !rentPerDay || !capacity || !fuelType || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newcar = new Car({
      name,
      rentPerDay: Number(rentPerDay),
      capacity: Number(capacity),
      fuelType,
      image: `/uploads/${req.file.filename}`,
      bookedTimeSlots: []
    });

    await newcar.save();
    res.json("Car added successfully");

  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});


// =======================
// DELETE CAR
// =======================
router.post("/deletecar", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.body.carid);
    res.send("Car deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

// =======================
// EDIT CAR
// =======================
router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findById(req.body._id);
    Object.assign(car, req.body);
    await car.save();
    res.send("Car updated successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
