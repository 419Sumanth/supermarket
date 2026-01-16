import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Name:{
    type:String,
    required:true
  },
  Type:{
    type:String,
    required:true
  },
  password:{
      type:String,
      required:true
    },
    Email:{
      type:String,
      required:true,
      unique:true
    },
    DOB:{
      type:Number,
      required:true
    }, 
    Mobile:{
      type:Number,
      required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive:{
      type:Boolean,
      required:true
    }
  });

  const Users = mongoose.model('users',userSchema);

  export default Users;

  /*
  {
  "userId": "65a8f4c7f9a1b2c3d4e5f678",
  "Name": "Sumanth Bhat",
  "Type": "Admin",
  "password": "Admin@123",
  "Email": "sumanthbhat@gmail.com",
  "DOB": 1999,
  "Mobile": 9876543210,
  "isActive": true
}
 */