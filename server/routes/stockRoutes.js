import express from "express";
import StockAlert from "../models/StockAlert.js";
import {
  createStockAlert,
  getAllStockAlerts,
  updateStock,
  deleteStockAlert,
  getLowStockCount
} from "../controllers/stockController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, createStockAlert);
router.get("/", authMiddleware, getAllStockAlerts);
router.get("/getlowstockcount", authMiddleware, getLowStockCount); // only admin can see low stock count, so add authMiddleware here
router.patch("/:id", authMiddleware, updateStock);
router.delete("/:id", authMiddleware, deleteStockAlert);

export default router;
