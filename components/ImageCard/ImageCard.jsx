import Image from "next/image"; 


export default function ImageCard() {
  return (
    <div>
      <Image 
        src="/img/RopaDalix11.jpg" 
        alt="Image" 
        width={500} 
        height={200} 
        quality={100}
        className="w-full h-100 object-cover" 
        priority
      />
    </div>
  );
};
