import StockAlert from "../models/StockAlert.js";

/**
 * @desc    Create stock alert
 * @route   POST /api/stock/add
 * @access  Protected
 */
export const createStockAlert = async (req, res) => {
  try {
    const { currentStock, minimumStock } = req.body;

    if (currentStock === undefined || minimumStock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const alert = await StockAlert.create({
      currentStock,
      minimumStock,
      alertActive: currentStock <= minimumStock
    });

    res.status(201).json(alert);
  } catch (error) {
    console.error("STOCK ALERT CREATE ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all stock alerts
 * @route   GET /api/stock
 * @access  Protected
 */
export const getAllStockAlerts = async (req, res) => {
  try {
    const alerts = await StockAlert.find().sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    console.error("GET STOCK ALERT ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Update stock quantity
 * @route   PATCH /api/stock/:id
 * @access  Protected
 */
export const updateStock = async (req, res) => {
  try {
    const { currentStock } = req.body;

    const stock = await StockAlert.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Stock record not found" });
    }

    stock.currentStock = currentStock;
    stock.alertActive = currentStock <= stock.minimumStock;

    const updatedStock = await stock.save();

    res.status(200).json(updatedStock);
  } catch (error) {
    console.error("UPDATE STOCK ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Delete stock alert
 * @route   DELETE /api/stock/:id
 * @access  Protected
 */
export const deleteStockAlert = async (req, res) => {
  try {
    const stock = await StockAlert.findByIdAndDelete(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Stock alert not found" });
    }

    res.status(200).json({ message: "Stock alert deleted" });
  } catch (error) {
    console.error("DELETE STOCK ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
