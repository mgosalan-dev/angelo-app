import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/products - Listar todos produtos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

// POST /api/products - Criar novo produto
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validações básicas
    if (!data.name || !data.price || !data.imageUrl) {
      return NextResponse.json(
        { message: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        description: data.description || '',
        imageUrl: data.imageUrl,
        category: data.category || 'Outros',
      },
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { message: 'Erro ao criar produto' },
      { status: 500 }
    );
  }
}