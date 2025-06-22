import React, { useEffect, useState } from "react";
import { fetchOrders, syncOrders, getStats, addOrder, deleteOrders } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container, Box, Typography, Button, TextField, Grid, Paper, Checkbox, Table, TableBody, TableCell, TableHead, TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SyncDashboard() {
  const [stats, setStats] = useState([]);
  const [formData, setFormData] = useState({ platform: "", orderId: "", items: "" });
  const [allOrders, setAllOrders] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const loadStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch {
      toast.error("Failed to load stats");
    }
  };

  useEffect(() => { loadStats(); const iv = setInterval(loadStats, 5000); return () => clearInterval(iv); }, []);

  const handleFetch = async platform => {
    try {
      const res = await fetchOrders(platform);
      setAllOrders(prev => [...prev, ...res.data]);
      toast.success(`Fetched ${platform} orders`);
      loadStats();
    } catch {
      toast.error(`Failed to fetch ${platform}`);
    }
  };

  const handleSync = async () => {
    try {
      await syncOrders();
      toast.success("Orders synced");
      loadStats();
    } catch {
      toast.error("Sync failed");
    }
  };

  const handleAdd = async () => {
    try {
      const newOrder = { ...formData, items: formData.items.split(",").map(i => i.trim()) };
      await addOrder(newOrder);
      toast.success("Order added");
      setFormData({ platform: "", orderId: "", items: "" });
      loadStats();
    } catch {
      toast.error("Add failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteOrders(selectedIds);
      toast.success("Deleted selected");
      setAllOrders(prev => prev.filter(o => !selectedIds.includes(o._id)));
      setSelectedIds([]);
      loadStats();
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleSelect = id =>
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));

  return (
    <Container sx={{ py: 4 }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom textAlign="center">
        📦 Multi‑Channel Order Sync Tracker
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
        <Button variant="contained" onClick={() => handleFetch("Shopify")}>Fetch Shopify</Button>
        <Button variant="contained" onClick={() => handleFetch("Amazon")}>Fetch Amazon</Button>
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={handleSync}>Sync Orders</Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Add New Order</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Platform" value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})}/></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Order ID" value={formData.orderId} onChange={e => setFormData({...formData, orderId: e.target.value})}/></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Items (a,b,c)" value={formData.items} onChange={e => setFormData({...formData, items: e.target.value})}/></Grid>
          <Grid item xs={12}><Button variant="contained" onClick={handleAdd}>Add Order</Button></Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Sync Statistics</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats}>
            <XAxis dataKey="_id.platform" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>All Orders</Typography>
        <Table>
          <TableHead><TableRow>
            <TableCell>Select</TableCell><TableCell>Order ID</TableCell><TableCell>Platform</TableCell><TableCell>Status</TableCell><TableCell>Items</TableCell>
          </TableRow></TableHead>
          <TableBody>
            {allOrders.map(order => (
              <TableRow key={order._id}>
                <TableCell><Checkbox checked={selectedIds.includes(order._id)} onChange={() => toggleSelect(order._id)}/></TableCell>
                <TableCell>{order.orderId}</TableCell><TableCell>{order.platform}</TableCell><TableCell>{order.status}</TableCell><TableCell>{order.items.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete} disabled={!selectedIds.length} sx={{ mt: 2 }}>
          Delete Selected
        </Button>
      </Paper>
    </Container>
  );
}
