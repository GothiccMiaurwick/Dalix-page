"use client";

import { useState, useEffect } from "react";

export default function ControlsBar() {
  const [activeView, setActiveView] = useState("grid-2");
  const [isMobile, setIsMobile] = useState(false);

  // Función para manejar el cambio de vista
  const handleViewChange = (view) => {
    setActiveView(view);
    
    // Guardar la vista actual en localStorage
    localStorage.setItem('catalogView', view);
    
    // Disparar evento personalizado para que otros componentes puedan escuchar
    window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view } }));
  };

  // Función para verificar si es móvil
  const checkIsMobile = () => {
    return window.innerWidth <= 480;
  };

  // Efecto para manejar el estado móvil y cargar la vista guardada
  useEffect(() => {
    // Verificar si estamos en móvil
    setIsMobile(checkIsMobile());

    // Cargar preferencia de vista guardada
    const savedView = localStorage.getItem('catalogView') || 'grid-2';
    
    // Verificar si grid-3 está oculto en móvil
    const isGrid3Hidden = isMobile && savedView === 'grid-3';
    
    if (!isGrid3Hidden) {
      setActiveView(savedView);
      // Disparar evento para aplicar la vista
      window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: savedView } }));
    } else {
      // Si grid-3 está seleccionado pero oculto en móvil, usar grid-2 por defecto
      setActiveView('grid-2');
      localStorage.setItem('catalogView', 'grid-2');
      window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: 'grid-2' } }));
    }

    // Manejar redimensionamiento de ventana
    const handleResize = () => {
      const isMobileNow = checkIsMobile();
      setIsMobile(isMobileNow);
      
      const currentView = localStorage.getItem('catalogView') || 'grid-2';
      
      if (isMobileNow && currentView === 'grid-3') {
        // Cambiar a grid-2 si actualmente está en grid-3 y se cambia a móvil
        setActiveView('grid-2');
        localStorage.setItem('catalogView', 'grid-2');
        window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: 'grid-2' } }));
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Efecto para actualizar el estado móvil cuando cambie
  useEffect(() => {
    const currentView = localStorage.getItem('catalogView') || 'grid-2';
    
    if (isMobile && currentView === 'grid-3') {
      setActiveView('grid-2');
      localStorage.setItem('catalogView', 'grid-2');
      window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: 'grid-2' } }));
    }
  }, [isMobile]);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Filter section - empty for now */}
          <div className="flex-1"></div>
          
          {/* View controls */}
          <div className="flex items-center space-x-1">
            <button
              className={`w-8 h-8 bg-transparent flex items-center justify-center hover:opacity-80 transition-all duration-200 cursor-pointer ${
                activeView === "grid-2" ? "controls-bar__view-btn--active opacity-100" : "opacity-70 hover:opacity-90"
              }`}
              onClick={() => handleViewChange("grid-2")}
              data-view="grid-2"
              title="Vista de cuadrícula 2x2">
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <div className={`w-full h-full ${activeView === "grid-2" ? "bg-gray-800" : "bg-gray-600"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-2" ? "bg-gray-800" : "bg-gray-600"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-2" ? "bg-gray-800" : "bg-gray-600"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-2" ? "bg-gray-800" : "bg-gray-600"}`}></div>
              </div>
            </button>
            
            <button
              className={`w-8 h-8 bg-transparent flex items-center justify-center hover:opacity-80 transition-all duration-200 cursor-pointer sm:hidden ${
                activeView === "grid-3" ? "controls-bar__view-btn--active opacity-100" : "opacity-70 hover:opacity-90"
              }`}
              onClick={() => handleViewChange("grid-3")}
              data-view="grid-3"
              title="Vista de cuadrícula 3x3">
              <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
                <div className={`w-full h-full ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}></div>
                <div className={`w-full h-full ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}></div>
              </div>
            </button>
            
            <button
              className={`w-8 h-8 bg-transparent flex items-center justify-center hover:opacity-80 transition-all duration-200 cursor-pointer ${
                activeView === "list" ? "controls-bar__view-btn--active opacity-100" : "opacity-70 hover:opacity-90"
              }`}
              onClick={() => handleViewChange("list")}
              data-view="list"
              title="Vista de lista">
              <div className={`w-4 h-4 ${activeView === "list" ? "bg-gray-600" : "bg-gray-400"}`}></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
