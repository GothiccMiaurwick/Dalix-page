"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const NavbarComponent = () => {
  // Estados para controlar la visibilidad de menús
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("productos");

  // Referencias para manejar animaciones
  const menuContentRef = useRef(null);
  const searchResultsRef = useRef(null);
  const searchInputRef = useRef(null);

  // Manejadores de eventos para el menú móvil
  const toggleMobileMenu = (e) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Estados para controlar las animaciones
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isOverlayFading, setIsOverlayFading] = useState(false);

  // Function to open the menu (basado en script.js línea 170-174)
  const openMenu = () => {
    setIsMenuClosing(false);
    setIsOverlayFading(false);
    setIsMobileMenuOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  };

  // Function to close the menu (basado en script.js línea 176-180)
  const closeMenu = () => {
    // Primero activamos la animación de salida
    setIsMenuClosing(true);
    setIsOverlayFading(true);
    
    // El overlay desaparece más rápido que el menú
    setTimeout(() => {
      // Después de que termine la animación, cerramos el menú
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsMenuClosing(false);
        setIsOverlayFading(false);
        document.body.style.overflow = ''; // Restore scrolling
      }, 150); // Tiempo adicional para que termine la animación del menú
    }, 250); // Este tiempo coincide con la duración de la animación del overlay
  };

  const closeMobileMenu = () => {
    closeMenu();
  };

  // Manejadores de eventos para la búsqueda
  const toggleSearch = (e) => {
    e.preventDefault();
    setIsSearchOpen(!isSearchOpen);

    if (!isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  };

  const closeSearch = () => {
    if (searchResultsRef.current) {
      searchResultsRef.current.classList.remove("opacity-100", "translate-y-0");
      setTimeout(() => {
        setIsSearchOpen(false);
      }, 200);
    }
  };

  // Efecto para monitorear cambios en isMobileMenuOpen y isMenuClosing
  useEffect(() => {
    console.log("Estado del menú:", isMobileMenuOpen, "Cerrando:", isMenuClosing);
  }, [isMobileMenuOpen, isMenuClosing]);

  // Efecto para manejar la animación de los resultados de búsqueda
  useEffect(() => {
    if (searchResultsRef.current && isSearchOpen) {
      setTimeout(() => {
        searchResultsRef.current.classList.add("opacity-100", "translate-y-0");
      }, 200);
    }
  }, [isSearchOpen]);
  
  // Efecto para manejar la tecla Escape (basado en script.js línea 505-514)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) {
          closeSearch();
        } else if (isMobileMenuOpen) {
          closeMenu();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  return (
    <>
      {/* Header */}
      <header className="w-full bg-[#e0e0e0] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 relative">
          {/* Botón de búsqueda */}
          <a
            href="#"
            className="flex items-center justify-center w-[50px] h-[50px] rounded-[12%] bg-transparent relative top-2"
            onClick={toggleSearch}
            aria-label="Abrir búsqueda de productos">
            <i
              className="fi fi-rs-search text-3xl text-gray-600 hover:text-gray-800 transition-colors"
              aria-hidden="true"></i>
          </a>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 rounded-lg transition-all hover:bg-black/5">
            <Image
              src="/img/logo.png"
              alt="Logo de la marca DALIX - Empresa de ropa y prendas de vestir"
              width={100}
              height={100}
              className="h-[60px] w-auto transition-opacity hover:opacity-80"
            />
          </Link>

          {/* Botón de menú */}
          <a
            href="#"
            id="menu-toggle"
            className="flex items-center justify-center w-[50px] h-[50px] rounded-[12%] bg-transparent relative top-2"
            onClick={toggleMobileMenu}
            aria-label="Abrir menú de navegación">
            <i
              className="fi fi-sr-menu-burger text-3xl text-gray-600 hover:text-gray-800 transition-colors"
              aria-hidden="true"></i>
          </a>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[9999] visible opacity-100">
          {/* Overlay (basado en script.js línea 377-382) */}
          <div 
            id="menu-overlay"
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer ${isOverlayFading ? 'animate-fade-out' : ''}`}
            onClick={closeMenu}
          ></div>

          {/* Menu Content */}
          <div
            ref={menuContentRef}
            className={`absolute top-0 right-0 w-[300px] h-screen bg-white shadow-lg transform overflow-y-auto ${isMenuClosing ? 'animate-slide-out' : 'animate-slide-in'}`}>
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-[#333] text-xl font-semibold tracking-wider m-0">Menú</h3>
              <button
                id="menu-close"
                className="flex items-center justify-center w-10 h-10 border-none cursor-pointer transition-all hover:bg-[#345e2049] hover:rounded-full"
                onClick={closeMenu}
                aria-label="Cerrar menú de navegación">
                <i
                  className="fi fi-sr-cross-small text-2xl text-gray-700 flex items-center justify-center"
                  aria-hidden="true"></i>
              </button>
            </div>

            {/* Navigation */}
            <nav className="py-4">
              <Link
                href="/"
                className="mobile-menu__link block py-4 px-8 text-[#333] no-underline font-['Courier_New'] text-xl font-medium tracking-wider border-b border-gray-100 transition-all hover:bg-gray-50 hover:text-black active:bg-gray-200"
                onClick={closeMenu}>
                Inicio
              </Link>
              <Link
                href="/catalog"
                className="mobile-menu__link block py-4 px-8 text-[#333] no-underline font-['Courier_New'] text-xl font-medium tracking-wider border-b border-gray-100 transition-all hover:bg-gray-50 hover:text-black active:bg-gray-200"
                onClick={closeMenu}>
                Catálogo
              </Link>
              <Link
                href="/collection"
                className="mobile-menu__link block py-4 px-8 text-[#333] no-underline font-['Courier_New'] text-xl font-medium tracking-wider border-b border-gray-100 transition-all hover:bg-gray-50 hover:text-black active:bg-gray-200"
                onClick={closeMenu}>
                Colección
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      <div
        className={`fixed inset-0 z-[10000] flex flex-col items-stretch justify-start pt-0 transition-all duration-300 ease-in-out 
        ${
          isSearchOpen
            ? "visible opacity-100 bg-white/95 backdrop-blur-md"
            : "invisible opacity-0 bg-transparent backdrop-blur-0"
        }`}>
        <div className="w-full max-w-full p-0">
          {/* Search Box */}
          <div className="flex items-center bg-white border-none rounded-none p-6 shadow-none transition-all duration-300 ease-in-out w-full">
            <i className="fi fi-rs-search text-2xl text-gray-600 mr-4" aria-hidden="true"></i>
            <input
              ref={searchInputRef}
              type="text"
              className="flex-1 border-none outline-none text-lg font-medium text-gray-700 bg-transparent placeholder-gray-400"
              placeholder="BUSCAR..."
              autoComplete="off"
            />
            <button
              className="flex items-center justify-center w-auto h-auto border-none bg-transparent rounded-none cursor-pointer transition-all duration-200 ease-in-out ml-2 p-2 hover:scale-110"
              onClick={closeSearch}
              aria-label="Cerrar búsqueda">
              <i
                className="fi fi-sr-cross-small text-[2.1rem] text-gray-600 transition-colors duration-200 ease-in-out hover:text-gray-700"
                aria-hidden="true"></i>
            </button>
          </div>

          {/* Search Results */}
          <div
            ref={searchResultsRef}
            className="mt-0 bg-white rounded-none shadow-none overflow-hidden opacity-0 translate-y-5 transition-all duration-300 ease-in-out max-h-[calc(100vh-200px)] flex flex-col w-full">
            {/* Search Tabs */}
            <div className="flex">
              <button
                className={`flex-1 py-4 px-4 border-none bg-transparent text-sm font-light cursor-pointer transition-all duration-200 ease-in-out uppercase tracking-wider h-full hover:bg-gray-100 hover:text-gray-700
                  ${
                    activeTab === "productos"
                      ? "bg-white text-gray-700 border-b-2 border-gray-600 font-light"
                      : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("productos")}>
                PRODUCTOS
              </button>
              <button
                className={`flex-1 py-4 px-4 border-none bg-transparent text-sm font-light cursor-pointer transition-all duration-200 ease-in-out uppercase tracking-wider h-full hover:bg-gray-100 hover:text-gray-700
                  ${
                    activeTab === "colecciones"
                      ? "bg-white text-gray-700 border-b-2 border-gray-600 font-light"
                      : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("colecciones")}>
                COLECCIONES
              </button>
            </div>

            {/* Search Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Productos Tab */}
              <div className={`p-6 ${activeTab === "productos" ? "block" : "hidden"}`}>
                <div className="flex flex-col gap-4">
                  {/* Los productos se llenarán dinámicamente */}
                  {/* Aquí puedes mapear un array de productos */}
                </div>
              </div>

              {/* Colecciones Tab */}
              <div className={`p-6 ${activeTab === "colecciones" ? "block" : "hidden"}`}>
                <div className="search-collections">
                  <p className="text-center text-gray-400 italic my-8">No se encontraron colecciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
