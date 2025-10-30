import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";

// Función helper para convertir rutas de imagen a WebP
function convertToWebP(imagePath) {
  if (!imagePath) return null;
  return imagePath
    .replace(/\.jpe?g$/i, '.webp')
    .replace(/\.png$/i, '.webp');
}

// PUT /api/products/[id] - Actualizar producto
export async function PUT(request, { params }) {
  try {
    // ✅ AWAIT params antes de usarlo (Next.js 15)
    const { id } = await params;
    const body = await request.json();

    // Generar el slug a partir del título si viene, si no, usar el slug que llega
    const slug = generateSlug(body.slug || body.title);

    // 🚀 Convertir imágenes a WebP
    const imageWebP = convertToWebP(body.image);
    const image2WebP = body.image2 ? convertToWebP(body.image2) : null;
    const image3WebP = body.image3 ? convertToWebP(body.image3) : null;

    // Crear array de imágenes actualizado
    const imagesArray = [imageWebP];
    if (image2WebP) imagesArray.push(image2WebP);
    if (image3WebP) imagesArray.push(image3WebP);

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
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
      { error: "Error al actualizar producto", details: error.message },
      { status: 500 },
    );
  }
}

// DELETE /api/products/[id] - Eliminar producto
export async function DELETE(_request, { params }) {
  try {
    // ✅ AWAIT params antes de usarlo (Next.js 15)
    const { id } = await params;

    await prisma.product.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error al eliminar producto", details: error.message },
      { status: 500 },
    );
  }
}