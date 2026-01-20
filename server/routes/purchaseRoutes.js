import express from "express";
import Purchase from "../models/Purchase.js";

const router = express.Router();

/* --------------------------------
   TEST ROUTE
--------------------------------- */
router.get("/test", (req, res) => {
  res.json({ message: "Purchase route working" });
});

/* --------------------------------
   ADD PURCHASE (POST)
--------------------------------- */
router.post("/add", async (req, res) => {
  try {
    console.log("PURCHASE POST HIT");
    console.log("BODY:", req.body);

    const purchase = new Purchase(req.body);
    await purchase.save();

    console.log("SAVED PURCHASE:", purchase);

    res.status(201).json(purchase);
  } catch (error) {
    console.error("PURCHASE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/* --------------------------------
   GET ALL PURCHASES
--------------------------------- */
router.get("/", async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
