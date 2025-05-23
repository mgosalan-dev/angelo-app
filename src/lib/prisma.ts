import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Função otimizada: busca produtos por categoria (minúsculas)
export async function getProductsByCategory(categoria: string) {
  return await prisma.product.findMany({
    where: {
      category: categoria.toLowerCase(), // forçando lowercase na busca
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
