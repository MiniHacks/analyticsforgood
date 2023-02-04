// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(productId: number) {
  const allOrders = await prisma.order.findMany({
    where: {
      prod_id: productId,
    },
    include: {
      producer: true,
    },
  });

  const allPlans = await prisma.planned.findMany({
    where: {
      prod_id: productId,
    },
    include: {
      producer: true,
    },
  });

  return { orders: allOrders.reverse(), plans: allPlans.reverse() };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid: productId } = req.query;

  if (!productId) return res.status(400).json({ error: "Missing product id" });

  const pid = parseInt(productId as string, 10);

  // load all the rows in orders table
  return res.json(await main(pid));
}
