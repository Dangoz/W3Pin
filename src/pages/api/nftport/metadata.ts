import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    res.status(200).json({ name: 'John Doe' })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
