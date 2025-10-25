"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarComponent = () => {
  // Estados existentes
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("productos");

  // Estados para búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  // Referencias existentes
  const menuContentRef = useRef(null);
  const searchResultsRef = useRef(null);
  const searchInputRef = useRef(null);
  const router = useRouter();

  // Estados para animaciones
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isOverlayFading, setIsOverlayFading] = useState(false);

  // Función de búsqueda
  const performSearch = async (query) => {
    if (!query || query.trim().length === 0) {
      setSearchResults([]);
      setShowNoResults(false);
      return;
    }

    setIsSearching(true);
    setShowNoResults(false);

    try {
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("Error en la búsqueda");
      }

      const products = await response.json();
      setSearchResults(products);
      setShowNoResults(products.length === 0);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
      setShowNoResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce para búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Función para manejar cambios en el input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Función para navegar a un producto
  const handleProductClick = (slug) => {
    router.push(`/catalogo/${slug}`);
    closeSearch();
  };

  // Función para limpiar la ruta de imagen
  const cleanImagePath = (path) => {
    if (!path) return "/img/placeholder.jpg";
    return path.replace(/\s+/g, "").startsWith("/")
      ? path.replace(/\s+/g, "")
      : `/${path.replace(/\s+/g, "")}`;
  };

  // Funciones del menú móvil (sin cambios)
  const toggleMobileMenu = (e) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuClosing(false);
    setIsOverlayFading(false);
    setIsMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsMenuClosing(true);
    setIsOverlayFading(true);

    setTimeout(() => {
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsMenuClosing(false);
        setIsOverlayFading(false);
        document.body.style.overflow = "";
      }, 150);
    }, 250);
  };

  const closeMobileMenu = () => {
    closeMenu();
  };

  // Funciones de búsqueda
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
        setSearchQuery("");
        setSearchResults([]);
        setShowNoResults(false);
      }, 200);
    }
  };

  // Efecto para animación de resultados
  useEffect(() => {
    if (searchResultsRef.current && isSearchOpen) {
      setTimeout(() => {
        searchResultsRef.current.classList.add("opacity-100", "translate-y-0");
      }, 200);
    }
  }, [isSearchOpen]);

  // Efecto para tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isSearchOpen) {
          closeSearch();
        } else if (isMobileMenuOpen) {
          closeMenu();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  return (
    <>
      {/* Header */}
      <header className="w-full bg-[#e0e0e0] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 relative">
          {/* Botón de búsqueda */}
          <Link
            href="#"
            className="flex items-center justify-center xs:w-[30px] xs:h-[30px] vsm:w-[50px] vsm:h-[50px] rounded-[12%] bg-transparent relative top-2"
            onClick={toggleSearch}
            aria-label="Abrir búsqueda de productos"
          >
            <i
              className="fi fi-rs-search text-3xl text-gray-600 hover:text-gray-800 transition-colors"
              aria-hidden="true"
            ></i>
          </Link>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            <div className="relative w-[100px] h-[100px] xs:w-[70px] xs:h-[70px] ssm:w-[100px] ssm:h-[100px]">
              <Image
                src="/img/logo.png"
                alt="Logo de la marca DALIX - Empresa de ropa y prendas de vestir"
                fill
                sizes="(max-width: 480px) 70px, 100px"
                style={{ objectFit: "contain" }}
                className="transition-opacity duration-300 hover:opacity-90"
              />
            </div>
          </Link>

          {/* Botón de menú */}
          <Link
            href="#"
            id="menu-toggle"
            className="flex items-center justify-center xs:w-[30px] xs:h-[30px] vsm:w-[50px] vsm:h-[50px] rounded-[12%] bg-transparent relative top-2"
            onClick={toggleMobileMenu}
            aria-label="Abrir menú de navegación"
          >
            <i
              className="fi fi-sr-menu-burger text-3xl text-gray-600 hover:text-gray-800 transition-colors"
              aria-hidden="true"
            ></i>
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[9999] visible opacity-100"
        >
          {/* Overlay */}
          <div
            id="menu-overlay"
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer ${isOverlayFading ? "animate-fade-out" : ""}`}
            onClick={closeMenu}
          ></div>

          {/* Menu Content */}
          <div
            ref={menuContentRef}
            className={`absolute top-0 right-0 w-[300px] h-screen bg-white shadow-lg transform overflow-y-auto ${isMenuClosing ? "animate-slide-out" : "animate-slide-in"}`}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-[#333] text-xl font-semibold tracking-wider m-0">
                Menú
              </h3>
              <button
                id="menu-close"
                className="flex items-center justify-center w-10 h-10 border-none cursor-pointer transition-all hover:bg-[#345e2049] hover:rounded-full"
                onClick={closeMenu}
                aria-label="Cerrar menú de navegación"
              >
                <i
                  className="fi fi-sr-cross-small text-2xl text-gray-700 flex items-center justify-center"
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            {/* Navigation */}
            <nav className="py-4">
              <Link
                href="/"
                className="mobile-menu__link block py-4 px-8 text-[#333] no-underline font-['Courier_New'] text-xl font-medium tracking-wider border-b border-gray-100 transition-all hover:bg-gray-50 hover:text-black active:bg-gray-200"
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <Link
                href="/catalogo"
                className="mobile-menu__link block py-4 px-8 text-[#333] no-underline font-['Courier_New'] text-xl font-medium tracking-wider border-b border-gray-100 transition-all hover:bg-gray-50 hover:text-black active:bg-gray-200"
                onClick={closeMenu}
              >
                Catálogo
              </Link>
              <Link
                href="/collection"
                className="mobile-menu__link block py-4 px-8 text-[#333] no-underline font-['Courier_New'] text-xl font-medium tracking-wider border-b border-gray-100 transition-all hover:bg-gray-50 hover:text-black active:bg-gray-200"
                onClick={closeMenu}
              >
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
            ? "visible opacity-100 bg-white md:bg-white/95 md:backdrop-blur-md"
            : "invisible opacity-0 bg-transparent backdrop-blur-0"
        }`}
      >
        <div className="w-full max-w-full md:max-w-4xl md:mx-auto p-0">
          {/* Search Box */}
          <div className="flex items-center bg-white border-b border-gray-200 md:border-none rounded-none p-4 md:p-6 shadow-sm md:shadow-none transition-all duration-300 ease-in-out w-full">
            <i
              className="fi fi-rs-search text-xl md:text-2xl text-gray-600 mr-3 md:mr-4 flex-shrink-0"
              aria-hidden="true"
            ></i>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 border-none outline-none text-base md:text-lg font-medium text-gray-700 bg-transparent placeholder-gray-400"
              placeholder="BUSCAR..."
              autoComplete="off"
            />
            <button
              className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border-none bg-transparent rounded-full cursor-pointer transition-all duration-200 ease-in-out ml-2 p-2 hover:bg-gray-100 active:bg-gray-200 flex-shrink-0"
              onClick={closeSearch}
              aria-label="Cerrar búsqueda"
            >
              <i
                className="fi fi-sr-cross-small text-2xl md:text-[2.1rem] text-gray-600 transition-colors duration-200 ease-in-out hover:text-gray-700"
                aria-hidden="true"
              ></i>
            </button>
          </div>

          {/* Search Results */}
          <div
            ref={searchResultsRef}
            className="mt-0 bg-white rounded-none shadow-none overflow-hidden opacity-0 translate-y-5 transition-all duration-300 ease-in-out max-h-[calc(100vh-100px)] md:max-h-[calc(100vh-200px)] flex flex-col w-full"
          >
            {/* Search Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-3 md:py-4 px-3 md:px-4 border-none bg-transparent text-xs md:text-sm font-light cursor-pointer transition-all duration-200 ease-in-out uppercase tracking-wider h-full hover:bg-gray-100 hover:text-gray-700
                  ${
                    activeTab === "productos"
                      ? "bg-white text-gray-700 border-b-2 border-gray-600 font-medium"
                      : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("productos")}
              >
                PRODUCTOS
              </button>
              <button
                className={`flex-1 py-3 md:py-4 px-3 md:px-4 border-none bg-transparent text-xs md:text-sm font-light cursor-pointer transition-all duration-200 ease-in-out uppercase tracking-wider h-full hover:bg-gray-100 hover:text-gray-700
                  ${
                    activeTab === "colecciones"
                      ? "bg-white text-gray-700 border-b-2 border-gray-600 font-medium"
                      : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("colecciones")}
              >
                COLECCIONES
              </button>
            </div>

            {/* Search Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Productos Tab */}
              <div
                className={`p-4 md:p-6 ${activeTab === "productos" ? "block" : "hidden"}`}
              >
                {isSearching && (
                  <div className="flex items-center justify-center py-8 md:py-12">
                    <div className="flex flex-col items-center gap-3 animate-fadeIn">
                      <div className="relative">
                        <div className="w-10 h-10 md:w-12 md:h-12 border-3 border-gray-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-10 h-10 md:w-12 md:h-12 border-3 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="text-gray-500 text-sm md:text-base font-medium">
                        Buscando productos...
                      </p>
                    </div>
                  </div>
                )}

                {!isSearching && searchQuery && showNoResults && (
                  <div className="flex items-center justify-center py-8 md:py-12 animate-fadeIn">
                    <div className="text-center">
                      <div className="relative inline-block">
                        <i className="fi fi-rs-search text-4xl md:text-5xl text-gray-300 mb-3 block"></i>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <i className="fi fi-rs-cross-small text-sm text-gray-500"></i>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm md:text-base font-medium mt-4">
                        No se encontraron productos
                      </p>
                      <p className="text-gray-400 text-xs md:text-sm mt-2">
                        Intenta con otras palabras clave
                      </p>
                    </div>
                  </div>
                )}

                {!isSearching && searchResults.length > 0 && (
                  <div className="flex flex-col gap-2 md:gap-3">
                    {searchResults.map((product, index) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.slug)}
                        style={{
                          animation: `slideInUp 0.4s ease-out ${index * 0.08}s both`,
                        }}
                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 border border-transparent hover:border-gray-200 hover:shadow-sm"
                      >
                        <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
                          <Image
                            src={cleanImagePath(product.image)}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 56px, 64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm md:text-base font-medium text-gray-800 truncate">
                            {product.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
                            {product.formatted_price}
                          </p>
                        </div>
                        <i className="fi fi-rs-angle-right text-lg md:text-xl text-gray-400 transition-transform duration-200 group-hover:translate-x-1"></i>
                      </div>
                    ))}
                  </div>
                )}

                {!isSearching && !searchQuery && (
                  <div className="flex items-center justify-center py-8 md:py-12 animate-fadeIn">
                    <div className="text-center">
                      <i className="fi fi-rs-keyboard text-4xl md:text-5xl text-gray-300 mb-3 block animate-pulse"></i>
                      <p className="text-gray-400 text-sm md:text-base italic">
                        Escribe para buscar productos
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Colecciones Tab */}
              <div
                className={`p-4 md:p-6 ${activeTab === "colecciones" ? "block" : "hidden"}`}
              >
                <div className="search-collections">
                  <div className="flex items-center justify-center py-8 md:py-12 animate-fadeIn">
                    <div className="text-center">
                      <i className="fi fi-rs-box text-4xl md:text-5xl text-gray-300 mb-3 block"></i>
                      <p className="text-center text-gray-400 text-sm md:text-base italic">
                        No se encontraron colecciones
                      </p>
                      <p className="text-gray-400 text-xs md:text-sm mt-2">
                        Próximamente disponible
                      </p>
                    </div>
                  </div>
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
