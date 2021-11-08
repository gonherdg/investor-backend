import mongoose from "mongoose";
import environment from "../environment/index.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(environment.db.uri, {
      dbName: "my-investor-sim"
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
};

export default connectDB;
