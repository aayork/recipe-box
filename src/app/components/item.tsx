import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Item() {
  return (
    <Card>
      <Image
        src="https://www.allrecipes.com/thmb/qq9s8jlKplKUDEo3Gtk15EAJpHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-recipe-24700-churros-VAT-hero-03-4x3-a7f6af1860934b0385f84ab9f13f2613.jpg"
        width={300}
        height={300}
        alt="Picture of recipe"
        className="rounded-xl m-1"
      />
      <CardHeader>
        <CardTitle>Recipe</CardTitle>
        <CardDescription>Yummy yummy in my tummy</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline">Info</Button>
      </CardContent>
    </Card>
  );
}
