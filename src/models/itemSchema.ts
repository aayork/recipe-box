import mongoose, { Schema, Document, Model } from "mongoose";

interface Item extends Document {
  title: string;
  description?: string;
  image?: string;
  updated_date: Date;
  cookTime: string;
  ingredients: string[];
  instructions: string;
  type: string;
  user: Schema.Types.ObjectId;
}

const itemSchema = new Schema<Item>({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  updated_date: { type: Date, default: Date.now },
  cookTime: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  type: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Association with User
});

const Item: Model<Item> =
  mongoose.models.Item || mongoose.model<Item>("Item", itemSchema);
export default Item;
