// server/routes/bookings.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Room = require("../models/room");

// Route to handle booking a room
router.post("/bookroom", async (req, res) => {
  const {
    room,
    user,
    username,
    fromdate,
    todate,
    totalAmount,
    totalDays,
    transactionId,
  } = req.body;

  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid: user,
      username, // Include the username
      roomname: room.name, // Add the roomname field
      fromdate,
      todate,
      totalAmount,
      totalDays,
      totaldays: totalDays,
      rentperday: room.rentperday,
      transactionId,
      totalrent: totalAmount,
    });

    const booked = await newBooking.save();

    // Set the room to booked
    await Room.findByIdAndUpdate(room._id, { isBooked: true });
    res.send("Room Booked Successfully");
  } catch (error) {
    console.error("Error booking room:", error);
    return res.status(400).json({ message: error.message });
  }
});

// Endpoint to get all bookings
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Server Error");
  }
});

// Delete all bookings for amdin 
router.delete('/deleteallbookings', async (req, res) => {
  try {
    await Booking.deleteMany({});
    res.status(200).send('All bookings deleted');
  } catch (error) {
    res.status(500).send('Error deleting bookings:', error);
  }
});

// Delete all bookings for amdin 
router.delete('/deleteonebookings', async (req, res) => {
  try {
    await Booking.deleteOne({});
    res.status(200).send('One bookings deleted');
  } catch (error) {
    res.status(500).send('Error deleting bookings:', error);
  }
});

// Endpoint to get all bookings by user id
router.get("/getbookingbyuserid", async (req, res) => {
  try {
    const { userid } = req.query; // Extract userid from query parameters
    const mybookings = await Booking.find({ userid }); // Query the bookings collection
    res.json(mybookings);
  } catch (error) {
    console.error("Error fetching mybookings:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
