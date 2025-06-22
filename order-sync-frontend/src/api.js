import axios from "axios";

const API_BASE = "http://localhost:5000/orders";

export const fetchOrders = (platform) => axios.get(`${API_BASE}/fetch/${platform}`);
export const syncOrders = () => axios.post(`${API_BASE}/sync`);
export const getStats = () => axios.get(`${API_BASE}/stats`);
export const retryOrder = (platform) => axios.get(`${API_BASE}/fetch/${platform}`);
export const addOrder = (data) => axios.post(`${API_BASE}`, data);
export const deleteOrders = (ids) => axios.delete(`${API_BASE}`, { data: { ids } });
