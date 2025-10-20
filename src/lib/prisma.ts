// src/lib/prisma.ts
import { PrismaClient } from "../generated/prisma"; // <- si lib/ está en src/lib
// o, si usas alias:
/// import { PrismaClient } from "@/generated/prisma";

const prismaClientSingleton = () => new PrismaClient();

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
