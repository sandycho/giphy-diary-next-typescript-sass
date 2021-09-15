import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

type Data = {
  id: number;
};

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { username },
    method,
  } = req;

  const prisma = new PrismaClient();

  switch (method) {
    case "GET":
      // Get data from your database
      const { id } = await prisma.users.findUnique({ where: { username } });

      res.status(200).json({ id });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
