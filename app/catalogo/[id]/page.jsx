"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Datos simulados de un producto. En una aplicación real, esto vendría de una API.
const productData = {
  id: 1,
  name: "Camiseta DALIX Original",
  price: "45.000 COP",
  description: "Camiseta de alta calidad con diseño exclusivo DALIX. Material suave y cómodo, disponible en múltiples tallas y colores.",
  images: [
    "/img/RopaDalix1.jpg",
    "/img/RopaDalix2.jpg",
    "/img/RopaDalix3.jpg",
    "/img/RopaDalix4.jpg",
    "/img/RopaDalix5.jpg",
  ],
  sizes: ["S", "M", "L", "XL"],
};

export default function ProductPage({ params }) {
  const { productId } = params;
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [activeSize, setActiveSize] = useState("M");

  // En una aplicación real, aquí harías una llamada a tu API para obtener los datos del producto
  // usando el productId. Por ahora, usamos los datos simulados.
  useEffect(() => {
    setProduct(productData);
    setMainImage(productData.images[0]);
  }, [productId]);

  if (!product) {
    return <div>Cargando producto...</div>;
  }

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleSizeClick = (size) => {
    setActiveSize(size);
  };

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-16 px-4 sm:px-8 py-12">
        {/* Columna de Imágenes */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-auto aspect-square relative overflow-hidden rounded-lg shadow-md">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Galería de miniaturas */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                  mainImage === image ? "border-gray-800" : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(image)}
              >
                <Image
                  src={image}
                  alt={`Vista ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Columna de Información del Producto */}
        <div className="flex flex-col gap-4 pt-4">
          <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Lora', serif" }}>
            {product.name}
          </h1>
          <p className="text-2xl text-gray-800">{product.price}</p>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Selección de Talla */}
          <div className="flex flex-col gap-3 mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Talla:</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`px-4 py-2 border rounded-md transition-colors duration-200 ${
                    activeSize === size
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Tabla de Tallas */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 border-collapse">
              <caption className="text-lg font-semibold text-gray-800 mb-2 text-left">
                <strong>Tabla de Tallas</strong>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border border-gray-200">Talla</th>
                  <th className="px-4 py-2 border border-gray-200">XS</th>
                  <th className="px-4 py-2 border border-gray-200">S</th>
                  <th className="px-4 py-2 border border-gray-200">M</th>
                  <th className="px-4 py-2 border border-gray-200">L</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium border border-gray-200">Hombro</td>
                  <td className="px-4 py-2 border border-gray-200">30</td>
                  <td className="px-4 py-2 border border-gray-200">31</td>
                  <td className="px-4 py-2 border border-gray-200">32</td>
                  <td className="px-4 py-2 border border-gray-200">33.5</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium border border-gray-200">Pecho</td>
                  <td className="px-4 py-2 border border-gray-200">67</td>
                  <td className="px-4 py-2 border border-gray-200">71</td>
                  <td className="px-4 py-2 border border-gray-200">75</td>
                  <td className="px-4 py-2 border border-gray-200">81</td>
                </tr>
                {/* Agrega el resto de las filas aquí si es necesario */}
              </tbody>
            </table>
          </div>

          {/* Botones de Compra */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg shadow-md hover:bg-[#128C7E] transition-colors duration-300"
            >
              <i className="fi fi-brands-whatsapp text-xl"></i>
              COMPRAR POR WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
