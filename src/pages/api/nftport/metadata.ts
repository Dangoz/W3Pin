import type { NextApiRequest, NextApiResponse } from 'next'
import nftport from '@/common/nftport'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { metadataInput } = req.body
    const metadataOutput = await nftport.uploadMetadata(metadataInput)

    res.status(200).json({ metadataUrl: metadataOutput.metadata_uri, message: 'metadata upload successful' })
  } catch (error) {
    console.error((error as Error).message)
    res.status(500).json({ error: (error as Error).message })
  }
}
