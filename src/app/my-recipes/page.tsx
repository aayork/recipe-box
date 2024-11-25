"use client";

import Link from "next/link";
import { useRecipeContext } from "@/components/recipe-context";
import { Item } from "@/components/item";

export default function MyRecipesPage() {
  const { recipes } = useRecipeContext();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-4xl flex flex-col items-center space-y-6">
        <h1 className="font-bold text-2xl">My Recipes</h1>
        {recipes.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {recipes.map((recipe) => (
              <Item
                key={recipe.id}
                title={recipe.title}
                description={recipe.instructions}
                image={recipe.image}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">You have no recipes yet!</p>
        )}
        <Link href="/add-recipe">
          <button className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add a New Recipe
          </button>
        </Link>
      </div>
    </div>
  );
}
