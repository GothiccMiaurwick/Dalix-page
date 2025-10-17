import { generateSlug } from "@/lib/utils";
 
console.log(generateSlug("CAMISETA DALIX ORIGINAL"));

// Array de productos de DALIX
export const products = [
  {
    id: 1,
    title: "CAMISETA DALIX ORIGINAL",
    slug: generateSlug("CAMISETA DALIX ORIGINAL"),
    price: 45000,
    formattedPrice: "$45,000 COP",
    image: "/img/RopaDalix1.jpg",
    images: [
      "/img/RopaDalix1.jpg",
      "/img/RopaDalix2.jpg",
      "/img/RopaDalix3.jpg",
    ],
    description:
      "Camiseta de alta calidad con diseño exclusivo DALIX. Material suave y cómodo, disponible en múltiples sizes.",
    sizes: ["S", "M", "L", "XL"],
    category: "camisetas",
  },
  {
    id: 2,
    title: "HOODIE DALIX PREMIUM",
    slug: generateSlug("HOODIE DALIX PREMIUM"),
    price: 95000,
    formattedPrice: "$95,000 COP",
    image: "/img/RopaDalix2.jpg",
    images: [
      "/img/RopaDalix2.jpg",
      "/img/RopaDalix1.jpg",
      "/img/RopaDalix3.jpg",
    ],
    description:
      "Hoodie premium con diseño urbano y materiales de primera calidad. Perfecto para cualquier ocasión.",
    sizes: ["S", "M", "L", "XL"],
    category: "hoodies",
  },
  {
    id: 3,
    title: "CAMISETA DALIX ANIME",
    slug: generateSlug("CAMISETA DALIX ANIME"),
    price: 42000,
    formattedPrice: "$42,000 COP",
    image: "/img/RopaDalix3.jpg",
    images: [
      "/img/RopaDalix3.jpg",
      "/img/RopaDalix1.jpg",
      "/img/RopaDalix2.jpg",
    ],
    description:
      "Diseño inspirado en la cultura anime con estampados únicos y vibrantes. Edición limitada.",
    sizes: ["S", "M", "L", "XL"],
    category: "camisetas",
  },
  {
    id: 4,
    title: "SUDADERA DALIX LIMITED",
    slug: generateSlug("SUDADERA DALIX LIMITED"),
    price: 78000,
    formattedPrice: "$78,000 COP",
    image: "/img/RopaDalix4.jpg",
    images: [
      "/img/RopaDalix4.jpg",
      "/img/RopaDalix5.jpg",
      "/img/RopaDalix6.jpg",
    ],
    description:
      "Sudadera de edición limitada con diseño exclusivo. Comodidad y estilo en una sola prenda.",
    sizes: ["S", "M", "L", "XL"],
    category: "sudaderas",
  },
  {
    id: 5,
    title: "CAMISETA DALIX VINTAGE",
    slug: generateSlug("CAMISETA DALIX VINTAGE"),
    price: 38000,
    formattedPrice: "$38,000 COP",
    image: "/img/RopaDalix5.jpg",
    images: [
      "/img/RopaDalix5.jpg",
      "/img/RopaDalix4.jpg",
      "/img/RopaDalix6.jpg",
    ],
    description:
      "Estilo vintage con un toque moderno. Diseño retro que nunca pasa de moda.",
    sizes: ["S", "M", "L", "XL"],
    category: "camisetas",
  },
  {
    id: 6,
    title: "HOODIE DALIX SPORT",
    slug: generateSlug("HOODIE DALIX SPORT"),
    price: 88000,
    formattedPrice: "$88,000 COP",
    image: "/img/RopaDalix6.jpg",
    images: [
      "/img/RopaDalix6.jpg",
      "/img/RopaDalix2.jpg",
      "/img/RopaDalix4.jpg",
    ],
    description:
      "Hoodie deportivo diseñado para el máximo confort durante tus actividades. Tecnología textil avanzada.",
    sizes: ["S", "M", "L", "XL"],
    category: "hoodies",
  },
];

// Función helper para buscar un producto por su slug
export function getProductBySlug(slug) {
  return products.find((producto) => producto.slug === slug);
}

// Función helper para obtener todos los productos
export function getAllProducts() {
  return products;
}
