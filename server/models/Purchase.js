import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    purchasePrice: {
      type: Number,
      required: true
    },
    paymentstatus: {
      type: Boolean,
      required: true
    },

    supplierName: {
      type: String,
      required: true
    },

    purchaseDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
/*
{
  "userId": "65b0f8d4a1234bcde5678901",
  "quantity": 20,
  "purchasePrice": 4800,
  "paymentstatus": false,
  "supplierName": "FreshMart Suppliers"
}
*/