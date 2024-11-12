// page.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Item } from "./components/item";
import { useUser } from "./components/user-context";
import { useRecipeContext } from "./components/recipe-context";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function Home() {
  const { signedIn } = useUser();
  const { recipes } = useRecipeContext();

  return (
    <div className="min-h-screen p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between items-center mt-4">
        <h2 className="font-bold text-xl mt-2">Trending</h2>
        {signedIn && (
          <Link href="/add-recipe">
            <button className="m-2 flex items-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Plus size={16} />
              Add New Recipe
            </button>
          </Link>
        )}
      </div>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-min">
        {recipes.map((recipe) => (
          <Item
            key={recipe.id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
          />
        ))}
      </div>
    </div>
  );
}
