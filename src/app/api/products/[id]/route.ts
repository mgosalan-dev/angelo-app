import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/products/[id] - Obter um produto específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Espere o params ser resolvido
    const { id: paramId } = params;
    const id = parseInt(paramId, 10);
    
    if (isNaN(id)) {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id }
    });
    
    console.log('paramId:', paramId);

    if (!product) {
      return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

// PUT /api/products/[id] - Atualizar um produto
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Mesma desestruturação que fizemos no GET
    const { id: paramId } = params;
    const id = parseInt(paramId, 10);
    const data = await request.json();
    
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 }
      );
    }
    
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name || existingProduct.name,
        price: data.price ? parseFloat(data.price) : existingProduct.price,
        description: data.description || existingProduct.description,
        imageUrl: data.imageUrl || existingProduct.imageUrl,
        category: data.category || existingProduct.category,
      },
    });
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar produto' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Excluir um produto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Mesma desestruturação aqui também
    const { id: paramId } = params;
    const id = parseInt(paramId, 10);
    
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 }
      );
    }
    
    await prisma.product.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return NextResponse.json(
      { message: 'Erro ao excluir produto' },
      { status: 500 }
    );
  }
}