import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connector = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to db ${connector.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};
export default connectDB;
