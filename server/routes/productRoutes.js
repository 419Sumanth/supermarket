
import express from "express";
import Product from "../models/Product.js";
import {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct
} from "../controllers/ProductController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add",authMiddleware, addProduct);
router.get("/",authMiddleware, getAllProducts);
router.get("/:id",authMiddleware, getProductById);
router.delete("/:id",authMiddleware, deleteProduct);




router.post("/add", async (req, res) => {
  try {
    console.log("PRODUCT POST BODY:", req.body);

    const product = new Product(req.body);
    const savedProduct = await product.save();

    console.log("PRODUCT SAVED:", savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("PRODUCT SAVE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    console.log("TOTAL PRODUCTS:", products.length);

    res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;


