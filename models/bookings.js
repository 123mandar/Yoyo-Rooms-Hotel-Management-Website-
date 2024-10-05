const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String, // Add the username field
    required: true,
  },
  roomid: {
    type: String,
    required: true,
  },
  roomname: {
    type: String, // Add the room name field
    required: true,
  },
  fromdate: {
    type: String,
    required: true,
  },
  todate: {
    type: String,
    required: true,
  },
  totaldays: {
    type: String,
    required: true,
  },
  totalrent: {
    type: String,
    required: true,
  },
  rentperday: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "booked",
  },
});

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
