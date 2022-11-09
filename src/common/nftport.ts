import { NFTPORT_API_URL } from '@/common/endpoints'
import axios from 'axios'
import type { IPFSMetadataInput, IPFSMetadataOutput } from '@/types/nftport'

const nftportAPI = axios.create({
  baseURL: NFTPORT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.NEXT_PUBLIC_NFTPORT_API_KEY,
  },
})

const nftport = {
  // upload a file to ipfs on the server
  async uploadFile(formData: FormData): Promise<string> {
    const response = await axios.post(`${NFTPORT_API_URL}/v0/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: process.env.NEXT_PUBLIC_NFTPORT_API_KEY,
      },
    })
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    console.log('data', response.data)
    return response.data.ipfs_url
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
      contract_address: process.env.NEXT_PUBLIC_W3PIN_CONTRACT_ADDRESS,
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
