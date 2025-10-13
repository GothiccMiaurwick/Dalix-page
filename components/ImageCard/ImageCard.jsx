import Image from "next/image"; 

export default function ImageCard() {
  return (
    <div className="relative w-full h-screen min-h-[500px] overflow-hidden">
      <Image 
        src="/img/RopaDalix11.jpg" 
        alt="Dalix Fashion Hero" 
        width={1920} 
        height={1080} 
        quality={100}
        className="w-full h-full object-cover" 
        priority
      />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      
      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-8">
        {/* Main title */}
        <h1 className="text-white font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-wide">
          Dalix
        </h1>
        
        {/* Subtitle */}
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-mono tracking-widest uppercase max-w-2xl leading-relaxed">
          MAS QUE ROPA, ES UNA HISTORIA QUE VISTES
        </p>
      </div>
    </div>
  );
};
