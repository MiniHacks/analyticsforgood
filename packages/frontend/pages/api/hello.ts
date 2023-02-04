// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allOrders = await prisma.order.findMany({});
  console.log(allOrders);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // load all the rows in orders table
  await main();

  res.status(200).json({ name: "John Doe" });
}
