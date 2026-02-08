import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    numberOfItems: {
      type: Number,
      required: true
    },

    items: [
      {
         productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true
        },
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],

    purchasePrice: {
      type: Number,
      required: true
    },

    paymentstatus: {
      type: Boolean,
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
  "userId": "6970a981b16ef68de6931c52",
  "quantity": 20,
  "purchasePrice": 4800,
  "paymentstatus": false,
  "supplierName": "FreshMart Suppliers"
}
*/