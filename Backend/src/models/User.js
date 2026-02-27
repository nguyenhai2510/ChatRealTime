import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },

    hashedPassword: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    avatarUrl: {
      type: String,
      default: "",
    },

    avatarId: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;