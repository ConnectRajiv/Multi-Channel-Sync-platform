# Multi-Channel Order Sync Tracker

A full-stack project that simulates syncing orders from multiple e-commerce platforms (e.g., Shopify, Amazon) to a central warehouse system.

This project allows users to:

- Fetch orders from mock platforms
- Sync orders (pending → success/failure)
- Retry failed syncs
- Add or delete orders manually
- Visualize sync statistics in table and chart form

---

## Features

- Fetch mock orders from Shopify and Amazon
- Sync orders and update statuses
- Track order stats by platform and status
- Add new orders manually
- Delete selected orders
- Visual stats using charts
- Toast alerts for all operations
- Auto-refresh stats every 5 seconds
- Modern UI with Material UI

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemon

### Frontend

- React.js
- Axios
- Material UI
- Recharts
- React Toastify

---

## Project Setup

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/ConnectRajiv/Multi-Channel-Sync-platform.git
cd order-sync-tracker/backend

# Install dependencies
npm install

# Set your MongoDB connection string in the backend config
# Example: mongodb://127.0.0.1:27017/order_sync

# Start the server
npm start
# Server runs at: http://localhost:5000
```

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the frontend
npm start
# React app runs at: http://localhost:3000
```

---

## Usage Guide

- **Fetch Orders** – Simulate orders from Shopify or Amazon.
- **Sync All** – Randomly assign status (success/failure) to pending orders.
- **Add Order** – Manually input a new order.
- **Delete Orders** – Select and delete multiple orders.
- **Stats & Charts** – View order sync summary in a responsive graph and table.
- **Auto-Refresh** – Dashboard refreshes sync stats every 5 seconds.
- **Notifications** – Success/failure messages via Toasts.

---

## Folder Structure

```
order-sync-tracker/
├── backend/
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── controllers/        # Business logic
│   ├── config/             # DB config
│   ├── app.js              # Main server
│   └── .env                # Environment config
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios API calls
│   │   ├── components/     # React components
│   │   └── App.js
│   ├── public/
│   └── package.json
└── README.md
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
