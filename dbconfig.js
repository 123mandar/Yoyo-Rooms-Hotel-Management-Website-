const colors = require("colors");
const mongoose = require("mongoose");
var mongoURL =
  "mongodb+srv://Mandar:mandar1234@login.ycttfel.mongodb.net/mern-rooms";
mongoose.connect(mongoURL);
var connection = mongoose.connection;

// writing callback functions for checking the connection

connection.on("error", () => {
  console.log("Mongodb connection failed");
});

connection.on("connected", () => {
  console.log("Mongodb connection succesfull.".bgGreen.white);
});

// Exporting db.js to server .js
module.exports = mongoose;
