import { NextResponse } from "next/server";
import { User } from "@/models/UserSchema";

// Get the favorite recipes for a user
export async function GET(request: Request, props: { params: Promise<{ userid: string }> }) {
  const params = await props.params;
  try {
    const { userid } = params;
    const user = await User.findById(userid).populate("favorites");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ items: user.favorites });
  } catch (error) {
    console.error("GET Favorites Error:", error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

// Add a recipe to the user's favorites
export async function POST(request: Request, props: { params: Promise<{ userid: string }> }) {
  const params = await props.params;
  try {
    const { userid } = params;
    const { recipeId } = await request.json();

    const user = await User.findById(userid);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    return NextResponse.json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error("POST Favorites Error:", error);
    return NextResponse.json({ error: "Failed to add to favorites" }, { status: 500 });
  }
}

// Remove a recipe from the user's favorites
export async function DELETE(request: Request, props: { params: Promise<{ userid: string }> }) {
  const params = await props.params;
  try {
    const { userid } = params;
    const { recipeId } = await request.json();

    const user = await User.findById(userid);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.favorites = user.favorites.filter((id: { toString: () => any; }) => id.toString() !== recipeId);
    await user.save();

    return NextResponse.json({ message: "Recipe removed from favorites" });
  } catch (error) {
    console.error("DELETE Favorites Error:", error);
    return NextResponse.json({ error: "Failed to remove from favorites" }, { status: 500 });
  }
}
