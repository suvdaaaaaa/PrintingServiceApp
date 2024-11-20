import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [{ level: "query", emit: "event" }],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// prisma.$on("query", (e) => {
//   console.log(e);
// });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
