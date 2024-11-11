"use client";

import { useState } from "react";
import { CarouselItems } from "./components/carousel-items";
import { Item } from "./components/item";
import { Header } from "./components/header";

const recipeData = [
  {
    id: "1",
    title: "Churros",
    description: "Yummy yummy in my tummy!",
    image:
      "https://www.allrecipes.com/thmb/qq9s8jlKplKUDEo3Gtk15EAJpHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-recipe-24700-churros-VAT-hero-03-4x3-a7f6af1860934b0385f84ab9f13f2613.jpg",
  },
  {
    id: "2",
    title: "Pasta",
    description: "Delicious homemade pasta",
    image:
      "https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg",
  },
  {
    id: "3",
    title: "Salad",
    description: "A healthy green salad",
    image:
      "https://garlicsaltandlime.com/wp-content/uploads/2022/07/Garden-salad-thumbnail.jpg",
  },
];

export default function Home() {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const toggleSignIn = () => {
    setSignedIn((prev) => !prev);
  };
  return (
    <div className="min-h-screen p-4 font-[family-name:var(--font-geist-sans)]">
      <Header signedIn={signedIn} onSignInToggle={toggleSignIn} />
      <div className="flex justify-center relative right-20">
        <CarouselItems />
      </div>
      <h2 className="font-bold text-xl mt-2">Trending</h2>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-min">
        {recipeData.map((recipe) => (
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
