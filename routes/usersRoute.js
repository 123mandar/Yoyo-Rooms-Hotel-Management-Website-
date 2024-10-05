const express = require("express");
const router = express.Router(); // Create a new router instance
const User = require("../models/users"); //import mongodb room.js model beacuse we want to fetch this to frontend part from database

router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await newUser.save();
    return res.send("User Registered Succesfully"); //here rooms is from mongodb collection
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      res.send(user); //if user present with login credentials sending it to frontend else error
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Endpoint to get all users for
router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
