import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function FeaturedItem() {
  return (
    <Card>
      <div className="flex flex-row">
        {" "}
        {/* Added flex container */}
        <div className="flex-1">
          {" "}
          {/* Left side content */}
          <CardHeader>
            <CardTitle>Recipe</CardTitle>
            <CardDescription>Recipe Description</CardDescription>
          </CardHeader>
          <Image
            src="https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg"
            width={450}
            height={450}
            alt="Picture of recipe"
            className="rounded-xl m-1"
          />
        </div>
        {/* Vertical border */}
        <div className="w-px bg-gray-200"></div>
        <div className="p-4 w-48">
          {" "}
          {/* Right side content */}
          <CardContent className="flex flex-row">
            <p className="mr-2">Ingredients</p>
            <p className="ml-2">Steps</p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
