import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const { externalId, userId } = JSON.parse(req.body);
    try {
      await prisma.favouritesGifs.create({
        data: { externalId, userId },
      });

      res.status(200).send("OK");
    } catch (err) {
      res.status(500).send("KO");
    }
  } else {
    const { userId } = req.query;

    try {
      const favGifs = await prisma.favouritesGifs.findMany({
        where: { userId: parseInt(userId.toString()) },
      });

      res.status(200).json(favGifs);
    } catch (err) {
      res.status(500).send("KO");
    }
  }
}
