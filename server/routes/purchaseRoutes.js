import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addPurchase,
  getAllPurchases,
  getPurchaseById,
  getPurchaseByUserId,
  deletePurchase,
} from "../controllers/purchaseController.js";

const router = express.Router();

router.post("/add",authMiddleware, addPurchase);
// router.post("/add", addPurchase);

router.get("/", authMiddleware, getAllPurchases);
router.get("/getPurchasesByUserId", authMiddleware, getPurchaseByUserId);
router.get("/:id", authMiddleware, getPurchaseById);
router.delete("/:id", authMiddleware, deletePurchase);

export default router;
