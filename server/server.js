
//MONGO_URI=mongodb+srv://Sumanth:dbsumanth@supermarket.ric0sta.mongodb.net/supermarket

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import supplierRoutes from "./routes/supplierRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";



const app = express();
const port =  5000;

app.use(express.json());
app.use(cors());


app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stock", stockRoutes);



app.get("/", (req, res) => {
    res.send("Server is running");
});

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















