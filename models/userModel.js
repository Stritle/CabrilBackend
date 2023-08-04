import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    birthDate: { type: String, required: true },
    numberOfChildren: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    userType: { type: String, default: "Standart User" },
    profilePicture: { type: String },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
