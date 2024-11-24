import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: String;
    email: String;
    password: String;
    userId: String;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: String, unique: true, required: true },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);