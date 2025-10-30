"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function CarouselComponent() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  // Array de imágenes para mejor control
  const images = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: `/img/RopaDalix${i + 1}.webp`,
    alt: `Colección Dalix - Imagen ${i + 1}`,
  }));

  return (
    <div className="w-full overflow-hidden py-6 sm:py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
            {images.map((image, index) => (
              <CarouselItem
                key={`carousel-${image.id}`}
                className="pl-2 sm:pl-3 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={900}
                      quality={75}
                      loading={index < 4 ? "eager" : "lazy"}
                      className="w-full h-auto object-cover aspect-[2/3] hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIFBv/EACQQAAEDAwMEAwAAAAAAAAAAAAECAwQABREGEiExE0FRYRQVcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAERAv/aAAwDAQACEQMRAD8A1tp0dZbTZk2y1WmBbYKFqWiNGaS0kqUSTwkAcmpb3h2AqVMuC7PGdlukGQ6pCCVnJJz7pJ5xS/t7t/F/dTLrpWz3SU/cJMJpx5xPqEqSTgHgVKotp/kMRY6UsoU00kJQlOwADGABRQf/2Q=="
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Botones de navegación - ocultos en mobile y tablet */}
          <div className="hidden lg:block">
            <CarouselPrevious className="left-2 lg:left-4 xl:-left-12" />
            <CarouselNext className="right-2 lg:right-4 xl:-right-12" />
          </div>
        </Carousel>

        {/* Título */}
        <div className="flex justify-center items-center mt-6 sm:mt-8 md:mt-10">
          <h2 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide text-center">
            Nuestra Nueva Colección
          </h2>
        </div>
      </div>
    </div>
  );
}