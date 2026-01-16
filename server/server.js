

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import supplierRoutes from "./routes/supplierRoutes.js";
import productRoutes from "./routes/productRoutes.js";





const app = express();
const port =  5000;

app.use(express.json());
app.use(cors());





app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);



app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/test", (req, res) => {
  res.send("SERVER OK");
});















