import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, props: RouteParams) {
  const params = await props.params;
  const { id } = params;
  await connectMongoDB();
  const item = await Item.findOne({ _id: id });
  return NextResponse.json({ item }, { status: 200 });
}

export async function PUT(request: NextRequest, props: RouteParams) {
  const params = await props.params;
  const { id } = params;
  const {
    title: title,
    description: description,
    image: image,
    updated_date: updated_date,
    cookTime: cookTime,
    ingredients: ingredients,
    instructions: instructions,
    type: type,
    user: user,
  } = await request.json();
  await connectMongoDB();
  await Item.findByIdAndUpdate(id, {
    title,
    description,
    image,
    cookTime,
    ingredients,
    instructions,
    type  });
  return NextResponse.json({ message: "item updated" }, { status: 200 });
}

export async function DELETE(request: NextRequest, props: RouteParams) {
  const params = await props.params;
  const { id } = params; // Extracts the item ID from the request parameters.

  // Checks if the ID is a valid MongoDB ObjectId.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  await connectMongoDB(); // Connects to the MongoDB database.
  const deletedItem = await Item.findByIdAndDelete(id); // Attempts to delete the item with the specified ID.

  // If no item was found with the provided ID, returns a 404 response.
  if (!deletedItem) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  // Returns a success response if the item was deleted.
  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
