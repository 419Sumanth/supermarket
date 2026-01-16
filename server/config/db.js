import mongoose from "mongoose";

const DB = process.env.DATABASE;

mongoose.connect(DB)
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB connection error", err);
});
