"use client";

import ControlsBar from "../../components/ControlsBar/ControlsBar";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Catalogo() {
  const [currentView, setCurrentView] = useState("grid-2");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Error al cargar productos");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleViewChange = (event) => {
      setCurrentView(event.detail.view);
    };

    window.addEventListener("viewChanged", handleViewChange);

    // Solo acceder a localStorage en el cliente
    if (typeof window !== "undefined") {
      const savedView = localStorage.getItem("catalogView") || "grid-2";
      setCurrentView(savedView);
    }

    return () => {
      window.removeEventListener("viewChanged", handleViewChange);
    };
  }, []);

  const cleanImagePath = (path) => {
    if (!path) return "/img/placeholder.jpg";
    return path.replace(/\s+/g, "").startsWith("/")
      ? path.replace(/\s+/g, "")
      : `/${path.replace(/\s+/g, "")}`;
  };

  const getGridClasses = () => {
    const baseClasses = "grid w-full";

    switch (currentView) {
      case "grid-2":
        return `${baseClasses} grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5`;
      case "grid-3":
        return `${baseClasses} grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4`;
      case "list":
        return `${baseClasses} grid-cols-1 gap-3 sm:gap-4`;
      default:
        return `${baseClasses} grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5`;
    }
  };

  const getCardClasses = (view) => {
    const baseClasses =
      "bg-white rounded-lg shadow-sm hover:shadow-md flex flex-col items-center transition-all duration-300 hover:-translate-y-1 overflow-hidden";

    if (view === "list") {
      return `${baseClasses} flex-row p-3 sm:p-4 md:p-5`;
    }

    return `${baseClasses} p-3 sm:p-4 md:p-5`;
  };

  const getImageClasses = (view) => {
    if (view === "list") {
      return "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-md flex-shrink-0";
    }
    return "w-full aspect-square object-cover object-center rounded-md mb-3 sm:mb-4 hover:scale-105 transition-transform duration-300";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Cargando productos...
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
      <ControlsBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
        <div className={`catalog__grid ${getGridClasses()}`} id="catalog-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`catalog__card ${getCardClasses(currentView)}`}
            >
              <Link
                href={`/catalogo/${product.slug}`}
                className={currentView === "list" ? "flex-shrink-0" : "w-full"}
              >
                <Image
                  src={cleanImagePath(product.image)}
                  alt={product.title}
                  width={currentView === "list" ? 160 : 400}
                  height={currentView === "list" ? 160 : 400}
                  className={`catalog__image ${getImageClasses(currentView)}`}
                  priority={false}
                />
              </Link>

              <div
                className={`flex flex-col ${currentView === "list" ? "flex-1 ml-4 sm:ml-6 justify-center" : "w-full text-center"}`}
              >
                <Link href={`/catalogo/${product.slug}`}>
                  <h2
                    className={`text-gray-700 font-medium hover:text-gray-900 transition-colors ${
                      currentView === "list"
                        ? "text-base sm:text-lg md:text-xl mb-2 text-left"
                        : "text-xs sm:text-sm md:text-base mb-1 sm:mb-2"
                    }`}
                  >
                    {product.title}
                  </h2>
                </Link>
                <p
                  className={`text-gray-600 font-semibold ${
                    currentView === "list"
                      ? "text-lg sm:text-xl md:text-2xl text-left"
                      : "text-xs sm:text-sm md:text-base"
                  }`}
                >
                  {product.formatted_price}
                </p>

                {currentView === "list" && product.description && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 hidden sm:block">
                    {product.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <p className="text-base sm:text-lg md:text-xl text-gray-500">
              No hay productos disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
