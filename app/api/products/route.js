import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/utils"; // Importar la función

// GET /api/products - Obtener todos los productos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
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
      // Slug ya no es requerido, se genera
      return NextResponse.json(
        { error: "Faltan campos requeridos: título, precio, imagen" },
        { status: 400 },
      );
    }

    // Generar el slug a partir del título
    const slug = generateSlug(body.slug || body.title);

    // Crear producto en la DB
    const newProduct = await prisma.product.create({
      data: {
        title: body.title,
        slug: slug, // Usar el slug generado
        price: parseInt(body.price),
        formatted_price:
          body.formatted_price ||
          `$${parseInt(body.price).toLocaleString("es-CO")} COP`,
        image: body.image,
        images: body.images || [body.image],
        description: body.description || "",
        sizes: body.sizes || ["S", "M", "L", "XL"],
        category: body.category || "general",
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 },
    );
  }
}
