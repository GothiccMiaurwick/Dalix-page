import ImageCard from "../components/ImageCard/ImageCard";
import Button from "../components/boton/Button";
import Carousel from "../components/carousel/Carousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <ImageCard />
        <div className="flex justify-center mt-6">
          <Button text="Nueva Colección" />
        </div>
        <div className="flex justify-center align-center mt-6">
          <Carousel />
        </div>
        <div className="flex justify-center m-6">
          <Button text="Catalogo" href="/catalogo" />
        </div>
      </main>
    </div>
  );
}