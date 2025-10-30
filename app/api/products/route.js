import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";

// Función helper para convertir rutas de imagen a WebP
function convertToWebP(imagePath) {
  if (!imagePath) return null;
  return imagePath
    .replace(/\.jpe?g$/i, '.webp')  // .jpg o .jpeg → .webp
    .replace(/\.png$/i, '.webp');    // .png → .webp
}

// GET /api/products - Obtener todos los productos
export async function GET() {
  try {
    console.log("[API] Intentando conectar a la base de datos...");

    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    console.log(`[API] ${products.length} productos encontrados`);

    // 🚀 OPTIMIZACIÓN: Convertir todas las imágenes a WebP
    const productsWithWebP = products.map(product => ({
      ...product,
      image: convertToWebP(product.image),
      image2: convertToWebP(product.image2),
      image3: convertToWebP(product.image3),
      images: product.images?.map(img => convertToWebP(img)) || [],
    }));

    return NextResponse.json(productsWithWebP);
  } catch (error) {
    console.error("[API] Error completo:", error);
    console.error("[API] Mensaje:", error.message);
    console.error("[API] Stack:", error.stack);

    return NextResponse.json(
      {
        error: "Error al obtener productos",
        details: error.message,
        code: error.code || "UNKNOWN",
      },
      { status: 500 },
    );
  }
}

// POST /api/products - Crear nuevo producto
export async function POST(request) {
  try {
    const body = await request.json();

    // Validación básica
    if (!body.title || !body.price || !body.image) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: título, precio, imagen" },
        { status: 400 },
      );
    }

    // Generar el slug a partir del título
    const slug = generateSlug(body.slug || body.title);

    // 🚀 OPTIMIZACIÓN: Convertir imágenes a WebP antes de guardar
    const imageWebP = convertToWebP(body.image);
    const image2WebP = body.image2 ? convertToWebP(body.image2) : null;
    const image3WebP = body.image3 ? convertToWebP(body.image3) : null;

    // Crear array de imágenes (incluye todas las variantes)
    const imagesArray = [imageWebP];
    if (image2WebP) imagesArray.push(image2WebP);
    if (image3WebP) imagesArray.push(image3WebP);

    // Crear producto en la DB
    const newProduct = await prisma.product.create({
      data: {
        title: body.title,
        slug: slug,
        price: parseInt(body.price, 10),
        formatted_price:
          body.formatted_price ||
          `$${parseInt(body.price, 10).toLocaleString("es-CO")} COP`,
        image: imageWebP,
        image2: image2WebP,
        image3: image3WebP,
        images: imagesArray,
        description: body.description || "",
        sizes: body.sizes || ["S", "M", "L"],
        category: body.category || "general",
        is_featured: body.is_featured || false,
        collection: body.collection || null,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        error: "Error al crear producto",
        details: error.message,
      },
      { status: 500 },
    );
  }
}