// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  platform: String,
  orderId: String,
  items: [String],
  status: {
    type: String,
    enum: ["pending", "success", "failure"],
    default: "pending",
  },
  syncAttempts: {
    type: Number,
    default: 0,
  },
  lastSync: Date,
});

export default mongoose.model("Order", orderSchema);
