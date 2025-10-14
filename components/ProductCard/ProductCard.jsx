import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ 
  title, 
  price, 
  image, 
  alt,
  href = "/buys"
}) {
  return (
    <div className="bg-transparent rounded-none shadow-none flex flex-col items-center py-8 px-6 transition-transform duration-200 hover:-translate-y-0.5">
      <Link href={href}>
        <Image
          src={image}
          alt={alt}
          width={350}
          height={350}
          className="w-[350px] h-[350px] object-cover object-center bg-gray-300 rounded-sm mb-3 block"
        />
      </Link>
      <h2 className="text-gray-600 font-['Courier_New'] text-sm font-light mt-2 mb-1 text-center break-words whitespace-normal m-0">
        {title}
      </h2>
      <p className="text-gray-500 font-['Courier_New'] text-xs font-light m-0 text-center transition-colors duration-300 ease-in-out hover:text-green-800">
        {price}
      </p>
    </div>
  );
}
