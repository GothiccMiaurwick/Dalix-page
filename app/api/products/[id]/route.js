import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/utils"; // Importar la función

// PUT /api/products/[id] - Actualizar producto
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Generar el slug a partir del título si viene, si no, usar el slug que llega
    const slug = generateSlug(body.slug || body.title);

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        slug: slug, // Usar el slug generado/limpiado
        price: parseInt(body.price),
        formatted_price: body.formatted_price,
        image: body.image,
        images: body.images,
        description: body.description,
        sizes: body.sizes,
        category: body.category,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error al actualizar producto" },
      { status: 500 },
    );
  }
}

// DELETE /api/products/[id] - Eliminar producto
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error al eliminar producto" },
      { status: 500 },
    );
  }
}
