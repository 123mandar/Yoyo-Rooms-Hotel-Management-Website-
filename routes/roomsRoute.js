const express = require("express");
const router = express.Router(); // Create a new router instance

const Room = require("../models/room"); //import mongodb room.js model beacuse we want to fetch this to frontend part from database

//fetching  for data from mongodb database
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.send(rooms); //here rooms is from mongodb collection
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const rooms = await Room.findOne({ _id: roomid });
    return res.send(rooms); //here rooms is from mongodb collection
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/postnewroom", async (req, res) => {
  const newRoom = new Room({
    name: req.body.name,
    maxcount: req.body.maxcount,
    phonenumber: req.body.phonenumber,
    rentperday: req.body.rentperday,
    type: req.body.type,
    description: req.body.description,
    imageurls: req.body.imageurls,
  });
  try {
    const room = await newRoom.save();
    return res.send("Room Registered Succesfully"); //here rooms is from mongodb collection
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// exporting data to server.js file
module.exports = router;
