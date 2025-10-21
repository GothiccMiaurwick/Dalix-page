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

  // Fetch de productos desde la API
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

  // Escuchar cambios de vista desde ControlsBar
  useEffect(() => {
    const handleViewChange = (event) => {
      setCurrentView(event.detail.view);
    };

    window.addEventListener("viewChanged", handleViewChange);

    // Cargar vista guardada al montar
    const savedView = localStorage.getItem("catalogView") || "grid-2";
    setCurrentView(savedView);

    return () => {
      window.removeEventListener("viewChanged", handleViewChange);
    };
  }, []);

  // Función para limpiar la ruta de imagen
  const cleanImagePath = (path) => {
    if (!path) return "/img/placeholder.jpg";
    // Eliminar espacios y asegurar que comience con /
    return path.replace(/\s+/g, "").startsWith("/")
      ? path.replace(/\s+/g, "")
      : `/${path.replace(/\s+/g, "")}`;
  };

  const getGridClasses = () => {
    const baseClasses = "grid";

    switch (currentView) {
      case "grid-2":
        return `${baseClasses} grid-cols-2 gap-0`;
      case "grid-3":
        return `${baseClasses} grid-cols-3 gap-0`;
      case "list":
        return `${baseClasses} grid-cols-1 gap-1`;
      default:
        return `${baseClasses} grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-0`;
    }
  };

  const getImageClasses = (view) => {
    return "w-full aspect-square object-cover object-center bg-gray-300 rounded-sm mb-4 block";
  };

  const getCardClasses = (view) => {
    const baseClasses =
      "bg-transparent rounded-none shadow-none flex flex-col items-center transition-transform duration-200 hover:-translate-y-0.5";
    return `${baseClasses} p-5 md:p-10`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <ControlsBar />

      <div className="max-w-6xl bg-gray-50 rounded-xl shadow-[0_2px_8px_rgba(60,60,60,0.04)]">
        <div className={`catalog__grid ${getGridClasses()}`} id="catalog-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`catalog__card ${getCardClasses(currentView)}`}
            >
              <Link href={`/catalogo/${product.slug}`}>
                <Image
                  src={cleanImagePath(product.image)}
                  alt={product.title}
                  width={400}
                  height={400}
                  className={`catalog__image ${getImageClasses(currentView)}`}
                  priority={false}
                  unoptimized={false}
                />
              </Link>
              <h2 className="catalog__name text-gray-600 font-['Courier_New'] text-sm font-light mt-2 mb-1 text-center break-words whitespace-normal m-0">
                {product.title}
              </h2>
              <p className="catalog__price text-gray-500 font-['Courier_New'] text-xs font-light m-0 text-center transition-colors duration-300 ease-in-out hover:text-green-800">
                {product.formatted_price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
