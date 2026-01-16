import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    size: String,
    price: Number,
    quantity: Number,
    lowStock: Number,
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "suppliers"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("products", productSchema);
export default Product;
/*
{
  "name": "Basmati Rice",
  "category": "Grocery",
  "size": "10 kg",
  "price": 1250,
  "quantity": 80,
  "lowStock": 20,
  "supplierId": "65b10f4a9e12ab3456789012"
}
*/