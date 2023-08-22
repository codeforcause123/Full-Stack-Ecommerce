import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const connector = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      colors.bgBrightGreen.black(`Connected to db ${connector.connection.host}`)
    );
  } catch (err) {
    console.error(err);
  }
};
export default connectDB;
