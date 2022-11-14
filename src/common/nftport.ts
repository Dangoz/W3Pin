import { NFTPORT_API_URL } from '@/common/endpoints'
import axios from 'axios'
import type { IPFSMetadataInput, IPFSMetadataOutput } from '@/types/nftport'
import { NextApiRequest } from 'next'

const nftportAPI = axios.create({
  baseURL: NFTPORT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.NFTPORT_API_KEY,
  },
})

const nftport = {
  // upload a file to ipfs on the server
  async uploadFile(req: NextApiRequest, contentType: string): Promise<string> {
    try {
      const response = await axios.post(`${NFTPORT_API_URL}/v0/files`, req, {
        headers: {
          'Content-Type': contentType,
          Authorization: process.env.NFTPORT_API_KEY,
        },
      })
      return response.data.ipfs_url
    } catch (error) {
      throw new Error((error as any)?.response?.data.error.message)
    }
  },

  // upload metadata to ipfs
  async uploadMetadata(input: IPFSMetadataInput): Promise<IPFSMetadataOutput> {
    const response = await nftportAPI.post('/v0/metadata', input)
    return response.data as IPFSMetadataOutput
  },

  // customizable mint of pin nft
  async mintPin(mintTo: string, metadataURL: string): Promise<string | null> {
    const response = await nftportAPI.post('/v0/mints/customizable', {
      chain: 'polygon',
      contract_address: process.env.W3PIN_CONTRACT_ADDRESS,
      metadata_uri: metadataURL,
      mint_to_address: mintTo,
    })
    console.log('RESULT', response.data)
    if (response.data.response === 'OK') {
      return response.data.transaction_hash
    }
    return null
  },
}

export default nftport
