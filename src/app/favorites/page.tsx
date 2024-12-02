"use client";

import { useUser } from "@/components/user-context";
import { useState, useEffect } from "react";
import { Item } from "@/components/item";
import { SidebarTrigger } from "@/components/ui/sidebar";

export interface Recipe {
  _id: string;
  title: string;
  image: string;
  updated_date: string;
  cookTime: string;
  ingredients: string[];
  instructions: string;
  description: string;
  type: string;
  user: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { signedIn, user } = useUser();

  useEffect(() => {
    if (!user?._id) return;

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/items/favorites/${user._id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorite recipes");
        }
        const data = await response.json();
        setFavorites(data.items);
      } catch (err) {
        console.error(err);
        setError("Failed to load favorite recipes. Please try again later.");
      }
    };

    fetchFavorites();
  }, [user?._id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex">
        <SidebarTrigger className="m-1" />
        <h1 className="font-bold text-xl my-2">Your Favorites</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-2">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <Item
              key={recipe._id}
              id={recipe._id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              user={recipe.user}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              cookTime={recipe.cookTime}
              type={recipe.type}
            />
          ))
        ) : (
          <p className="m-2 text-gray-600">You don’t have any favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
