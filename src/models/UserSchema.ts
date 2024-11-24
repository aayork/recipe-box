import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid"; // For generating unique UUIDs

export interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, default: () => uuidv4() }, // Use UUID as the unique ID
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
