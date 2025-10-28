"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductView({ product }) {
  if (!product) {
    return null;
  }

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [activeSize, setActiveSize] = useState("M");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleSizeClick = (size) => {
    setActiveSize(size);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  return (
    <section className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        {/* Columna de Imágenes */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Imagen principal con ZOOM */}
          <div 
            className="w-full aspect-square relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={mainImage}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 ease-out"
              style={{
                transform: isZooming ? `scale(1.5)` : 'scale(1)',
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              priority
            />
          </div>

          {/* Galería de miniaturas */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  mainImage === image
                    ? "border-gray-800 shadow-md"
                    : "border-gray-300 hover:border-gray-500"
                }`}
                onClick={() => handleThumbnailClick(image)}
              >
                <Image
                  src={image}
                  alt={`Vista ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Columna de Información del Producto */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* Título y Precio */}
          <div>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {product.title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-semibold">
              {product.formatted_price}
            </p>
          </div>

          {/* Descripción */}
          {product.description && (
            <div className="py-3 sm:py-4 border-y border-gray-200">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Selección de Talla - SIN HOVER */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Selecciona tu talla:
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 border-2 rounded-lg font-medium text-sm sm:text-base md:text-lg transition-all duration-200 ${
                    activeSize === size
                      ? "bg-gray-800 text-white border-gray-800 shadow-md transform scale-105"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Tabla de Tallas */}
          <div className="mt-4 sm:mt-6 overflow-x-auto">
            <table className="w-full text-xs sm:text-sm md:text-base text-left text-gray-600 border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <caption className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-left px-2">
                Guía de tallas (cm)
              </caption>
              <thead className="text-xs sm:text-sm md:text-base text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200 font-semibold">
                    Talla
                  </th>
                  <th className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200 font-semibold">
                    S
                  </th>
                  <th className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200 font-semibold">
                    M
                  </th>
                  <th className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200 font-semibold">
                    L
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-medium border border-gray-200">
                    Hombro
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200">
                    31
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200">
                    32
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200">
                    33.5
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-medium border border-gray-200">
                    Pecho
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200">
                    71
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200">
                    75
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-gray-200">
                    81
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Botones de Compra */}
          <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4 sticky bottom-4 sm:relative sm:bottom-0">
            <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 md:py-5 bg-[#25D366] text-white font-semibold text-sm sm:text-base md:text-lg rounded-lg shadow-lg hover:bg-[#128C7E] active:scale-95 transition-all duration-300">
              <i className="fi fi-brands-whatsapp text-xl sm:text-2xl"></i>
              COMPRAR POR WHATSAPP
            </button>

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <i className="fi fi-rs-info text-blue-600 text-lg sm:text-xl flex-shrink-0 mt-0.5"></i>
                <div className="text-xs sm:text-sm md:text-base text-gray-700">
                  <p className="font-medium mb-1">Envío disponible</p>
                  <p className="text-gray-600">
                    Consulta disponibilidad y costos por WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}