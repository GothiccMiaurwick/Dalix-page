import { PrismaClient } from '@prisma/client';

// Prevenir múltiples instancias de Prisma en desarrollo
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;