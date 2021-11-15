import mongoose from "mongoose";
const { Schema } = mongoose;
// import { Type, UserModel } from "src/types/user";

const CryptoSchema = new Schema(
  {
    shortName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    priceInUSD: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
    collection: 'market' 
  });

export default mongoose.model("Crypto", CryptoSchema);
