import Purchase from "../models/Purchase.js";

/**
 * @desc   Create a new purchase
 * @route  POST /api/purchases/add
 */

export const addPurchase = async (req, res) => {

  // console.log("addPurchase called with body:", req.body);

  try {
    if (!req.isAuth && req.userRole === "User") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { numberOfItems, items, purchasePrice, paymentstatus } = req.body;

    // validations
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items are required"
      });
    }

    if (purchasePrice === undefined) {
      return res.status(400).json({
        success: false,
        message: "purchasePrice is required"
      });
    }

    if (paymentstatus === undefined) {
      return res.status(400).json({
        success: false,
        message: "paymentstatus is required"
      });
    }

    // validate each item
    for (let item of items) {
      if (!item.productId || !item.name || !item.quantity || !item.price) {
        return res.status(400).json({
          success: false,
          message: "Each item must include productId, name, quantity, and price"
        });
      }
    }

    const newPurchase = new Purchase({
      userId: req.user.id,
      numberOfItems: numberOfItems,
      items: items,
      purchasePrice: purchasePrice,
      paymentstatus: paymentstatus
    });

    const savedPurchase = await newPurchase.save();

    return res.status(201).json({
      success: true,
      message: "Purchase added successfully",
      data: savedPurchase
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add purchase",
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

     if (!req.isAuth && req.userRole !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

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

     if (!req.isAuth && req.userRole !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

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
