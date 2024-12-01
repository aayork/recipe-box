import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid"; // For generating unique UUIDs

export interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  favorites: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, default: () => uuidv4() }, // Use UUID as the unique ID
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
