import Button from "../components/boton/Button";
import Carousel from "../components/carousel/Carousel";
import ImageCard from "../components/ImageCard/ImageCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <ImageCard />

        {/* Nueva Colección Button */}
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 px-4">
          <Button text="Nueva Colección" href="/collection" />
        </div>

        {/* Carousel Section */}
        <div className="flex justify-center items-center mt-6 sm:mt-8 md:mt-10">
          <Carousel />
        </div>

        {/* Catálogo Button */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-4">
          <Button text="Ver Catálogo" href="/catalogo" />
        </div>

        {/* Features Section - Nuevo */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {/* Feature 1 */}
              <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="fi fi-rs-truck-side text-2xl text-gray-700"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  Envíos Rápidos
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Entrega en tiempo récord a todo el país
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="fi fi-rs-shield-check text-2xl text-gray-700"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  Calidad Garantizada
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Productos de la más alta calidad
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors sm:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="fi fi-brands-whatsapp text-2xl text-gray-700"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  Atención Personalizada
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Compra fácil por WhatsApp
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
