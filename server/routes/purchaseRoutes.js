import express from "express";
import Purchase from "../models/Purchase.js";

import authMiddleware from "../middleware/authMiddleware.js";
import {
  addPurchase,
  getAllPurchases,
  getPurchaseById,
  deletePurchase
} from "../controllers/purchaseController.js";
const router = express.Router();

router.post("/add",authMiddleware, addPurchase);
router.get("/", authMiddleware, getAllPurchases);
router.get("/:id", authMiddleware, getPurchaseById);
router.delete("/:id", authMiddleware, deletePurchase);

 
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
