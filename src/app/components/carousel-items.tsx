import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FeaturedItem } from "./featured-item";

export function CarouselItems() {
  return (
    <Carousel>
      <CarouselContent className="-ml-2 md:-ml-4">
        <CarouselItem className="basis-1/2 pl-2 md:pl-4">
          <FeaturedItem />
        </CarouselItem>
        <CarouselItem className="basis-1/2 pl-2 md:pl-4">
          <FeaturedItem />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
