import type { NextApiRequest, NextApiResponse } from 'next'
import nftport from '@/common/nftport'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const ipfsUrl = await nftport.uploadFile(req, req.headers['content-type'] as string)

    res.status(200).json({ ipfsUrl, message: 'file upload successful' })
  } catch (error) {
    console.error((error as Error).message)
    res.status(500).json({ error: (error as Error).message })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
