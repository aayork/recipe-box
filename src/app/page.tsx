import { Item } from "./components/item";
import { CarouselItems } from "./components/carousel-items";

export default function Home() {
  return (
    <div className="min-h-screen p-4 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h2 className="font-bold text-xl mt-2">Featured</h2>
        <CarouselItems />
        <h2 className="font-bold text-xl mt-2">Trending</h2>
        <Item />
      </div>
    </div>
  );
}
