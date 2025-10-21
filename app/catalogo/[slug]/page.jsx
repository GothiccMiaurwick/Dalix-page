import prisma from "@/lib/prisma";
import ProductView from "@/components/ProductView/ProductView";
import { notFound } from "next/navigation";

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
