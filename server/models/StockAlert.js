import mongoose from "mongoose";

const stockAlertSchema = new mongoose.Schema(
  {
    

    currentStock: {
      type: Number,
      required: true
    },

    minimumStock: {
      type: Number,
      required: true
    },

    alertActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const StockAlert = mongoose.model("StockAlert", stockAlertSchema);

export default StockAlert;
/*
{
  "currentStock": 8,
  "minimumStock": 25,
  "alertActive": true
}
*/
