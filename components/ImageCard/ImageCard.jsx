import Image from "next/image";

export default function ImageCard() {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
      <Image
        src="/img/RopaDalix11.webp"
        alt="Dalix Fashion Hero - Más que ropa, es una historia que vistes"
        fill
        quality={85}
        className="object-cover object-center"
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20 sm:from-black/60 sm:via-black/40 sm:to-transparent" />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Main title */}
        <h1 className="text-white font-serif text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-3 sm:mb-4 md:mb-6 tracking-wide italic animate-fadeIn">
          Dalix
        </h1>

        {/* Subtitle */}
        <p
          className="text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-mono tracking-wider sm:tracking-widest uppercase max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl leading-relaxed px-4 animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          MAS QUE ROPA, ES UNA HISTORIA QUE VISTES
        </p>
      </div>
    </div>
  );
}