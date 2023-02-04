// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(farmCode: string) {
  const producerId = await prisma.producer.findUnique({
    where: {
      code: farmCode,
    },
  });

  const farmId = producerId?.id;

  const allOrders = await prisma.order.findMany({
    where: {
      producer_id: farmId,
    },
    include: {
      producer: true,
    },
  });

  const allPlans = await prisma.planned.findMany({
    where: {
      producer_id: farmId,
    },
    include: {
      producer: true,
    },
  });

  return {
    orders: allOrders.reverse(),
    plans: allPlans.reverse(),
    producer: producerId,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { farmCode } = req.query;

  if (!farmCode) return res.status(400).json({ error: "Missing farmCode" });

  // load all the rows in orders table
  return res.json(await main(farmCode as string));
}
