// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username } = JSON.parse(req.body)

  if (req.method === 'POST') {
    // create user with username
  } else {
    // Handle any other HTTP method
  }

  res.status(200).json({ id: 'ABCD' })
}
