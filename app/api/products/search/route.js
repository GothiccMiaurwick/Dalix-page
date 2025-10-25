import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (!query || query.trim().length === 0) {
      return NextResponse.json([]);
    }

    // Búsqueda case-insensitive en título y descripción
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 5, // Limitar a 5 resultados
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    return NextResponse.json(
      { error: "Error al buscar productos" },
      { status: 500 },
    );
  }
}
