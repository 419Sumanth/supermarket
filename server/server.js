
//MONGO_URI=mongodb+srv://Sumanth:dbsumanth@supermarket.ric0sta.mongodb.net/supermarket

import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import mongoose from "mongoose";

import supplierRoutes from "./routes/supplierRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const port =  5000;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stock", stockRoutes);

app.post("/test-post", (req, res) => {
  console.log("DIRECT POST HIT");
  console.log("BODY:", req.body);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/test", (req, res) => {
  res.send("SERVER OK");
});















