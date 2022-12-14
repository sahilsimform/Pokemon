import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    wishlist: [],
  },
  {
    timestamps: true,
  }
);

// mongoose.models = {};

// export default mongoose.model("User", UserSchema);
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
