import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/products - Obtener todos los productos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}