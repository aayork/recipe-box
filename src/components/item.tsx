import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ItemProps {
  key: string;
  title: string;
  description: string;
  image: string;
}

export function Item({ title, description, image }: ItemProps) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <Card className="w-fit h-fit p-1">
      <Image
        src={image}
        width={300}
        height={300}
        alt={`Picture of ${title}`}
        className="rounded-xl"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Button variant="outline">Info</Button>
          <Button variant="outline" onClick={toggleLike}>
            <Heart className={liked ? "text-red-500" : "text-gray-500"} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
