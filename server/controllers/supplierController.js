import Supplier from "../models/Supplier.js";

/**
 * @desc    Add new supplier
 * @route   POST /api/suppliers/add
 */
export const addSupplier = async (req, res) => {
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
      isActive: isActive ?? true
    });

    const savedSupplier = await supplier.save();
    res.status(201).json(savedSupplier);

  } catch (error) {
    console.error("SUPPLIER SAVE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all suppliers
 * @route   GET /api/suppliers
 */
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.status(200).json(suppliers);
  } catch (error) {
    console.error("GET SUPPLIERS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get supplier by ID
 * @route   GET /api/suppliers/:id
 */
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (error) {
    console.error("GET SUPPLIER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Update supplier
 * @route   PUT /api/suppliers/:id
 */
export const updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(updatedSupplier);
  } catch (error) {
    console.error("UPDATE SUPPLIER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Delete supplier
 * @route   DELETE /api/suppliers/:id
 */
export const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!deletedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("DELETE SUPPLIER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
