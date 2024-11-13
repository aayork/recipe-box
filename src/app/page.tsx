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
      <div className="flex justify-start items-center mt-4">
        <h2 className="font-bold text-xl mt-2">Trending</h2>
        {signedIn && (
          <Link href="/add-recipe">
            <button className="m-2 flex items-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 border border-input">
              <Plus size={16} />
              Add New Recipe
            </button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
  );
}
