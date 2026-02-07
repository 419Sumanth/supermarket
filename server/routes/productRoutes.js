
import express from "express";
import Product from "../models/Product.js";
import {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getProductsCount
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add",authMiddleware, addProduct);
router.get("/", getAllProducts);
router.get("/count",authMiddleware,getProductsCount); // only admin can see total count of products, so add authMiddleware here
router.get("/:id", getProductById);
router.delete("/:id",authMiddleware, deleteProduct);

export default router;


