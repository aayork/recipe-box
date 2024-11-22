"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { Item } from "@/components/item";
import { useUser } from "@/components/user-context";
import { useRecipeContext } from "@/components/recipe-context";
import { CarouselItems } from "@/components/carousel-items";

export default function Home() {
  const { signedIn } = useUser();
  const { recipes } = useRecipeContext();

  return (
    <div className="min-h-screen p-4 font-[family-name:var(--font-geist-sans)]">
      <CarouselItems />
      {/* Centered Trending Section */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center">
          <h2 className="font-bold text-xl mt-2">Trending</h2>
          {signedIn && (
            <Link href="/add-recipe">
              <button className="ml-2 flex items-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 border border-input">
                <Plus size={16} />
                Add New Recipe
              </button>
            </Link>
          )}
        </div>
      </div>
      {/* Break Between Trending and Cards */}
      <div className="my-6"></div>
      {/* Centered Cards */}
      <div className="flex justify-center">
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
