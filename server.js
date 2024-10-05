const express = require("express");
const app = express();
const dbconfig = require("./dbconfig"); // Importing db.js configuration
const roomsRoute = require("./routes/roomsRoute"); // Importing roomsRoutes to server
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const razorpayRoutes = require("./routes/razorpayRoutes"); // Adjust path as needed
const colors = require("colors");
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/razorpay", razorpayRoutes); // Register the Razorpay routes

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Node server has started on port ${port} using nodemon.`.bgCyan.white
  )
);
