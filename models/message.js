// models/Message.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, required: true, refPath: "senderModel" },
  receiverId: { type: Schema.Types.ObjectId, required: true, refPath: "receiverModel" },
  senderName:{type:String},
  receiverName:{type:String},
  senderModel: { type: String, enum: ["Patient", "Doctor"], required: true },
  receiverModel: { type: String, enum: ["Patient", "Doctor"], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);
