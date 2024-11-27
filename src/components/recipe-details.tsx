"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function RecipeDetails() {
  return (
    <Card>
      <div className="flex flex-row">
        <div className="flex-1">
          <CardHeader>
            <CardTitle className="px-1 pt-1">Featured: Pasta</CardTitle>
            <CardDescription className="px-1">
              Recipe Description
            </CardDescription>
          </CardHeader>
          <Image
            src="https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg"
            width={500}
            height={500}
            alt="Picture of recipe"
            className="rounded-xl m-1"
          />
        </div>
        <div className="w-px bg-border ml-2"></div>
        <div className="p-4 w-72">
          <CardContent className="flex flex-row space-x-4">
            <div className="w-1/2">
              <p className="font-semibold mb-2">Ingredients</p>
              <ul className="list-disc list-inside text-sm">
                <li>2 cups pasta</li>
                <li>1/2 cup basil</li>
                <li>1 tsp mustard</li>
                <li>Salt and pepper to taste</li>
              </ul>
            </div>
            <div className="w-1/2">
              <p className="font-semibold mb-2">Steps</p>
              <ol className="list-decimal list-inside text-sm">
                <li>Boil water and cook pasta.</li>
                <li>Chop basil and add to pasta.</li>
                <li>Mix mustard with pasta.</li>
                <li>Season with salt and pepper.</li>
              </ol>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
