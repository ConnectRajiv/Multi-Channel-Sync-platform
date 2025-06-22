import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/orders", orderRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
