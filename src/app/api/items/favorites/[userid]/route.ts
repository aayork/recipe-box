import { NextResponse } from "next/server";
import Item from "@/models/itemSchema";

export async function GET(request: Request, { params }: { params: { userid: string } }) {
  try {
    const { userid } = params;
    const favorites = await Item.find({ favoritedBy: userid }).exec();
    return NextResponse.json({ items: favorites });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { userid: string } }) {
  try {
    const { userid } = params;
    const { recipeId } = await request.json();
    await Item.findByIdAndUpdate(recipeId, { $addToSet: { favoritedBy: userid } }).exec();
    return NextResponse.json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add to favorites" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { userid: string } }) {
  try {
    const { userid } = params;
    const { recipeId } = await request.json();
    await Item.findByIdAndUpdate(recipeId, { $pull: { favoritedBy: userid } }).exec();
    return NextResponse.json({ message: "Recipe removed from favorites" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to remove from favorites" }, { status: 500 });
  }
}
