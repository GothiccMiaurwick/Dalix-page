"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";
import Image from "next/image";

export default function CarouselComponent() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="w-full max-w-4xl mx-auto justify-items-center vsm:w-2/3 ssm:w-2/3 sm:w-2/4 smd:w-2/3 md:w-1/3 lg:w-1/4">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="xs:w-1/2 vsm:w-2/3 ssm:w-2/3 sm:w-2/4 smd:w-2/3 md:w-1/3 lg:w-1/4"
      >
        <CarouselContent>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="overflow-hidden rounded-lg">
                  <Image 
                    src={`/img/RopaDalix${item}.jpg`}
                    alt={`Imagen de carrusel ${index + 1}`}
                    width={900}
                    height={900}
                    quality={100}
                    className="w-full h-auto object-cover aspect-[2/3]"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

        <div className="flex justify-center items-center uppercase">
          <h1 className=" xs:text-s vsm:text-lg ssm:text-xl smd:text-2xl font-bold p-3">NUESTRA NUEVA COLECCION.</h1>
        </div>
    </div>
  );
}
