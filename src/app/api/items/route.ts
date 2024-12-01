import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await connectMongoDB();
  const items = await Item.find();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const {
    title,
    description,
    image,
    updated_date,
    cookTime,
    ingredients,
    instructions,
    type,
    user,
  } = await request.json(); // Extracts data from the request body.
  await connectMongoDB(); // Connects to the MongoDB database.
  await Item.create({
    title,
    description,
    image,
    updated_date,
    cookTime,
    ingredients,
    instructions,
    type,
    user,
  }); // Creates a new item document in the database with the provided data.
  return NextResponse.json(
    { message: "Item added successfully" },
    { status: 201 },
  ); // Sends a JSON response with a success message and status 201.
}
