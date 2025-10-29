import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView/ProductView";
import prisma from "@/lib/prisma";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug: slug },
  });

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}
