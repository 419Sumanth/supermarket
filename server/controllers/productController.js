import Product from "../models/Product.js";

/**
 * @desc   Add new product
 * @route  POST /api/products/add
 */
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      size,
      price,
      quantity,
      lowStock,
      supplierId
    } = req.body;

    // Basic validation
    if (!name || !category || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
    }

    const newProduct = new Product({
      name,
      category,
      size,
      price,
      quantity,
      lowStock,
      supplierId
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct
    });
  } catch (error) {
    console.error("PRODUCT SAVE ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/**
 * @desc   Get all products
 * @route  GET /api/products
 */
export const getAllProducts = async (req, res) => {
  // console.log("Fetching all products...");
  try {
    const products = await Product.find().populate("supplierId");
    // console.log("Total products fetched:", products.length);

    res.status(200).json({
      success: true,
      count: products.length,
      products: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

/**
 * @desc   Get single product by ID
 * @route  GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("supplierId");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid product ID",
      error: error.message
    });
  }
};

/**
 * @desc   Delete product
 * @route  DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message
    });
  }
};