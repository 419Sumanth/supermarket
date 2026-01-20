import express from "express";
import StockAlert from "../models/StockAlert.js";

const router = express.Router();

/* ---------------------------
   TEST ROUTE
---------------------------- */
router.get("/test", (req, res) => {
  res.json({ message: "Stock route working" });
});

/* ---------------------------
   ADD STOCK ALERT
---------------------------- */
router.post("/add", async (req, res) => {
  try {
    console.log("ADD STOCK ALERT HIT");
    console.log("BODY:", req.body);

    const { currentStock, minimumStock, alertActive } = req.body;

    if (currentStock === undefined || minimumStock === undefined) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const stockAlert = new StockAlert({
      currentStock,
      minimumStock,
      alertActive
    });

    await stockAlert.save();

    res.status(201).json(stockAlert);
  } catch (error) {
    console.error("STOCK ADD ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/* ---------------------------
   GET ALL STOCK ALERTS
---------------------------- */
router.get("/", async (req, res) => {
  try {
    const alerts = await StockAlert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ---------------------------
   UPDATE STOCK ALERT
---------------------------- */
router.put("/:id", async (req, res) => {
  try {
    const updatedAlert = await StockAlert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAlert) {
      return res.status(404).json({ error: "Stock alert not found" });
    }

    res.status(200).json(updatedAlert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ---------------------------
   DELETE STOCK ALERT
---------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const deletedAlert = await StockAlert.findByIdAndDelete(req.params.id);

    if (!deletedAlert) {
      return res.status(404).json({ error: "Stock alert not found" });
    }

    res.status(200).json({ message: "Stock alert deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
