import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    
    name: String,
    email: String,
    phone: String,
    address: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: Boolean
});

const Supplier = mongoose.model("suppliers", supplierSchema);
export default Supplier;

/*
{
  "SupplierId": "65a8f4c7f9a1b2c3d4e5f999",
  "name": "Fresh Farm Suppliers",
  "email": "freshfarm@gmail.com",
  "phone": "9876543211",
  "address": "Bangalore, Karnataka",
  "isActive": true
}
 */
