"use client";

import { CarouselItems } from "./components/carousel-items";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Item } from "./components/item";
import { useUser } from "./components/user-context";
import { useRecipeContext } from "./components/recipe-context";

export default function Home() {
  const { signedIn } = useUser();
  const { recipes } = useRecipeContext();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-4xl flex flex-col items-center space-y-6">
        <CarouselItems />
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-xl">Trending</h2>
          {signedIn && (
            <Link href="/add-recipe">
              <button className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <Plus size={16} />
                Add New Recipe
              </button>
            </Link>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {recipes.map((recipe) => (
            <Item
              key={recipe.id}
              title={recipe.name}
              description={recipe.instructions}
              image={recipe.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
