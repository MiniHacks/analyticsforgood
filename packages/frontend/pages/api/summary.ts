// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allProducts = await prisma.product.findMany();
  const allOrders = await prisma.producer.findMany();

  return { products: allProducts, producers: allOrders };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // load all the rows in orders table
  return res.json(await main());
}
