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
    <div className="catalog__card w-full bg-transparent rounded-none shadow-none flex flex-col items-stretch p-0 m-0 transition-transform duration-200 hover:-translate-y-0.5">
      <Link href={href} className="block w-full">
        <div className="w-full aspect-square bg-gray-300 rounded-sm mb-2 overflow-hidden">
          <Image
            src={image}
            alt={alt}
            width={500}
            height={500}
            className="w-full h-full object-cover object-center block"
          />
        </div>
      </Link>
      <h2 className="catalog__name text-gray-600 font-['Courier_New'] text-sm font-light mt-1 mb-1 text-center break-words whitespace-normal m-0 w-full">
        {title}
      </h2>
      <p className="catalog__price text-gray-500 font-['Courier_New'] text-xs font-light m-0 text-center transition-colors duration-300 ease-in-out hover:text-green-800 w-full">
        {price}
      </p>
    </div>
  );
}
