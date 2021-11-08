import mongoose from "mongoose";
const { Schema } = mongoose;
// import { Type, UserModel } from "src/types/user";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      require: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", UserSchema);
