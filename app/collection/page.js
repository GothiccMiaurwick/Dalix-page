"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CollectionPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", errorText);
          throw new Error(`Error al cargar productos: ${response.status}`);
        }

        const data = await response.json();
        console.log("Products loaded:", data.length);
        setProducts(data);
      } catch (err) {
        console.error("Error completo:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const cleanImagePath = (path) => {
    if (!path) return "/img/placeholder.jpg";
    return path.replace(/\s+/g, "").startsWith("/")
      ? path.replace(/\s+/g, "")
      : `/${path.replace(/\s+/g, "")}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Cargando colección...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <p className="text-lg sm:text-xl md:text-2xl text-red-600">
            Error: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/RopaDalix1.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 font-serif italic">
            Nueva Colección
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl font-mono">
            DESCUBRE LAS ÚLTIMAS TENDENCIAS
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Todos los Productos
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            {products.length} productos disponibles
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {products.map((product, index) => (
            <Link
              href={`/catalogo/${product.slug}`}
              key={product.id}
              style={{
                animation: `slideInUp 0.4s ease-out ${index * 0.05}s both`,
              }}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={cleanImagePath(product.image)}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>

                  {/* Badge "Nuevo" */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full">
                    NUEVO
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2 group-hover:text-gray-900 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                    {product.formatted_price}
                  </p>

                  {/* CTA Button */}
                  <button className="mt-3 sm:mt-4 w-full bg-gray-800 text-white py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-900">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-16 sm:py-20 md:py-24">
            <i className="fi fi-rs-box text-5xl sm:text-6xl md:text-7xl text-gray-300 mb-6"></i>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500">
              Aún no hay productos en esta colección
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-12 sm:py-16 md:py-20 mt-12 sm:mt-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            ¿Te gustó algo?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300">
            Contáctanos por WhatsApp para más información
          </p>
          <a
            href="https://wa.me/57800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-semibold text-base sm:text-lg rounded-lg hover:bg-[#128C7E] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <i className="fi fi-brands-whatsapp text-2xl"></i>
            CONTACTAR POR WHATSAPP
          </a>
        </div>
      </section>
    </div>
  );
}
