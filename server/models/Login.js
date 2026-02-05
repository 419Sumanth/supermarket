import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  
  Email:{
      type:String,
      required:true,
      unique:true
    },
  password:{
      type:String,
      required:true
    }
    
   
  });

  const Login = mongoose.model('users',loginSchema);

  export default Login;

  /*
   URL: http://localhost:5000/api/auth/register
  Method: POST
  Body: JSON
  
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