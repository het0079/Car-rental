const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51NFtVGSAZAXtdYSkBaDemNewFODLyLvAZ4Cp8oCxI2m1ecvfG2C1cNpm1B6k6lwIQfD2f9Hxt53gG2hNGExnFVK100raNTKWo4"
);

// ======================
// BOOK A CAR
// ======================
router.post("/bookcar", async (req, res) => {
  try {
    const { token } = req.body;

    // (Stripe payment is disabled for now)
    req.body.transactionId = token.id;

    // Save booking
    const newBooking = new Booking(req.body);
    await newBooking.save();

    // Update car's booked slots
    const car = await Car.findById(req.body.car);

    car.bookedTimeSlots.push({
      from: req.body.bookedTimeSlots.from,
      to: req.body.bookedTimeSlots.to,
    });

    await car.save();

    res.send("Booking successful");
  } catch (error) {
    console.log("BOOKING ERROR:", error);
    return res.status(400).json({ message: "Booking failed" });
  }
});

// ======================
// GET ALL BOOKINGS
// ======================
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }});
module.exports = router;
