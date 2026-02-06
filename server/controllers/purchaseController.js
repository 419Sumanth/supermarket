import Purchase from "../models/Purchase.js";

/**
 * @desc   Create a new purchase
 * @route  POST /api/purchases/add
 */
export const addPurchase = async (req, res) => {
  try {
    const {
      userId,
      quantity,
      purchasePrice,
      paymentstatus,
      supplierName,
      purchaseDate
    } = req.body;

    // Validation
    if (
      !userId ||
      !quantity ||
      !purchasePrice ||
      paymentstatus === undefined ||
      !supplierName
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    const newPurchase = new Purchase({
      userId,
      quantity,
      purchasePrice,
      paymentstatus,
      supplierName,
      purchaseDate
    });

    const savedPurchase = await newPurchase.save();

    res.status(201).json({
      success: true,
      message: "Purchase added successfully",
      data: savedPurchase
    });
  } catch (error) {
    console.error("PURCHASE SAVE ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/**
 * @desc   Get all purchases
 * @route  GET /api/purchases
 */
export const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("userId");

    res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchases",
      error: error.message
    });
  }
};

/**
 * @desc   Get single purchase by ID
 * @route  GET /api/purchases/:id
 */
export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate("userId");

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found"
      });
    }

    res.status(200).json({
      success: true,
      data: purchase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid purchase ID",
      error: error.message
    });
  }
};

export const getPurchaseByUserId = async (req, res) => {

   try {
    if (!req.isAuth) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const userId = req.user.id;

    const purchases = await Purchase.find({ userId })
      .sort({ purchaseDate: -1 }); // latest first

    return res.status(200).json({
      success: true,
      purchases
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch purchases",
      error: error.message
    });
  }
}

export const getPurchasesCount = async (req, res) => {

  try {

    if (!req.isAuth && req.userRole !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const count = await Purchase.countDocuments();

    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchase count",
      error: error.message
    });
  }
}


/**
 * @desc   Delete purchase
 * @route  DELETE /api/purchases/:id
 */
export const deletePurchase = async (req, res) => {
  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);

    if (!deletedPurchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete purchase",
      error: error.message
    });
  }
};
