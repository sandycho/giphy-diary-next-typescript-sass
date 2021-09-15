// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

type Data = {
  id: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username } = JSON.parse(req.body);

  const prisma = new PrismaClient();

  if (req.method === "POST") {
    // create user with username
    try {
      const { id } = await prisma.users.create({ data: { username } });
      res.status(200).json({ id });
    } catch (err) {
      console.log({ err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
