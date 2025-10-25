"use client";

import { useState, useEffect } from "react";

export default function ControlsBar() {
  const [activeView, setActiveView] = useState("grid-2");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleViewChange = (view) => {
    setActiveView(view);
    if (typeof window !== "undefined") {
      localStorage.setItem("catalogView", view);
    }
    window.dispatchEvent(new CustomEvent("viewChanged", { detail: { view } }));
  };

  const checkIsMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  // Efecto para marcar que el componente está montado en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setIsMobile(checkIsMobile());
    const savedView =
      typeof window !== "undefined"
        ? localStorage.getItem("catalogView") || "grid-2"
        : "grid-2";

    const isGrid3Hidden = isMobile && savedView === "grid-3";

    if (!isGrid3Hidden) {
      setActiveView(savedView);
      window.dispatchEvent(
        new CustomEvent("viewChanged", { detail: { view: savedView } }),
      );
    } else {
      setActiveView("grid-2");
      if (typeof window !== "undefined") {
        localStorage.setItem("catalogView", "grid-2");
      }
      window.dispatchEvent(
        new CustomEvent("viewChanged", { detail: { view: "grid-2" } }),
      );
    }

    const handleResize = () => {
      const isMobileNow = checkIsMobile();
      setIsMobile(isMobileNow);

      const currentView =
        typeof window !== "undefined"
          ? localStorage.getItem("catalogView") || "grid-2"
          : "grid-2";

      if (isMobileNow && currentView === "grid-3") {
        setActiveView("grid-2");
        if (typeof window !== "undefined") {
          localStorage.setItem("catalogView", "grid-2");
        }
        window.dispatchEvent(
          new CustomEvent("viewChanged", { detail: { view: "grid-2" } }),
        );
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, isMobile]);

  useEffect(() => {
    if (!mounted) return;

    const currentView =
      typeof window !== "undefined"
        ? localStorage.getItem("catalogView") || "grid-2"
        : "grid-2";

    if (isMobile && currentView === "grid-3") {
      setActiveView("grid-2");
      if (typeof window !== "undefined") {
        localStorage.setItem("catalogView", "grid-2");
      }
      window.dispatchEvent(
        new CustomEvent("viewChanged", { detail: { view: "grid-2" } }),
      );
    }
  }, [isMobile, mounted]);

  // Evitar renderizar hasta que esté montado en el cliente
  if (!mounted) {
    return (
      <section className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                Vista de catálogo
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-50 rounded-lg p-1">
              {/* Skeleton mientras carga */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gray-200 rounded-md animate-pulse hidden md:block"></div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Filter section - para futuras implementaciones */}
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              Vista de catálogo
            </p>
          </div>

          {/* View controls */}
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-50 rounded-lg p-1">
            {/* Grid 2x2 */}
            <button
              className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-transparent flex items-center justify-center rounded-md hover:bg-gray-200 transition-all duration-200 cursor-pointer ${
                activeView === "grid-2"
                  ? "bg-white shadow-sm opacity-100"
                  : "opacity-60 hover:opacity-90"
              }`}
              onClick={() => handleViewChange("grid-2")}
              data-view="grid-2"
              title="Vista de cuadrícula 2x2"
              aria-label="Vista de cuadrícula 2x2"
            >
              <div className="grid grid-cols-2 gap-0.5 sm:gap-1 w-4 h-4 sm:w-5 sm:h-5">
                <div
                  className={`w-full h-full rounded-sm ${activeView === "grid-2" ? "bg-gray-800" : "bg-gray-600"}`}
                ></div>
                <div
                  className={`w-full h-full rounded-sm ${activeView === "grid-2" ? "bg-gray-800" : "bg-gray-600"}`}
                ></div>
                <div
                  className={`w-full h-full rounded-sm ${activeView === "grid-2" ? "bg-gray-800" : "bg-gray-600"}`}
                ></div>
                <div
                  className={`w-full h-full rounded-sm ${activeView === "grid-2" ? "bg-gray-800" : "bg-gray-600"}`}
                ></div>
              </div>
            </button>

            {/* Grid 3x3 - Oculto en mobile */}
            <button
              className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-transparent items-center justify-center rounded-md hover:bg-gray-200 transition-all duration-200 cursor-pointer hidden md:flex ${
                activeView === "grid-3"
                  ? "bg-white shadow-sm opacity-100"
                  : "opacity-60 hover:opacity-90"
              }`}
              onClick={() => handleViewChange("grid-3")}
              data-view="grid-3"
              title="Vista de cuadrícula 3x3"
              aria-label="Vista de cuadrícula 3x3"
            >
              <div className="grid grid-cols-3 gap-0.5 sm:gap-1 w-4 h-4 sm:w-5 sm:h-5">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-full h-full rounded-sm ${activeView === "grid-3" ? "bg-gray-600" : "bg-gray-400"}`}
                  ></div>
                ))}
              </div>
            </button>

            {/* Vista de lista */}
            <button
              className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-transparent flex items-center justify-center rounded-md hover:bg-gray-200 transition-all duration-200 cursor-pointer ${
                activeView === "list"
                  ? "bg-white shadow-sm opacity-100"
                  : "opacity-60 hover:opacity-90"
              }`}
              onClick={() => handleViewChange("list")}
              data-view="list"
              title="Vista de lista"
              aria-label="Vista de lista"
            >
              <div className="flex flex-col gap-0.5 sm:gap-1 w-4 h-4 sm:w-5 sm:h-5">
                <div
                  className={`w-full h-1 rounded-sm ${activeView === "list" ? "bg-gray-600" : "bg-gray-400"}`}
                ></div>
                <div
                  className={`w-full h-1 rounded-sm ${activeView === "list" ? "bg-gray-600" : "bg-gray-400"}`}
                ></div>
                <div
                  className={`w-full h-1 rounded-sm ${activeView === "list" ? "bg-gray-600" : "bg-gray-400"}`}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
