// routes/orderRoutes.js
import express from "express";
import {
  fetchOrders,
  syncOrders,
  getStats,
  addOrder,
  deleteOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/fetch/:platform", fetchOrders);     // Mock fetch
router.post("/sync", syncOrders);                // Sync pending/failed
router.get("/stats", getStats);                  // Stats by platform/status

// ✅ Add new order
router.post("/", addOrder);

// ✅ Delete multiple orders
router.delete("/", deleteOrders);

export default router;
