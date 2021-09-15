import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { externalId, userId } = JSON.parse(req.body);
  const prisma = new PrismaClient();

  console.log({ externalId, userId });

  if (req.method === "POST") {
    try {
      await prisma.favouritesGifs.create({
        data: { externalId, userId },
      });

      res.status(200);
    } catch (err) {
      console.log({ err });
      res.status(500); // TODO
    }
  } else {
    // Handle any other HTTP method
  }
}
