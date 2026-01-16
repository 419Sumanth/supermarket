import express from "express";
import Supplier from "../models/Supplier.js";

const router = express.Router();

/**
 * @route   POST /api/suppliers/add
 * @desc    Add new supplier
 */
router.post("/add", async (req, res) => {
  try {
    const { name, email, phone, address, isActive } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const supplier = new Supplier({
      name,
      email,
      phone,
      address,
      isActive
    });

    const savedSupplier = await supplier.save();

    res.status(201).json(savedSupplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @route   GET /api/suppliers
 * @desc    Get all suppliers
 */
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @route   GET /api/suppliers/:id
 * @desc    Get single supplier
 */
router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @route   DELETE /api/suppliers/:id
 * @desc    Delete supplier
 */
router.delete("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
