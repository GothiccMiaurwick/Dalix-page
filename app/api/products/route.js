import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";

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

    return NextResponse.json(products);
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

    // Crear array de imágenes (incluye todas las variantes)
    const imagesArray = [body.image];
    if (body.image2) imagesArray.push(body.image2);
    if (body.image3) imagesArray.push(body.image3);

    // Crear producto en la DB
    const newProduct = await prisma.product.create({
      data: {
        title: body.title,
        slug: slug,
        price: parseInt(body.price),
        formatted_price:
          body.formatted_price ||
          `$${parseInt(body.price).toLocaleString("es-CO")} COP`,
        image: body.image,
        image2: body.image2 || null,
        image3: body.image3 || null,
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