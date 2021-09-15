// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// TODO create a singleton of prisma

type Data = {
  id: number;
};

type Error = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const { username } = JSON.parse(req.body);

  const prisma = new PrismaClient();

  if (req.method === "POST") {
    // create user with username
    try {
      const { id } = await prisma.users.create({ data: { username } });

      res.status(200).json({ id });
    } catch (err) {
      if (err?.code === "P2002")
        res.status(402).send({ msg: "User already exist" });
      else res.status(400).send({ msg: "Something went wrong!" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
