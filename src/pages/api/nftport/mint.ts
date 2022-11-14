import type { NextApiRequest, NextApiResponse } from 'next'
import nftport from '@/common/nftport'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { mintTo, metadataUrl } = req.body
    const transactionHash = await nftport.mintPin(mintTo, metadataUrl)
    transactionHash
      ? res.status(200).json({ transactionHash, message: 'nft mint successful' })
      : res.status(500).json({ error: 'nft mint failed' })
  } catch (error) {
    console.error((error as Error).message)
    res.status(500).json({ error: (error as Error).message })
  }
}
