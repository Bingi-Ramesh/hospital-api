// routes/chat.js
const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const Patient=require("../models/patient")
const Doctor=require("../models/doctor")
// POST /api/messages - send a message
router.post("/register", async (req, res) => {
  const { senderId, receiverId, senderModel, receiverModel, text } = req.body;
  if (!senderId || !receiverId || !senderModel || !receiverModel || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const senderModelName = senderModel === "Patient" ? Patient : Doctor;
    const receiverModelName = receiverModel === "Patient" ? Patient : Doctor;
  
    const senderDoc = await senderModelName.findById(senderId);
    const receiverDoc = await receiverModelName.findById(receiverId);
  
    if (!senderDoc || !receiverDoc) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }
  
    const senderName = senderDoc.fullname;
    const receiverName = receiverDoc.fullname;
  
    const newMessage = new Message({
      senderId,
      receiverId,
      senderModel,
      receiverModel,
      text,
      senderName,
      receiverName,
    });
  
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/messages/history?user1=<id>&user2=<id>
// GET /api/messages/history
router.get("/history", async (req, res) => {
    try {
      const { user1, user2, receiverId } = req.query;
  
      let query;
      if (receiverId) {
        // Special doctor mode — get all messages received by this doctor
        query = { receiverId };
      } else if (user1 && user2) {
        // Normal patient-doctor chat
        query = {
          $or: [
            { senderId: user1, receiverId: user2 },
            { senderId: user2, receiverId: user1 }
          ]
        };
      } else {
        return res.status(400).json({ message: "Missing query params" });
      }
  
      const messages = await Message.find(query).sort({ createdAt: 1 });
      res.json({ messages });
    } catch (err) {
      console.error("Error fetching messages:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// routes/chat.js


// GET /api/messages/doctor?doctorId=<doctorId>
router.get("/doctor-chat", async (req, res) => {
    try {
      const { doctorId } = req.query;
      if (!doctorId) {
        return res.status(400).json({ message: "doctorId is required" });
      }
  
      const messages = await Message.find({ receiverId: doctorId })
        .sort({ createdAt: 1 })
        .lean();
  
      res.json({ messages });
    } catch (err) {
      console.error("Error fetching doctor messages:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  




module.exports = router;
