import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect('mongodb+srv://Suldaan:612707409@cluster0.yxkrl8m.mongodb.net/SOMFOOD')
    .then(() => console.log("DB Connected"));
};

