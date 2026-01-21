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
  "Name": "Sumanth Bhat",
  "Type": "Admin",
  "password": "Admin@123",
  "Email": "sumanthbhat@gmail.com",
  "DOB": 1999,
  "Mobile": 9876543210,
  "isActive": true
}
 */