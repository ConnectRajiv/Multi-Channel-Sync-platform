// controllers/orderController.js
import Order from "../models/Order.js";
import { mockFetchOrders, mockSyncOrder } from "../services/mockApiService.js";

export const fetchOrders = async (req, res) => {
  const { platform } = req.params;
  const data = mockFetchOrders(platform);
  const saved = await Promise.all(
    data.map((o) => Order.create({ ...o, platform }))
  );
  res.json(saved);
};

export const syncOrders = async (req, res) => {
  const orders = await Order.find({ status: { $in: ["pending", "failure"] } });

  const synced = await Promise.all(
    orders.map(async (order) => {
      const result = await mockSyncOrder(order);
      order.status = result;
      order.syncAttempts += 1;
      order.lastSync = new Date();
      await order.save();
      return order;
    })
  );

  res.json(synced);
};

export const getStats = async (req, res) => {
  const stats = await Order.aggregate([
    {
      $group: {
        _id: { platform: "$platform", status: "$status" },
        count: { $sum: 1 },
      },
    },
  ]);
  res.json(stats);
};
// Add a new order
export const addOrder = async (req, res) => {
  try {
    const { platform, orderId, items } = req.body;
    const newOrder = await Order.create({
      platform,
      orderId,
      items,
      status: "pending",
      syncAttempts: 0,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Delete multiple orders
export const deleteOrders = async (req, res) => {
  try {
    const { ids } = req.body;
    await Order.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Orders deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete orders" });
  }
};