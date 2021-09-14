// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

type Data = {
  id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username } = JSON.parse(req.body)

  const prisma = new PrismaClient()

  if (req.method === 'POST') {
    // create user with username
    await prisma.users.create({ data: { username } })
  } else {
    // Handle any other HTTP method
  }

  res.status(200).json({ id: 'ABCD' })
}
