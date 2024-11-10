import mongoose, { Schema, Document, Model } from "mongoose";
import { defaultHead } from "next/head";

interface Item extends Document {
  title: string;
  description?: string;
  image?: string;
  updated_date: Date;
}

const itemSchema = new Schema<Item>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const Item: Model<Item> =
  mongoose.models.Item || mongoose.model<Item>("Item", itemSchema);
export default Item;
