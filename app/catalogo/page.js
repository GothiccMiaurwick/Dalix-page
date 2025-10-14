"use client";

import { Divide } from "lucide-react";
import ProductCard from "../../components/ProductCard/ProductCard";
import ControlsBar from "../../components/ControlsBar/ControlsBar";
import { useState, useEffect } from "react";

export default function Catalogo() {
  const [currentView, setCurrentView] = useState("grid-2");
  
  // Datos de productos de ejemplo
  const products = [
    {
      id: 1,
      title: "CAMISETA DALIX ORIGINAL",
      price: "$45,000 COP",
      image: "/img/RopaDalix1.jpg",
      alt: "CAMISETA DALIX ORIGINAL - Prenda de vestir de la marca DALIX disponible en catálogo"
    },
    {
      id: 2,
      title: "HOODIE DALIX PREMIUM",
      price: "$95,000 COP",
      image: "/img/RopaDalix2.jpg",
      alt: "HOODIE DALIX PREMIUM - Prenda de vestir de la marca DALIX disponible en catálogo"
    },
    {
      id: 3,
      title: "CAMISETA DALIX ANIME",
      price: "$42,000 COP",
      image: "/img/RopaDalix3.jpg",
      alt: "CAMISETA DALIX ANIME - Prenda de vestir de la marca DALIX disponible en catálogo"
    },
    {
      id: 4,
      title: "SUDADERA DALIX LIMITED",
      price: "$78,000 COP",
      image: "/img/RopaDalix4.jpg",
      alt: "SUDADERA DALIX LIMITED - Prenda de vestir de la marca DALIX disponible en catálogo"
    },
    {
      id: 5,
      title: "CAMISETA DALIX VINTAGE",
      price: "$38,000 COP",
      image: "/img/RopaDalix5.jpg",
      alt: "CAMISETA DALIX VINTAGE - Prenda de vestir de la marca DALIX disponible en catálogo"
    },
    {
      id: 6,
      title: "HOODIE DALIX SPORT",
      price: "$88,000 COP",
      image: "/img/RopaDalix6.jpg",
      alt: "HOODIE DALIX SPORT - Prenda de vestir de la marca DALIX disponible en catálogo"
    }
  ];

  // Función para obtener las clases del grid basadas en la vista actual
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

  // Función para obtener las clases de la imagen basadas en la vista actual
  const getImageClasses = (view) => {
    return "w-full aspect-square object-cover object-center bg-gray-300 rounded-sm mb-4 block";
  };

  // Función para obtener las clases de la card basadas en la vista actual
  const getCardClasses = (view) => {
    const baseClasses = "bg-transparent rounded-none shadow-none flex flex-col items-center transition-transform duration-200 hover:-translate-y-0.5";
    return `${baseClasses} p-5 md:p-10`;
  };

  // Escuchar cambios de vista desde ControlsBar
  useEffect(() => {
    const handleViewChange = (event) => {
      setCurrentView(event.detail.view);
    };

    window.addEventListener('viewChanged', handleViewChange);
    
    // Cargar vista guardada al montar
    const savedView = localStorage.getItem('catalogView') || 'grid-2';
    setCurrentView(savedView);

    return () => {
      window.removeEventListener('viewChanged', handleViewChange);
    };
  }, []);

  return (
   <div>
            <ControlsBar />

     <div className="max-w-6xl bg-gray-50 rounded-xl shadow-[0_2px_8px_rgba(60,60,60,0.04)]">
      
      {/* Product Grid */}
      <div className={`catalog__grid ${getGridClasses()}`} id="catalog-grid">
        {products.map((product) => (
          <div key={product.id} className={`catalog__card ${getCardClasses(currentView)}`}>
            <a href="/buys">
              <img
                src={product.image}
                alt={product.alt}
                className={`catalog__image ${getImageClasses(currentView)}`}
              />
            </a>
            <h2 className="catalog__name text-gray-600 font-['Courier_New'] text-sm font-light mt-2 mb-1 text-center break-words whitespace-normal m-0">
              {product.title}
            </h2>
            <p className="catalog__price text-gray-500 font-['Courier_New'] text-xs font-light m-0 text-center transition-colors duration-300 ease-in-out hover:text-green-800">
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
}
