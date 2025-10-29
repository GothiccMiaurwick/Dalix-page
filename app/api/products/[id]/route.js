import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";

// PUT /api/products/[id] - Actualizar producto
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Generar el slug a partir del título si viene, si no, usar el slug que llega
    const slug = generateSlug(body.slug || body.title);

    // Crear array de imágenes actualizado
    const imagesArray = [body.image];
    if (body.image2) imagesArray.push(body.image2);
    if (body.image3) imagesArray.push(body.image3);

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: {
        title: body.title,
        slug: slug,
        price: parseInt(body.price, 10),
        formatted_price:
          body.formatted_price ||
          `$${parseInt(body.price, 10).toLocaleString("es-CO")} COP`,
        image: body.image,
        image2: body.image2 || null,
        image3: body.image3 || null,
        images: imagesArray,
        description: body.description,
        sizes: body.sizes || ["S", "M", "L"],
        category: body.category,
        is_featured: body.is_featured !== undefined ? body.is_featured : false,
        collection: body.collection || null,
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
export async function DELETE(_request, { params }) {
  try {
    const { id } = params;

    await prisma.product.delete({
      where: { id: parseInt(id, 10) },
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
