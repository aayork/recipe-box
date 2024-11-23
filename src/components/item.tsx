import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ItemProps {
  key: string;
  title: string;
  description: string;
  image: string;
}

export function Item({ title, description, image }: ItemProps) {
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
        <Button variant="outline">Info</Button>
      </CardContent>
    </Card>
  );
}